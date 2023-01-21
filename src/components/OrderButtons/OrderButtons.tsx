import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartProductActions from '../../app/features/cartProductsSlice';
import * as favoritesActions from '../../app/features/favoritesSlice';

import { ReactComponent as IconLike } from '../../icons/favourites.svg';
import {
  ReactComponent as IconLikeFilled,
} from '../../icons/favourites_filled.svg';

import './OrderButtons.scss';

type Props = {
  product: Product | null;
  height: string;
};

export const OrderButtons: FC<Props> = ({ product, height }) => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const [cartProduct, setCartProduct] = useState<CartProduct | null>(null);
  const { favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    const match = cartProducts.find(
      item => item.id === product?.id,
    );

    if (match) {
      setCartProduct(match);
    }

    if (!match && product) {
      const newCartProduct = {
        id: product.id,
        product: { ...product },
        quantity: 1,
      };

      setCartProduct(newCartProduct);
    }
  }, []);

  const isCartButtonActive = cartProducts.some(
    item => item.id === cartProduct?.id,
  );
  const isFavoriteButtonActive = favorites.some(
    item => item.id === product?.id,
  );

  const handlerCartButtonClick = () => {
    if (isCartButtonActive && cartProduct) {
      dispatch(cartProductActions.deleteCartProduct(cartProduct));

      return;
    }

    dispatch(cartProductActions.addCartProduct(cartProduct));
  };

  const handlerFavoriteButtonClick = () => {
    if (isFavoriteButtonActive && product) {
      dispatch(favoritesActions.deleteFavorite(product));

      return;
    }

    dispatch(favoritesActions.addFavorite(product));
  };

  return (
    <div className="OrderButtons" style={{ height }}>
      <button
        type="button"
        className={classNames(
          'OrderButtons__cart button is-primary',
          { 'is-active': isCartButtonActive },
        )}
        onClick={handlerCartButtonClick}
      >
        {!isCartButtonActive
          ? 'Add to cart'
          : 'Added to cart'}
      </button>

      <button
        type="button"
        data-cy="addToFavorite"
        className="OrderButtons__like button"
        style={{ width: height }}
        onClick={handlerFavoriteButtonClick}
      >
        {!isFavoriteButtonActive
          ? <IconLike />
          : <IconLikeFilled />}
      </button>
    </div>
  );
};
