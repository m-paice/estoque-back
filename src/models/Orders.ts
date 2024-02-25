import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import sequelize from '../services/sequelize';

// models
import Products, { ProductModel } from './Products';
import Account from './Accounts';
import OrderProducts from './OrdersProducts';
import User from './Users';

interface OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
  id: CreationOptional<string>;
  accountId: string;
  userId: string;
  total: CreationOptional<number>;
  status: CreationOptional<'pending' | 'canceled' | 'delivered' | 'in_progress' | 'approved'>;
  paymentMethod: CreationOptional<'card' | 'cash' | 'pix'>;
  addition: CreationOptional<number>;
  discount: CreationOptional<number>;
  subtotal: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt: CreationOptional<Date | null>;
  addProduct: (
    product: ProductModel,
    options?: { through: { amount: number; price: number; subtotal: number }; transaction: any },
  ) => Promise<void>;
  removeProduct: (product: ProductModel) => Promise<void>;
}

const Orders = sequelize.define<OrderModel>(
  'Orders',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
    },
    total: {
      type: DataTypes.FLOAT,

      defaultValue: 0,
    },
    addition: {
      type: DataTypes.FLOAT,

      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,

      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.FLOAT,

      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('awaiting', 'canceled', 'delivered', 'in_progress', 'approved'),
      defaultValue: 'awaiting',
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'debit_card', 'billet', 'cash', 'pix'),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'orders',
    paranoid: true,
  },
);

Orders.associate = () => {
  Orders.belongsTo(Account, {
    foreignKey: 'accountId',
    as: 'account',
  });

  Orders.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  Orders.belongsToMany(Products, {
    through: OrderProducts,
    foreignKey: 'orderId',
    as: 'products',
  });
};

export default Orders;
