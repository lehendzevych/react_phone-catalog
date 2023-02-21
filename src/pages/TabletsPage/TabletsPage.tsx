import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getTablets } from '../../api/getTablets';

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

  useEffect(() => {
    setIsLoading(true);

    getTablets()
      .then((data) => {
        setTablets(data);
        setIsInitialized(true);
      })
      .catch(() => setResponseError(true))
      .finally(() => setIsLoading(false));
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
