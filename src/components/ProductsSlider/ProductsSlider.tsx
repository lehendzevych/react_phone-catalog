import {
  FC, useEffect, useRef, useState,
} from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { ReactComponent as IconArrowLeft } from '../../icons/arrow_left.svg';
import { ReactComponent as IconArrowRight } from '../../icons/arrow_right.svg';

import './ProductsSlider.scss';
import { Slider } from '../../class/Slider';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: FC<Props> = ({ title, products }) => {
  const gap = 16;
  const list = useRef<HTMLUListElement>(null);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [listWidth, setListWidth] = useState(0);
  const [slider, setSlider] = useState(
    new Slider(products.length, gap, 0, 0),
  );

  const prevSlide = () => setSlider(slider.prevSlide());
  const nextSlide = () => setSlider(slider.nextSlide());

  const handleResize = () => {
    setBodyWidth(window.innerWidth);

    if (list.current) {
      setListWidth(list.current.clientWidth);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    slider.containerWidth = listWidth;

    if (bodyWidth >= 1136) {
      slider.itemsOnPage = 4;
    }

    if (bodyWidth >= 1024 && bodyWidth < 1136) {
      slider.itemsOnPage = 3;
    }

    if (bodyWidth >= 640 && bodyWidth < 1024) {
      slider.itemsOnPage = 2;
    }

    if (bodyWidth < 640) {
      slider.itemsOnPage = 1;
    }

    setItemWidth(slider.itemWidth);
  }, [listWidth]);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__header">
        <h2 className="ProductsSlider__title">
          {title}
        </h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button button"
            onClick={prevSlide}
            disabled={slider.index === 0}
          >
            <IconArrowLeft />
          </button>

          <button
            type="button"
            className="ProductsSlider__button button"
            onClick={nextSlide}
            disabled={slider.index + slider.itemsOnPage === products.length}
          >
            <IconArrowRight />
          </button>
        </div>
      </div>

      <div className="ProductsSlider__body">
        <ul
          ref={list}
          data-cy="cardsContainer"
          className="ProductsSlider__list"
          style={{
            transform: `translateX(-${slider.scrollTo}px)`,
          }}
        >
          {products.map(product => (
            <li
              key={product.id}
              className="ProductsSlider__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
