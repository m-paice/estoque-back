import Variants from '../models/Variants';

interface CreateVariantsParams {
  accountId: string;
  productId: string;
  price: number;
  amount: number;
  color: string;
  size: string;
}

export const create = async (data: CreateVariantsParams) => Variants.create(data);
