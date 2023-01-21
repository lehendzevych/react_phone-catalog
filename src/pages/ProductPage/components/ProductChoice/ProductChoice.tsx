import { FC } from 'react';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';
import { OrderButtons } from '../../../../components/OrderButtons';
import { getHotPrice } from '../../../../utils/getHotPrice';

import './ProductChoice.scss';

type Props = {
  productInfo: Product | null;
  product: ProductDetails | null;
};

export const ProductChoice: FC<Props> = ({ productInfo, product }) => (
  <div className="ProductChoice">
    <span className="ProductChoice__text">Available colors</span>

    <div className="ProductChoice__availableColors">
      <div className="ProductChoice__colorCircle">
        <span className="ProductChoice__colorCircle-bg is-gold" />
      </div>

      <div className="ProductChoice__colorCircle">
        <span className="ProductChoice__colorCircle-bg is-grey" />
      </div>

      <div className="ProductChoice__colorCircle is-active">
        <span className="ProductChoice__colorCircle-bg is-black" />
      </div>

      <div className="ProductChoice__colorCircle">
        <span className="ProductChoice__colorCircle-bg is-white" />
      </div>
    </div>

    <hr className="ProductChoice__colorHr" />

    <span className="ProductChoice__text">Select capacity</span>

    <div className="ProductChoice__capacityButtons">
      <button
        type="button"
        className="ProductChoice__capacityButton button is-active"
      >
        64 GB
      </button>

      <button
        type="button"
        className="ProductChoice__capacityButton button"
      >
        256 GB
      </button>

      <button
        type="button"
        className="ProductChoice__capacityButton button"
      >
        512 GB
      </button>
    </div>

    <hr className="ProductChoice__capacityHr" />

    <div className="ProductChoice__prices">
      <span className="ProductChoice__price">
        {!productInfo?.discount
          ? `$${productInfo?.price}`
          : `$${getHotPrice(productInfo?.price, productInfo?.discount)}`}
      </span>

      {!productInfo?.discount || (
        <span className="ProductChoice__oldPrice">
          {`$${productInfo?.price}`}
        </span>
      )}
    </div>

    <div className="ProductChoice__buttons">
      <OrderButtons product={productInfo} height="48px" />
    </div>

    <div className="ProductChoice__details">
      <div className="ProductChoice__detail">
        <span className="ProductChoice__detail-option">Screen</span>

        <span className="ProductChoice__detail-value">
          {product?.display.screenSize}
        </span>
      </div>

      <div className="ProductChoice__detail">
        <span className="ProductChoice__detail-option">Resolution</span>

        <span className="ProductChoice__detail-value">
          {product?.display.screenResolution}
        </span>
      </div>

      <div className="ProductChoice__detail">
        <span className="ProductChoice__detail-option">Processor</span>

        <span className="ProductChoice__detail-value">
          {product?.hardware.cpu}
        </span>
      </div>

      <div className="ProductChoice__detail">
        <span className="ProductChoice__detail-option">RAM</span>

        <span className="ProductChoice__detail-value">
          {product?.storage.ram || '-'}
        </span>
      </div>
    </div>
  </div>
);
