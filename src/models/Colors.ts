import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface ColorInstance extends Model<InferAttributes<ColorInstance>, InferCreationAttributes<ColorInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  productId: string;
  name: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Color = sequelize.define<ColorInstance>(
  'Color',
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
    tableName: 'colors',
    paranoid: true,
  },
);

Color.associate = (models) => {
  Color.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
  Color.belongsTo(models.Products, {
    foreignKey: 'productId',
    as: 'product',
  });
};

export default Color;
