import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowUp } from '../../icons/arrow_up.svg';
import { ReactComponent as StoreLogo } from '../../icons/logo.svg';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__container container">
        <ul className="Footer__list">
          <li className="Footer__list-item">
            <a
              href="https://github.com/lehendzevych/react_phone-catalog"
              className="Footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>

          <li className="Footer__list-item">
            <Link
              to="contacts"
              className="Footer__link"
            >
              Contacts
            </Link>
          </li>

          <li className="Footer__list-item">
            <Link
              to="rights"
              className="Footer__link"
            >
              Rights
            </Link>
          </li>
        </ul>

        <div className="Footer__content">
          <Link to="/" className="Footer__logo">
            <StoreLogo />
          </Link>

          <button
            type="button"
            className="Footer__topLink"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span className="Footer__topLink-text">Back to top</span>

            <div className="Footer__topLink-button button">
              <IconArrowUp className="Footer__arrow-up" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
