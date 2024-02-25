import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface SizeInstance extends Model<InferAttributes<SizeInstance>, InferCreationAttributes<SizeInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  productId: string;
  name: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Size = sequelize.define<SizeInstance>(
  'Size',
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
    name: Sequelize.STRING,
    value: Sequelize.STRING,
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
    tableName: 'sizes',
    paranoid: true,
  },
);

Size.associate = (models) => {
  Size.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
  Size.belongsTo(models.Products, {
    foreignKey: 'productId',
    as: 'product',
  });
};

export default Size;
