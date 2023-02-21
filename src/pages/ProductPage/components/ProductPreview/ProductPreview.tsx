import classNames from 'classnames';
import { FC, useState } from 'react';
import { Slider } from '../../../../class/Slider';

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
  const gap = 16;
  const itemsOnPage = 5;
  const itemHeight = 80;
  const containerWidth = (itemHeight * itemsOnPage) + (gap * (itemsOnPage - 1));
  const [slider, setSlider] = useState(
    new Slider(images.length, gap, containerWidth, itemsOnPage),
  );

  const prevSlide = () => setSlider(slider.prevSlide());
  const nextSlide = () => setSlider(slider.nextSlide());

  const onSelectImage = (e: React.MouseEvent, i: number): void => {
    e.preventDefault();

    setSelectedImg(i);
  };

  return (
    <div className="ProductPreview">
      <div className="ProductPreview__slides">
        <ul
          className="ProductPreview__slidesList"
          style={{
            transform: `translateY(-${slider.scrollTo}px)`,
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
            disabled={slider.index === 0}
          >
            <IconArrowUp className="ProductPreview__arrow" />
          </button>

          <button
            type="button"
            className="ProductPreview__button"
            onClick={nextSlide}
            disabled={slider.index + itemsOnPage === images.length}
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
