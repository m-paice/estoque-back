import { HttpError } from '../utils/error/HttpError';
import Orders from '../models/Orders';
import Products from '../models/Products';
import queuedAsyncMap from '../utils/queuedAsyncMap';
import sequelize from '../services/sequelize';

interface ProductsRequest {
  id: string;
  amount: number;
}

interface OrderCreateRequest {
  accountId: string;
  userId: string;
  products: ProductsRequest[];
}

export const create = async (data: OrderCreateRequest) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // create order
    const order = await Orders.create(
      {
        userId: data.userId,
        accountId: data.accountId,
      },
      { transaction },
    );

    let total = 0;

    // create order products
    await queuedAsyncMap(data.products, async (item) => {
      const product = await Products.findByPk(item.id, { transaction });
      // check if product exists
      if (!product) throw new HttpError(404, 'Product not found');
      // check if product amount is sufficient
      if (product.amount < item.amount) throw new HttpError(400, 'Insufficient stock');
      // calculate total
      total += item.amount * product.price;
      // add product to order
      await order.addProduct(product, {
        through: {
          amount: item.amount,
          price: product.dataValues.price,
          subtotal: item.amount * product.dataValues.price,
        },
        transaction,
      });
      // decrement product amount
      await Products.decrement('amount', { by: item.amount, where: { id: item.id }, transaction });
    });
    // update order total
    await order.update({ total }, { transaction });

    await transaction.commit();

    return order;
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
};

export const list = async () => Orders.findAll();

export const get = async (id: string) => {
  const order = await Orders.findByPk(id);
  if (!order) throw new HttpError(404, 'Order not found');
  return order;
};

export const update = async (id: string, data) => {
  const order = await Orders.findByPk(id);
  if (!order) throw new HttpError(404, 'Order not found');
  return Orders.update(data, { where: { id } }).then(() => Orders.findByPk(id));
};

export const remove = async (id: string) => {
  const order = await Orders.findByPk(id);
  if (!order) throw new HttpError(404, 'Order not found');
  return Orders.destroy({ where: { id } });
};
