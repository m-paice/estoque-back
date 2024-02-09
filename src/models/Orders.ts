import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import sequelize from '../services/sequelize';

// models
import Products, { ProductModel } from './Products';
import Account from './Accounts';
import OrderProducts from './OrdersProducts';

interface OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
  id: CreationOptional<string>;
  accountId: string;
  userId: string;
  total: CreationOptional<number>;
  status: CreationOptional<'pending' | 'canceled' | 'delivered' | 'in_progress' | 'approved'>;
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
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'canceled', 'delivered', 'in_progress', 'approved'),
      allowNull: false,
      defaultValue: 'pending',
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
      allowNull: true,
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

  Orders.belongsToMany(Products, {
    through: OrderProducts,
    foreignKey: 'orderId',
    as: 'products',
  });
};

export default Orders;
