import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface AccountInstance
  extends Model<InferAttributes<AccountInstance>, InferCreationAttributes<AccountInstance>> {
  id: CreationOptional<string>;
  name: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}

export const Account = sequelize.define<AccountInstance>(
  'Account',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'accounts',
  },
);

Account.associate = () => {};

export default Account;
