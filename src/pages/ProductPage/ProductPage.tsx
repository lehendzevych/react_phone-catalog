import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductById } from '../../api/getProductById';
import { getProducts } from '../../api/getProducts';

import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Notification } from '../../components/Notification';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';

import { ProductPreview } from './components/ProductPreview';
import { ProductChoice } from './components/ProductChoice';
import { ProductInfo } from './components/ProductInfo';

import './ProductPage.scss';

function getTechSpecs(device: ProductDetails) {
  return [
    { name: 'Screen', value: device.display.screenSize },
    { name: 'Resolution', value: device.display.screenResolution },
    { name: 'Processor', value: device.hardware.cpu },
    { name: 'RAM', value: device.storage.ram },
    { name: 'Built in memory', value: device.storage.flash },
    { name: 'Camera', value: device.camera.primary || '' },
    { name: 'OS', value: device.android.os },
    { name: 'Cell', value: device.connectivity.cell },
  ];
}

export const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const { productId = '' } = useParams();
  const productInfo = products.find(item => item.id === productId) || null;

  let techSpecs: { name: string, value: string }[] = [];

  if (product) {
    techSpecs = getTechSpecs(product);
  }

  const productsLoad = async () => {
    try {
      const productsFromApi = await getProducts();

      setProducts(productsFromApi);
    } catch {
      setResponseError(true);
    }
  };

  const productDetailsLoad = async (id: string) => {
    try {
      const productDetailsFromApi = await getProductById(id);

      setProduct(productDetailsFromApi);
      setIsInitialized(true);
    } catch {
      setResponseError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsInitialized(false);
    setResponseError(false);
    setIsLoading(true);

    if (productId) {
      productsLoad();
      productDetailsLoad(productId);
    }
  }, [productId]);

  return (
    <div className="ProductPage">
      {responseError && (
        <>
          <BackButton />

          <Notification isError>
            Error! Unable to load product from server.
          </Notification>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {isInitialized && (
        <>
          <BreadCrumbs productName={product?.name} />

          <BackButton />

          <h1 className="ProductPage__title">{product?.name}</h1>

          <div className="ProductPage__content">
            <span className="ProductPage__id">
              {`ID: ${product?.id}`}
            </span>

            <section className="ProductPage__slider">
              <ProductPreview images={product?.images || []} />
            </section>

            <section className="ProductPage__choice">
              <ProductChoice productInfo={productInfo} product={product} />
            </section>

            <section className="ProductPage__about">
              <ProductInfo title="About">
                <span data-cy="productDescription">
                  {product?.description}
                </span>
              </ProductInfo>
            </section>

            <section className="ProductPage__techSpecs">
              <ProductInfo title="Tech specs">
                {techSpecs.map(techParam => (
                  <div className="ProductPage__techParam" key={techParam.name}>
                    <span className="ProductPage__techParam-name">
                      {techParam.name}
                    </span>

                    <span className="ProductPage__techParam-value">
                      {techParam.value}
                    </span>
                  </div>
                ))}
              </ProductInfo>
            </section>
          </div>

          <section className="ProductPage__suggestedProducts">
            <ProductsSlider
              title="You may also like"
              products={getSuggestedProducts(products)}
            />
          </section>
        </>
      )}
    </div>
  );
};
