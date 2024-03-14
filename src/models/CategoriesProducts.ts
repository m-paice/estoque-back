import { DataTypes } from 'sequelize';

import sequelize from '../services/sequelize';

export type CategoriesProductsInstance = {
  categoryId: string;
  productId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export const CategoriesProducts = sequelize.define(
  'CategoriesProducts',
  {
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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
    tableName: 'categories_products',
  },
);

CategoriesProducts.associate = () => {};

export default CategoriesProducts;
