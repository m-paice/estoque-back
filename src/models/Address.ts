import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface AddressInstance
  extends Model<InferAttributes<AddressInstance>, InferCreationAttributes<AddressInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  userId?: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Address = sequelize.define<AddressInstance>(
  'Address',
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
    street: Sequelize.STRING,
    number: Sequelize.STRING,
    complement: Sequelize.STRING,
    neighborhood: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    country: Sequelize.STRING,
    zipcode: Sequelize.STRING,
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
    tableName: 'address',
    paranoid: true,
  },
);

Address.associate = (models) => {
  Address.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
  Address.belongsTo(models.Users, {
    foreignKey: 'userId',
    as: 'user',
  });
};

export default Address;
