import { Product } from '../types/Product';
import { getProducts } from './getProducts';

export const getTablets = async (): Promise<Product[]> => {
  const tablets = [...await getProducts()]
    .filter(product => product.type === 'tablet');

  return tablets;
};
