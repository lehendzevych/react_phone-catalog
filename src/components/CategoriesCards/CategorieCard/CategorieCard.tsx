import { FC } from 'react';
import { Link } from 'react-router-dom';

import './CategorieCard.scss';

type Props = {
  categorie: {
    name: string;
    count: string;
    url: string;
    img: string;
    color?: string;
  }
};

export const CategorieCard: FC<Props> = ({ categorie }) => {
  const {
    name, count, url, img, color,
  } = categorie;

  return (
    <div className="CategorieCard">
      <Link to={url} className="CategorieCard__link">
        <div
          className="CategorieCard__imageContainer"
          style={{ background: `${color}` }}
        >
          <img src={img} alt={name} className="CategorieCard__image" />
        </div>

        {name}
      </Link>

      <p className="CategorieCard__count">
        {`${count} models`}
      </p>
    </div>
  );
};
