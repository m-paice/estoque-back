import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface VariantsInstance
  extends Model<InferAttributes<VariantsInstance>, InferCreationAttributes<VariantsInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  productId?: string;
  price: number;
  amount: number;
  color: string;
  size: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Variants = sequelize.define<VariantsInstance>(
  'Variants',
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
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    price: Sequelize.FLOAT,
    amount: Sequelize.INTEGER,
    color: Sequelize.STRING,
    size: Sequelize.STRING,
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
    tableName: 'variants',
    paranoid: true,
  },
);

Variants.associate = (models) => {
  Variants.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
  Variants.belongsTo(models.Products, {
    foreignKey: 'productId',
    as: 'product',
  });
};

export default Variants;
