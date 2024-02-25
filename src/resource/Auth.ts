import Users from '../models/Users';
import { HttpError } from '../utils/error/HttpError';

interface LoginRequest {
  cellPhone: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const user = await Users.findOne({ where: { cellPhone: data.cellPhone }, include: ['addresses'] });
  if (!user) throw new HttpError(404, 'invalid credentials');
  if (user.password !== data.password) throw new HttpError(404, 'invalid credentials');

  return user;
};
