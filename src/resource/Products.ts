import { HttpError } from '../utils/error/HttpError';
import Products from '../models/Products';
import * as variantsResource from './Variants';
import * as categoriesResource from './Categories';
import Categories from '../models/Categories';

interface CreateProductParams {
  accountId: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  categories: string[];
  variants: {
    price: number;
    amount: number;
    color: string;
    size: string;
  }[];
}

export const create = async (data: CreateProductParams) => {
  const product = await Products.create(data);

  await Promise.all(
    data.variants.map((item) => variantsResource.create({ ...item, productId: product.id, accountId: data.accountId })),
  );

  const categories = await categoriesResource.findManyByIds(data.categories);
  await product.addCategories(categories);

  return product;
};

export const list = async ({ query }: { query: any }) =>
  Products.findAll({
    where: query.where,
    include: [
      'variants',
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  });

export const get = async (id: string) => {
  const product = await Products.findByPk(id, {
    include: [
      'variants',
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  });
  if (!product) throw new HttpError(404, 'Product not found');
  return product;
};

export const update = async (id: string, data) => {
  const product = await Products.findByPk(id);
  if (!product) throw new HttpError(404, 'Product not found');
  return Products.update(data, { where: { id } }).then(() => Products.findByPk(id));
};

export const remove = async (id: string) => {
  const product = await Products.findByPk(id);
  if (!product) throw new HttpError(404, 'Product not found');
  return Products.destroy({ where: { id } });
};
