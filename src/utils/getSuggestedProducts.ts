import { Product } from '../types/Product';

export const getSuggestedProducts = (
  products: Product[], currentId: string,
) => {
  const suggestedProducts: Product[] = [];

  if (products.length >= 8) {
    do {
      const index = Math.floor(Math.random() * products.length);
      const randomProduct = products[index];
      const mismatch = suggestedProducts.every(
        product => product.id !== randomProduct.id,
      );

      if (mismatch && randomProduct.id !== currentId) {
        suggestedProducts.push(randomProduct);
      }
    } while (suggestedProducts.length !== 8);
  }

  return suggestedProducts;
};
