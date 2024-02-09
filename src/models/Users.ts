import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type UserInstance = {
  id: string;
  accountId: string;
  name: string;
  cellPhone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    cellPhone: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
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
    tableName: 'users',
    paranoid: true,
  },
);

User.associate = (models) => {
  User.belongsTo(models.Accounts, {
    foreignKey: 'accountId',
    as: 'account',
  });
};

export default User;
