import { FC, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getHotPrice } from '../../utils/getHotPrice';
import { Pagination } from '../Pagination';
import { SearchDropdown } from '../SearchDropdown';
import { Notification } from '../Notification';

import './Catalog.scss';
import { ProductsList } from '../ProductsList';

type Props = {
  products: Product[];
};

export const Catalog: FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query')?.toLowerCase();
  const { pathname } = useLocation();
  const pathNames = pathname.slice(1).split('/');
  const categoryLink = pathNames[0].toLocaleLowerCase();
  const categoryName = categoryLink[0]
    .toLocaleUpperCase() + categoryLink.slice(1);

  const startItem = ((+page - 1) * +perPage) || 0;
  const endItem = +page * +perPage < products.length
    ? +page * +perPage
    : products.length;

  const filteredProducts = products.filter(product => {
    if (query) {
      return product.name.toLocaleLowerCase().includes(query);
    }

    return product;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);

      case 'age':
        return a.age - b.age;

      case 'price':
        return getHotPrice(a.price, a.discount)
          - getHotPrice(b.price, b.discount);

      default:
        return 0;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, perPage, sortBy, query]);

  return (
    <div className="Catalog">
      {!products.length ? (
        <Notification>
          {`${categoryName} not found`}
        </Notification>
      ) : (
        <>
          <span className="Catalog__counter">
            {`${sortedProducts.length} ${!query ? 'models' : 'results'}`}
          </span>

          {filteredProducts.length > 0 && (
            <div className="Catalog__dropdowns">
              <div className="Catalog__dropdown">
                <SearchDropdown
                  label="Sort by"
                  param="sort"
                  paramValue={sortBy}
                  options={[
                    { value: 'age', text: 'Newest' },
                    { value: 'name', text: 'Alphabetically' },
                    { value: 'price', text: 'Cheapest' },
                  ]}
                />
              </div>

              <div className="Catalog__dropdown">
                <SearchDropdown
                  label="Items on page"
                  param="perPage"
                  paramValue={perPage}
                  options={[
                    { value: '4' },
                    { value: '8' },
                    { value: '16' },
                    { value: 'all', text: 'All' },
                  ]}
                />
              </div>
            </div>
          )}

          <div className="Catalog__content">
            {query && !sortedProducts.length ? (
              <Notification>
                {`Sorry we couldn't find any matches for ${query}`}
              </Notification>
            ) : (
              <ProductsList
                products={
                  sortedProducts.slice(startItem, endItem)
                }
              />
            )}

            {sortedProducts.length > +perPage && (
              <Pagination
                total={sortedProducts.length}
                perPage={+perPage}
                currentPage={+page}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
