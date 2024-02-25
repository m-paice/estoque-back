import Colors from '../models/Colors';

interface CreateColorParams {
  accountId: string;
  productId: string;
  name: string;
  value: string;
}

export const create = async (data: CreateColorParams) => Colors.create(data);
