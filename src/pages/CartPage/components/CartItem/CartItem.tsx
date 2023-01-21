import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CartProduct } from '../../../../types/CartProduct';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as cartProductActions
  from '../../../../app/features/cartProductsSlice';
import { getHotPrice } from '../../../../utils/getHotPrice';

import { ReactComponent as IconClose } from '../../../../icons/close.svg';
import { ReactComponent as IconMinus } from '../../../../icons/minus.svg';
import { ReactComponent as IconPlus } from '../../../../icons/plus.svg';

import './CartItem.scss';

type Props = {
  item: CartProduct;
};

export const CartItem: FC<Props> = ({ item }) => {
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const dispatch = useAppDispatch();
  const newCartProducts: CartProduct[] = [];

  const handlerMinusButtonClick = (id: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === id) {
        copy.quantity = currentProduct.quantity - 1;
      }

      newCartProducts.push(copy);
    });
    dispatch(cartProductActions.setCartProducts(newCartProducts));
  };

  const handlerPlusButtonClick = (id: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === id) {
        copy.quantity = currentProduct.quantity + 1;
      }

      newCartProducts.push(copy);
    });
    dispatch(cartProductActions.setCartProducts(newCartProducts));
  };

  const handlerDeleteButton = (product: CartProduct) => {
    dispatch(cartProductActions.deleteCartProduct(product));
  };

  return (
    <div className="CartItem">
      <div className="CartItem__product">
        <button
          data-cy="cartDeleteButton"
          type="button"
          className="CartItem__delete"
          onClick={() => handlerDeleteButton(item)}
        >
          <IconClose className="CartItem__delete-svg" />
        </button>

        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="CartItem__image"
        />

        <Link
          to={`/${item.product.type}s/${item.product.id}`}
          className="CartItem__title"
        >
          {item.product.name}
        </Link>
      </div>

      <hr className="CartItem__hr" />

      <div className="CartItem__choise">
        <div className="CartItem__counter">
          <button
            type="button"
            className="CartItem__button button"
            onClick={() => handlerMinusButtonClick(item.id)}
            disabled={item.quantity === 1}
          >
            <IconMinus />
          </button>

          <span
            className="CartItem__count"
            data-cy="productQauntity"
          >
            {item.quantity}
          </span>

          <button
            type="button"
            className="CartItem__button button"
            onClick={() => handlerPlusButtonClick(item.id)}
          >
            <IconPlus />
          </button>
        </div>
        <div className="CartItem__price">
          {!item.product.discount
            ? `$${item.product.price * item.quantity}`
            : `$${getHotPrice(item.product.price, item.product.discount) * item.quantity}`}
        </div>
      </div>
    </div>
  );
};
