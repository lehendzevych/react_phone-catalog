import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/getAccessories';

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

  useEffect(() => {
    setIsLoading(true);

    getAccessories()
      .then((data) => {
        setAccessories(data);
        setIsInitialized(true);
      })
      .catch(() => setResponseError(true))
      .finally(() => setIsLoading(false));
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
