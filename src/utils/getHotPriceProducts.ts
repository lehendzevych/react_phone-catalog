import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]): Product[] => {
  const hotPriceProducts = products.filter(product => product.discount > 0);

  hotPriceProducts.sort((a, b) => {
    return (b.discount * b.price) / 100 - (a.discount * a.price) / 100;
  });

  return hotPriceProducts;
};
