import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/getProducts';

import { Notification } from '../../components/Notification';
import { Loader } from '../../components/Loader';
import { ImagesSlider } from '../../components/ImagesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { CategoriesCards } from '../../components/CategoriesCards';

import { getHotPriceProducts } from '../../utils/getHotPriceProducts';
import { getBrandNewProducts } from '../../utils/getBrandNewProducts';
import { sliderImages } from '../../helpers/sliderImages';

import './HomePage.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [responseError, setResponseError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((data) => {
        setProducts(data);
        setIsInitialized(true);
      })
      .catch(() => setResponseError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="HomePage">
      {responseError && (
        <Notification isError>
          Error! Unable to load products from server.
        </Notification>
      )}

      {isLoading && (
        <Loader />
      )}

      {isInitialized && (
        <>
          <section id="images-slider">
            <ImagesSlider images={sliderImages} />
          </section>

          <section id="hot-prices">
            <ProductsSlider
              title="Hot prices"
              products={getHotPriceProducts(products)}
            />
          </section>

          <section id="categories">
            <CategoriesCards products={products} />
          </section>

          <section id="new-models">
            <ProductsSlider
              title="Brand new models"
              products={getBrandNewProducts(products)}
            />
          </section>
        </>
      )}
    </div>
  );
};
