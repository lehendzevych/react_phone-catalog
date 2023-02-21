import { Product } from '../types/Product';
import { getProducts } from './getProducts';

export const getAccessories = async (): Promise<Product[]> => {
  const accessories = [...await getProducts()]
    .filter(product => product.type === 'accessory');

  return accessories;
};
