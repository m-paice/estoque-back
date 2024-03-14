import { HttpError } from '../utils/error/HttpError';
import Orders from '../models/Orders';
import Products from '../models/Products';
import queuedAsyncMap from '../utils/queuedAsyncMap';
import sequelize from '../services/sequelize';
import User from '../models/Users';
import Address from '../models/Address';

interface ProductsRequest {
  id: string;
  amount: number;
}

interface OrderCreateRequest {
  accountId: string;
  userId: string;
  user: {
    name: string;
    document: string;
    cellPhone: string;
    address: {
      zipcode: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
  products: ProductsRequest[];
  paymentMethod: 'cash' | 'pix' | 'card';
  status: 'awaiting' | 'canceled' | 'delivered' | 'in_progress' | 'approved';
}

export const create = async (data: OrderCreateRequest) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // eslint-disable-next-line
    let userId = data.userId;

    if (!data.userId && data.user.name) {
      const user = await User.create(
        {
          name: data.user.name,
          cellPhone: data.user.cellPhone,
          type: 'pf',
          accountId: data.accountId,
          password: '',
        },
        { transaction },
      );

      if (data.user.address) {
        await Address.create(
          {
            accountId: data.accountId,
            userId: user.id,
            zipcode: data.user.address.zipcode || '',
            street: data.user.address.street || '',
            number: data.user.address.number || '',
            complement: data.user.address.complement || '',
            neighborhood: data.user.address.neighborhood || '',
            city: data.user.address.city || '',
            state: data.user.address.state || '',
            country: 'BR',
          },
          { transaction },
        );
      }

      userId = user.id;
    }

    // create order
    const order = await Orders.create(
      {
        userId,
        accountId: data.accountId,
        paymentMethod: data.paymentMethod,
        status: data.status,
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
      if (product.amount < item.amount)
        throw new HttpError(400, {
          code: 'api.orders.create.insufficientStock',
          message: 'Insufficient stock',
        });
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

export const list = async ({ query }: { query: any }) =>
  Orders.findAll({
    where: query.where,
    include: [
      'products',
      {
        model: User,
        as: 'user',
        include: ['addresses'],
      },
    ],
  });

export const get = async (id: string) => {
  const order = await Orders.findByPk(id, {
    include: [
      'products',
      {
        model: User,
        as: 'user',
        include: ['addresses'],
      },
    ],
  });
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
