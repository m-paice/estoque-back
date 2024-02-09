import { HttpError } from '../utils/error/HttpError';
import Products from '../models/Products';

export const create = async (data) => Products.create(data);

export const list = async () => Products.findAll();

export const get = async (id: string) => {
  const product = await Products.findByPk(id);
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
