import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Notification } from '../../components/Notification';
import { ProductsList } from '../../components/ProductsList';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase();
  const { favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    window.scrollTo(0, 0);

    setProducts(favorites);
  }, [products]);

  const filteredProducts = products.filter(product => {
    if (query) {
      return product.name.toLocaleLowerCase().includes(query);
    }

    return product;
  });

  return (
    <div className="FavoritesPage">
      <BreadCrumbs />

      <h1 className="FavoritesPage__title">Favorites</h1>

      <span className="FavoritesPage__total">
        {query ? `${filteredProducts.length} results` : `${favorites.length} items`}
      </span>

      {query && !filteredProducts.length ? (
        <Notification>
          {`Sorry we couldn't find any matches for ${query}`}
        </Notification>
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  );
};
