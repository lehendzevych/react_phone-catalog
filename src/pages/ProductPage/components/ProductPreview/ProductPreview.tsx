import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import {
  ReactComponent as IconArrowDown,
} from '../../../../icons/arrow_down.svg';
import { ReactComponent as IconArrowUp } from '../../../../icons/arrow_up.svg';

import './ProductPreview.scss';

type Props = {
  images: string[];
};

export const ProductPreview: FC<Props> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [index, setIndex] = useState(0);
  const [scroll, setScroll] = useState(0);
  const gap = 16;
  const itemHeight = 80;

  const nextSlide = () => {
    setIndex(current => current + 1);
  };

  const prevSlide = () => {
    setIndex(current => current - 1);
  };

  const onScroll = () => {
    setScroll(index * (itemHeight + gap));
  };

  const onSelectImage = (e: React.MouseEvent, i: number): void => {
    e.preventDefault();

    setSelectedImg(i);
  };

  useEffect(() => {
    onScroll();
  }, [index]);

  return (
    <div className="ProductPreview">
      <div className="ProductPreview__slides">
        <ul
          className="ProductPreview__slidesList"
          style={{
            transform: `translateY(-${scroll}px)`,
          }}
        >
          {images.map((img, i) => (
            <li className="ProductPreview__item" key={img}>
              <a
                href="/"
                onClick={e => onSelectImage(e, i)}
                className="ProductPreview__link"
              >
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className={classNames(
                    'ProductPreview__slide',
                    { 'is-active': selectedImg === i },
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {images.length > 5 && (
        <div className="ProductPreview__arrows">
          <button
            type="button"
            className="ProductPreview__button"
            onClick={prevSlide}
            disabled={index === 0}
          >
            <IconArrowUp className="ProductPreview__arrow" />
          </button>

          <button
            type="button"
            className="ProductPreview__button"
            onClick={nextSlide}
            disabled={index + 5 === images.length}
          >
            <IconArrowDown className="ProductPreview__arrow" />
          </button>
        </div>
      )}

      <div className="ProductPreview__imageContainer">
        <img
          src={images[selectedImg]}
          alt="image1"
          className="ProductPreview__image"
        />
      </div>
    </div>
  );
};
