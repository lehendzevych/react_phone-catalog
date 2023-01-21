import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { SideMenu } from '../SideMenu';
import { SearchInput } from '../SearchInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartProductActions from '../../app/features/cartProductsSlice';
import * as favoritesActions from '../../app/features/favoritesSlice';

import { ReactComponent as StoreLogo } from '../../svg/logo.svg';
import { ReactComponent as IconLike } from '../../icons/favourites.svg';
import { ReactComponent as IconCart } from '../../icons/cart.svg';
import { ReactComponent as IconBurger } from '../../icons/menu_burger.svg';

const navLinks = [
  { to: '/', text: 'Home' },
  { to: 'phones', text: 'Phones' },
  { to: 'tablets', text: 'Tablets' },
  { to: 'accessories', text: 'Accessories' },
];

export const Header: FC = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const { favorites } = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const pathNames = pathname.slice(1).split('/');
  const currentPage = pathNames[0].toLocaleLowerCase();
  const searchVisibleOn = ['phones', 'tablets', 'accessories', 'favorites'];
  const searchVisible = searchVisibleOn.includes(currentPage)
    && pathNames.length === 1;

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem('cart');

    if (cartFromLocalStorage) {
      dispatch(
        cartProductActions.setCartProducts(
          JSON.parse(cartFromLocalStorage),
        ),
      );
    }

    const favoritesFromLocalStorage = localStorage.getItem('favorites');

    if (favoritesFromLocalStorage) {
      dispatch(
        favoritesActions.setFavorites(
          JSON.parse(favoritesFromLocalStorage),
        ),
      );
    }
  }, []);

  return (
    <>
      <header className="Header">
        <button
          type="button"
          className="Header__burger"
          onClick={() => setSideMenu(bool => !bool)}
        >
          <IconBurger
            className={classNames(
              'Header__burger-svg',
              { 'is-active': sideMenu },
            )}
          />
        </button>

        <div className="Header__container">
          <NavLink to="/" className="Header__logo">
            <StoreLogo />
          </NavLink>

          <nav className="Header__nav">
            <ul className="menu">
              {navLinks.map(link => (
                <li className="menu__item" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => classNames(
                      'Header__link menu__link',
                      { 'is-active': isActive },
                    )}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="Header__container">
          {searchVisible && <SearchInput />}

          <NavLink
            to="favorites"
            className={({ isActive }) => classNames(
              'Header__link Header__button Header__cartButton',
              { 'is-active': isActive },
            )}
          >
            <div className="icon">
              <IconLike />

              {favorites.length > 0 && (
                <span className="icon__counter">
                  {favorites.length}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="cart"
            className={({ isActive }) => classNames(
              'Header__link Header__button Header__cartButton',
              { 'is-active': isActive },
            )}
          >
            <div className="icon">
              <IconCart />

              {cartProducts.length > 0 && (
                <span className="icon__counter">
                  {cartProducts.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      <SideMenu
        links={navLinks}
        isOpen={sideMenu}
        onClose={setSideMenu}
      />
    </>
  );
};
