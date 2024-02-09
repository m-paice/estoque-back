import { HttpError } from '../utils/error/HttpError';
import Accounts from '../models/Accounts';

export const create = async (data) => Accounts.create(data);

export const list = async () => Accounts.findAll();

export const get = async (id: string) => {
  const account = await Accounts.findByPk(id);
  if (!account) throw new HttpError(404, 'Account not found');
  return account;
};

export const update = async (id: string, data) => {
  const account = await Accounts.findByPk(id);
  if (!account) throw new HttpError(404, 'Account not found');
  return Accounts.update(data, { where: { id } }).then(() => Accounts.findByPk(id));
};

export const remove = async (id: string) => {
  const account = await Accounts.findByPk(id);
  if (!account) throw new HttpError(404, 'Account not found');
  return Accounts.destroy({ where: { id } });
};
