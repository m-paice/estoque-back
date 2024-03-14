import { HttpError } from '../utils/error/HttpError';
import Categories from '../models/Categories';

export const create = async (data) => Categories.create(data);

export const list = async ({ query }: { query?: string }) => {
  const where = query ? { name: { $iLike: `%${query}%` } } : {};
  return Categories.findAll({ where });
};

export const findManyByIds = async (ids: string[]) =>
  Categories.findAll({
    where: {
      id: {
        $in: ids,
      },
    },
  });

export const get = async (id: string) => {
  const user = await Categories.findByPk(id, {
    include: ['products'],
  });
  if (!user) throw new HttpError(404, 'Category not found');
  return user;
};

export const update = async (id: string, data) => {
  const user = await Categories.findByPk(id);
  if (!user) throw new HttpError(404, 'Category not found');
  return Categories.update(data, { where: { id } }).then(() => Categories.findByPk(id));
};

export const remove = async (id: string) => {
  const user = await Categories.findByPk(id);
  if (!user) throw new HttpError(404, 'Category not found');
  return Categories.destroy({ where: { id } });
};
