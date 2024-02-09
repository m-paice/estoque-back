import { HttpError } from '../utils/error/HttpError';
import Address from '../models/Address';

export const create = async (data) => Address.create(data);

export const list = async () => Address.findAll();

export const get = async (id: string) => {
  const address = await Address.findByPk(id);
  if (!address) throw new HttpError(404, 'Address not found');
  return address;
};

export const update = async (id: string, data) => {
  const address = await Address.findByPk(id);
  if (!address) throw new HttpError(404, 'Address not found');
  return Address.update(data, { where: { id } }).then(() => Address.findByPk(id));
};

export const remove = async (id: string) => {
  const address = await Address.findByPk(id);
  if (!address) throw new HttpError(404, 'Address not found');
  return Address.destroy({ where: { id } });
};
