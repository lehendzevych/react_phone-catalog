import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Notification } from '../../../../components/Notification';
import { CartProduct } from '../../../../types/CartProduct';
import { getHotPrice } from '../../../../utils/getHotPrice';

import './Checkout.scss';

type Props = {
  cartProducts: CartProduct[];
};

export const Checkout: FC<Props> = ({ cartProducts }) => {
  const [checkoutClick, setCheckoutClick] = useState(false);

  const totalSum = () => {
    let total = 0;

    cartProducts.forEach(cartProduct => {
      const productPrice = !cartProduct.product.discount
        ? cartProduct.product.price
        : getHotPrice(cartProduct.product.price, cartProduct.product.discount);

      total += cartProduct.quantity * productPrice;
    });

    return total;
  };

  const totalItems = () => {
    let total = 0;

    cartProducts.forEach(cartProduct => {
      total += cartProduct.quantity;
    });

    return total;
  };

  useEffect(() => {
    if (checkoutClick) {
      setTimeout(() => setCheckoutClick(false), 5000);
    }
  }, [checkoutClick]);

  return (
    <div className="Checkout">
      <span className="Checkout__price">{`$${totalSum()}`}</span>

      <span className="Checkout__total" data-cy="productQauntity">
        {`Total for ${totalItems()} items`}
      </span>

      <hr className="Checkout__hr" />

      <button
        type="button"
        className="Checkout__button button is-primary"
        onClick={() => setCheckoutClick(true)}
      >
        Checkout
      </button>

      <div
        className={classNames(
          'Checkout__error',
          { 'is-active': checkoutClick },
        )}
      >
        <Notification isError>
          We are sorry, but this feature is not implemented yet
        </Notification>
      </div>
    </div>
  );
};
