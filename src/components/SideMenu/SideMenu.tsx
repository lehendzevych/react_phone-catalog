import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

import { ReactComponent as IconLike } from '../../icons/favourites.svg';
import { ReactComponent as IconCart } from '../../icons/cart.svg';

import './SideMenu.scss';

type Props = {
  links: { to: string, text: string }[];
  menuVisible: boolean;
  setMenuVisible: (bool: boolean) => void;
};

export const SideMenu: FC<Props> = ({ links, menuVisible, setMenuVisible }) => {
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const { favorites } = useAppSelector(state => state.favorites);

  const closeMenu = () => setMenuVisible(false);

  useEffect(() => {
    document.body.classList.toggle('SideMenu__body', menuVisible);
  }, [menuVisible]);

  return (
    <aside
      className={classNames(
        'SideMenu',
        { 'SideMenu--active': menuVisible },
      )}
    >
      <div className="SideMenu__wrapper">
        <div className="SideMenu__content">
          <nav className="SideMenu__nav">
            <ul className="SideMenu__menu">
              {links.map(link => (
                <li className="SideMenu__menu-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => classNames(
                      'SideMenu__menu-link',
                      { 'SideMenu__menu-link--active': isActive },
                    )}
                    onClick={closeMenu}
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

            <ul className="SideMenu__menu">
              <li className="SideMenu__menu-item">
                <NavLink
                  to="favorites"
                  className={({ isActive }) => classNames(
                    'SideMenu__menu-link',
                    { 'SideMenu__menu-link--active': isActive },
                  )}
                  onClick={closeMenu}
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
              </li>

              <li className="SideMenu__menu-item">
                <NavLink
                  to="cart"
                  className={({ isActive }) => classNames(
                    'SideMenu__menu-link',
                    { 'SideMenu__menu-link--active': isActive },
                  )}
                  onClick={closeMenu}
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
    </aside>
  );
};
