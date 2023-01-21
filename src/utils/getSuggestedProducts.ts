import { Product } from '../types/Product';

export const getSuggestedProducts = (products: Product[]) => {
  const suggestedProducts: Product[] = [];

  if (products.length) {
    do {
      const index = Math.floor(Math.random() * products.length);
      const randomProduct = products[index];
      const mismatch = suggestedProducts.every(
        product => product.id !== randomProduct.id,
      );

      if (mismatch) {
        suggestedProducts.push(randomProduct);
      }
    } while (suggestedProducts.length < 8);
  }

  return suggestedProducts;
};
