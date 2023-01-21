import { useEffect, useState } from 'react';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Notification } from '../../components/Notification';
import { Loader } from '../../components/Loader';
import { Catalog } from '../../components/Catalog';

import './TabletsPage.scss';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const getTabletsFromApi = async () => {
    try {
      const tabletsFromApi = [...await getProducts()]
        .filter(product => product.type === 'tablet');

      setTablets(tabletsFromApi);
      setIsInitialized(true);
    } catch {
      setResponseError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setResponseError(false);
    setIsInitialized(false);

    getTabletsFromApi();
  }, []);

  return (
    <div className="TabletsPage">
      <BreadCrumbs />

      <h1 className="TabletsPage__title">Tablets</h1>

      {responseError && (
        <Notification isError>
          Error! Unable to load tablets from server.
        </Notification>
      )}

      {isLoading && (
        <Loader />
      )}

      {isInitialized && (
        <Catalog products={tablets} />
      )}
    </div>
  );
};
