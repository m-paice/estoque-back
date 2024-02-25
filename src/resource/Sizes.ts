import Sizes from '../models/Sizes';

interface CreateSizeParams {
  accountId: string;
  productId: string;
  name: string;
  value: string;
}

export const create = async (data: CreateSizeParams) => Sizes.create(data);
