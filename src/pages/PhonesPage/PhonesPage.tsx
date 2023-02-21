import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/getPhones';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Notification } from '../../components/Notification';
import { Loader } from '../../components/Loader';
import { Catalog } from '../../components/Catalog';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [responseError, setResponseError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then((data) => {
        setPhones(data);
        setIsInitialized(true);
      })
      .catch(() => setResponseError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="PhonesPage">
      <BreadCrumbs />

      <h1 className="PhonesPage__title">Mobile phones</h1>

      {responseError && (
        <Notification isError>
          Error! Unable to load phones from server.
        </Notification>
      )}

      {isLoading && (
        <Loader />
      )}

      {isInitialized && (
        <Catalog products={phones} />
      )}
    </div>
  );
};
