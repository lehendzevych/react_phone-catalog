import { FC } from 'react';
import { Product } from '../../types/Product';
import { CategorieCard } from './CategorieCard';
import './CategoriesCards.scss';

type Props = {
  products: Product[];
};

export const CategoriesCards: FC<Props> = ({ products }) => {
  const phones = products.filter(product => product.type === 'phone');
  const tablets = products.filter(product => product.type === 'tablet');
  const accessories = products.filter(product => product.type === 'accessory');

  const categories = [
    {
      name: 'Mobile phones', count: `${phones.length}`, url: 'phones', img: './img/phone.png', color: '#FCDBC1',
    },
    {
      name: 'Tablets', count: `${tablets.length}`, url: 'tablets', img: './img/tablet.png', color: '#8D8D92',
    },
    {
      name: 'Accessories', count: `${accessories.length}`, url: 'accessories', img: './img/accessories.png', color: '#973D5F',
    },
  ];

  return (
    <div className="CategoriesCards">
      <div className="CategoriesCards__header">
        <h2 className="CategoriesCards__title">
          Shop by category
        </h2>
      </div>

      <div className="CategoriesCards__body">
        <ul className="CategoriesCards__list" data-cy="categoryLinksContainer">
          {categories.map(categorie => (
            <li className="CategoriesCards__item" key={categorie.name}>
              <CategorieCard categorie={categorie} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
