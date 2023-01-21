import { useEffect, useState } from 'react';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Notification } from '../../components/Notification';
import { Loader } from '../../components/Loader';
import { Catalog } from '../../components/Catalog';

import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const getAccessoriesFromApi = async () => {
    try {
      const accessoriesFromApi = [...await getProducts()]
        .filter(product => product.type === 'accessory');

      setAccessories(accessoriesFromApi);
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

    getAccessoriesFromApi();
  }, []);

  return (
    <div className="AccessoriesPage">
      <BreadCrumbs />

      <h1 className="AccessoriesPage__title">Accessories</h1>

      {responseError && (
        <Notification isError>
          Error! Unable to load accessories from server.
        </Notification>
      )}

      {isLoading && (
        <Loader />
      )}

      {isInitialized && (
        <Catalog products={accessories} />
      )}
    </div>
  );
};
