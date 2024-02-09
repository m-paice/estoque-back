import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type AccountInstance = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const Account = sequelize.define(
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
