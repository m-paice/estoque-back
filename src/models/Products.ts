import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../services/sequelize';

// models
import Account from './Accounts';
import Orders from './Orders';
import OrderProducts from './OrdersProducts';
import Categories from './Categories';
import Color, { ColorInstance } from './Colors';
import Size, { SizeInstance } from './Sizes';

export interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id: CreationOptional<string>;
  accountId: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;

  addColor: (color: ColorInstance, options?: any) => Promise<void>;
  addSize: (size: SizeInstance, options?: any) => Promise<void>;
}

const Products = sequelize.define<ProductModel>(
  'Products',
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

Products.associate = () => {
  Products.belongsTo(Account, {
    foreignKey: 'accountId',
    as: 'account',
  });

  Products.belongsTo(Categories, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  Products.belongsToMany(Orders, {
    through: OrderProducts,
    foreignKey: 'productId',
    as: 'orders',
  });

  Products.hasMany(Color, {
    foreignKey: 'productId',
    as: 'colors',
  });
  Products.hasMany(Size, {
    foreignKey: 'productId',
    as: 'sizes',
  });
};

export default Products;
