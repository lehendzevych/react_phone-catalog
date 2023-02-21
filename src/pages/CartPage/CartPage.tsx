import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton';
import { Notification } from '../../components/Notification';

import './CartPage.scss';
import { CartItem } from './components/CartItem';
import { Checkout } from './components/Checkout';

export const CartPage = () => {
  const { cartProducts } = useAppSelector(state => state.cartProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CartPage">
      <BackButton />

      <h1 className="CartPage__title">Cart</h1>

      {!cartProducts.length ? (
        <Notification>
          Your cart is empty
        </Notification>
      ) : (
        <div className="CartPage__content">
          <ul className="CartPage__list">
            {cartProducts.map(item => (
              <li className="CartPage__item" key={item.product.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <div className="CartPage__checkout">
            <Checkout cartProducts={cartProducts} />
          </div>
        </div>
      )}
    </div>
  );
};
