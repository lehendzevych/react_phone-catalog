import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as IconHome } from '../../icons/home.svg';
import { ReactComponent as IconArrowRight } from '../../icons/arrow_right.svg';

import './BreadCrumbs.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  productName?: string;
};

export const BreadCrumbs: FC<Props> = ({ productName }) => {
  const { pathname } = useLocation();
  const pathNames = pathname.slice(1).split('/');
  const categoryLink = pathNames[0].toLocaleLowerCase();
  const categoryName = categoryLink[0]
    .toLocaleUpperCase() + categoryLink.slice(1);

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/" className="BreadCrumbs__icon">
        <IconHome className="BreadCrumbs__home" />
      </Link>

      <IconArrowRight className="BreadCrumbs__arrow-right" />

      {pathNames.length > 1 ? (
        <Link to={`/${categoryLink}`} className="BreadCrumbs__link">
          {categoryName}
        </Link>
      ) : (
        <span className="BreadCrumbs__text">
          {categoryName}
        </span>
      )}

      {productName && (
        <>
          <IconArrowRight className="BreadCrumbs__arrow-right" />

          <span className="BreadCrumbs__text">
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
