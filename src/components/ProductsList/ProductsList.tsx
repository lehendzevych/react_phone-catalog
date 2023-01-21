import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => (
  <ul className="ProductsList" data-cy="productList">
    {products.map(product => (
      <li className="ProductsList__item" key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
