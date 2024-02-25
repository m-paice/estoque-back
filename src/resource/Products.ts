import { HttpError } from '../utils/error/HttpError';
import Products from '../models/Products';
import queuedAsyncMap from '../utils/queuedAsyncMap';

import * as colorResource from './Colors';
import * as sizeResource from './Sizes';

interface Color {
  name: string;
  value: string;
}

interface Size {
  name: string;
  value: string;
}

interface CreateProductParams {
  accountId: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  colors: Color[];
  sizes: Size[];
}

export const create = async (data: CreateProductParams) => {
  const product = await Products.create(data);

  if (data.colors.length) {
    await queuedAsyncMap(data.colors, async (color: Color) => {
      const result = await colorResource.create({
        accountId: data.accountId,
        productId: product.id,
        name: color.name,
        value: color.value,
      });

      await product.addColor(result);
    });
  }

  if (data.sizes.length) {
    await queuedAsyncMap(data.sizes, async (size: Size) => {
      const result = await sizeResource.create({
        accountId: data.accountId,
        productId: product.id,
        name: size.name,
        value: size.value,
      });

      await product.addSize(result);
    });
  }

  return product;
};

export const list = async () =>
  Products.findAll({
    include: ['colors', 'sizes'],
  });

export const get = async (id: string) => {
  const product = await Products.findByPk(id, {
    include: ['colors', 'sizes'],
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
