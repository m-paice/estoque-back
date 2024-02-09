import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ProductsInstance = {
  id: string;
  accountId: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

const Products = sequelize.define(
  'Products',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.FLOAT,
    amount: Sequelize.INTEGER,
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
    tableName: 'products',
    paranoid: true,
  },
);

Products.associate = (models) => {
  Products.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
};

export default Products;
