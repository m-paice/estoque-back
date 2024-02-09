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
    const order = await Orders.create(
      {
        userId: data.userId,
        accountId: data.accountId,
      },
      { transaction },
    );

    let total = 0;

    await queuedAsyncMap(data.products, async (item) => {
      const product = await Products.findByPk(item.id, { transaction });

      if (!product) throw new HttpError(404, 'Product not found');

      if (product.amount < item.amount) throw new HttpError(400, 'Insufficient stock');

      total += item.amount * product.price;

      await order.addProduct(product, {
        through: {
          amount: item.amount,
          price: product.dataValues.price,
          subtotal: item.amount * product.dataValues.price,
        },
        transaction,
      });

      await Products.decrement('amount', { by: item.amount, where: { id: item.id }, transaction });
    });

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
