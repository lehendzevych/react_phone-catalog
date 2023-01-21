import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getHotPrice } from '../../utils/getHotPrice';

import './ProductCard.scss';
import { OrderButtons } from '../OrderButtons';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const {
    name, imageUrl, price, discount, screen, capacity, ram,
  } = product;

  return (
    <div className="ProductCard">
      <img
        src={imageUrl}
        alt={name}
        className="ProductCard__image"
      />

      <Link to={`/${product.type}s/${product.id}`} className="ProductCard__link">
        {name}
      </Link>

      <span className="ProductCard__price">
        {!discount ? `$${price}` : `$${getHotPrice(price, discount)}`}
      </span>

      {!discount || (
        <span className="ProductCard__oldprice">
          {`$${price}`}
        </span>
      )}

      <hr className="ProductCard__hr" />

      <div className="ProductCard__details">
        <div className="ProductCard__detail">
          <p className="ProductCard__detail-option">Screen</p>
          <p className="ProductCard__detail-value">{screen || '-'}</p>
        </div>

        <div className="ProductCard__detail">
          <p className="ProductCard__detail-option">Capacity</p>
          <p className="ProductCard__detail-value">{capacity || '-'}</p>
        </div>

        <div className="ProductCard__detail">
          <p className="ProductCard__detail-option">RAM</p>
          <p className="ProductCard__detail-value">{ram || '-'}</p>
        </div>
      </div>

      <OrderButtons product={product} height="40px" />
    </div>
  );
};
