import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

export interface UserInstance extends Model<InferAttributes<UserInstance>, InferCreationAttributes<UserInstance>> {
  id: CreationOptional<string>;
  accountId: string;
  name: string;
  type: 'pf' | 'pj';
  cellPhone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  'User',
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
    type: {
      type: Sequelize.ENUM('pf', 'pj'),
      allowNull: false,
      defaultValue: 'pf',
    },
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
