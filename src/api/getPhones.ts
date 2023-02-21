import { Product } from '../types/Product';
import { getProducts } from './getProducts';

export const getPhones = async (): Promise<Product[]> => {
  const phones = [...await getProducts()]
    .filter(product => product.type === 'phone');

  return phones;
};
