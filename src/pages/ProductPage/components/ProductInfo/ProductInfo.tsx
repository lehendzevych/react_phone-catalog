import { FC } from 'react';

import './ProductInfo.scss';

type Props = {
  title: string;
};

export const ProductInfo: FC<Props> = ({ children, title }) => (
  <div className="ProductInfo">
    <h2 className="ProductInfo__title">{title}</h2>

    <hr className="ProductInfo__hr" />

    <div className="ProductInfo__content">
      {children}
    </div>
  </div>
);
