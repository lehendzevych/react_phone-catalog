import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

import { ReactComponent as IconLike } from '../../icons/favourites.svg';
import { ReactComponent as IconCart } from '../../icons/cart.svg';

import './SideMenu.scss';

type Props = {
  links: { to: string, text: string }[];
  isOpen: boolean;
  onClose: (bool: boolean) => void;
};

export const SideMenu: FC<Props> = ({ links, isOpen, onClose }) => {
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const { favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('SideMenu__body');
    } else {
      document.body.classList.remove('SideMenu__body');
    }
  }, [isOpen]);

  return (
    <div
      className={classNames(
        'SideMenu',
        { 'is-active': isOpen },
      )}
    >
      <div className="SideMenu__menu">
        <div className="SideMenu__content">
          <nav className="SideMenu__nav">
            <ul className="menu">
              {links.map(link => (
                <li className="menu__item" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => classNames(
                      'SideMenu__link menu__link',
                      { 'is-active': isActive },
                    )}
                    onClick={() => onClose(false)}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="SideMenu__footer">
            <div className="SideMenu__hr">
              <hr />
            </div>

            <ul className="menu">
              <li className="menu__item">
                <NavLink
                  to="favorites"
                  className={({ isActive }) => classNames(
                    'SideMenu__link menu__link',
                    { 'is-active': isActive },
                  )}
                  onClick={() => onClose(false)}
                >
                  <div className="icon">
                    <IconLike />

                    {favorites.length > 0 && (
                      <span className="icon__counter">
                        {favorites.length}
                      </span>
                    )}
                  </div>

                  <span>Favorites</span>
                </NavLink>

                <NavLink
                  to="cart"
                  className={({ isActive }) => classNames(
                    'SideMenu__link menu__link',
                    { 'is-active': isActive },
                  )}
                  onClick={() => onClose(false)}
                >
                  <div className="icon">
                    <IconCart />

                    {cartProducts.length > 0 && (
                      <span className="icon__counter">
                        {cartProducts.length}
                      </span>
                    )}
                  </div>

                  <span>Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="SideMenu__bg" />
    </div>
  );
};
