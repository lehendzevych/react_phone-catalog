import { Link } from 'react-router-dom';
import { ReactComponent as IconHome } from '../../icons/home.svg';
import { ReactComponent as DeadSmile } from '../../icons/404.svg';

import './PageNotFound.scss';

export const PageNotFound = () => (
  <div className="PageNotFound">
    <DeadSmile className="PageNotFound__svg" />

    <h1 className="PageNotFound__title">404</h1>

    <span className="PageNotFound__text">Page not found</span>

    <Link to="/" className="PageNotFound__home-link">
      <IconHome />
      <span>Back to home page</span>
    </Link>
  </div>
);
