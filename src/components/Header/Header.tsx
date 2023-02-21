import { FC, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useAppSelector } from '../../app/hooks';
import { SideMenu } from '../SideMenu';
import { SearchInput } from '../SearchInput';

import { ReactComponent as StoreLogo } from '../../icons/logo.svg';
import { ReactComponent as IconLike } from '../../icons/favourites.svg';
import { ReactComponent as IconCart } from '../../icons/cart.svg';
import { ReactComponent as IconBurger } from '../../icons/menu_burger.svg';

import './Header.scss';

const navLinks = [
  { to: '/', text: 'Home' },
  { to: 'phones', text: 'Phones' },
  { to: 'tablets', text: 'Tablets' },
  { to: 'accessories', text: 'Accessories' },
];

export const Header: FC = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const { favorites } = useAppSelector(state => state.favorites);
  const { pathname } = useLocation();
  const pathNames = pathname.slice(1).split('/');
  const currentPage = pathNames[0].toLocaleLowerCase();
  const searchVisibleOn = ['phones', 'tablets', 'accessories', 'favorites'];
  const searchVisible = searchVisibleOn.includes(currentPage)
    && pathNames.length === 1;

  return (
    <>
      <header className="Header">
        <button
          type="button"
          className="Header__burger"
          onClick={() => setSideMenuVisible(bool => !bool)}
        >
          <IconBurger
            className={classNames(
              'Header__burger-svg',
              { 'Header__burger-svg--active': sideMenuVisible },
            )}
          />
        </button>

        <div className="Header__container">
          <Link to="/" className="Header__logo">
            <StoreLogo />
          </Link>

          <nav className="Header__nav">
            <ul className="Header__menu">
              {navLinks.map(link => (
                <li className="Header__menu-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => classNames(
                      'Header__menu-link',
                      { 'Header__menu-link--active': isActive },
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
              'Header__link Header__button',
              { 'Header__link--active': isActive },
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
              'Header__link Header__button',
              { 'Header__link--active': isActive },
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
        menuVisible={sideMenuVisible}
        setMenuVisible={setSideMenuVisible}
      />
    </>
  );
};
