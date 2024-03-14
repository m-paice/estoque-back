import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';
import CategoriesProducts from './CategoriesProducts';

export interface CategoriesInstance
  extends Model<InferAttributes<CategoriesInstance>, InferCreationAttributes<CategoriesInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Categories = sequelize.define<CategoriesInstance>(
  'Categories',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'categories',
    paranoid: true,
  },
);

Categories.associate = (models) => {
  Categories.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
  Categories.belongsToMany(models.Products, {
    through: CategoriesProducts,
    foreignKey: 'categoryId',
    as: 'products',
  });
};

export default Categories;
