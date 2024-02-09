import { HttpError } from '../utils/error/HttpError';
import Users from '../models/Users';

export const create = async (data) => Users.create(data);

export const list = async () => Users.findAll();

export const get = async (id: string) => {
  const user = await Users.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');
  return user;
};

export const update = async (id: string, data) => {
  const user = await Users.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');
  return Users.update(data, { where: { id } }).then(() => Users.findByPk(id));
};

export const remove = async (id: string) => {
  const user = await Users.findByPk(id);
  if (!user) throw new HttpError(404, 'User not found');
  return Users.destroy({ where: { id } });
};
