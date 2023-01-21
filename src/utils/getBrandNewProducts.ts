import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]): Product[] => {
  const brandNewProducts = products.filter(product => product.discount === 0);

  return brandNewProducts.sort((a, b) => b.price - a.price);
};
