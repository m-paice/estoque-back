import { DataTypes } from 'sequelize';

import sequelize from '../services/sequelize';

export type OrdersProductsInstance = {
  orderId: string;
  productId: string;
  amount: number;
  price: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export const OrderProducts = sequelize.define(
  'OrderProducts',
  {
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'orders_products',
  },
);

OrderProducts.associate = () => {};

export default OrderProducts;
