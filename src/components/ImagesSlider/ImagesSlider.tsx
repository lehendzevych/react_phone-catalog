import {
  FC, useState, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Slider } from '../../class/Slider';

import { ReactComponent as IconArrowLeft } from '../../icons/arrow_left.svg';
import { ReactComponent as IconArrowRight } from '../../icons/arrow_right.svg';

import './ImagesSlider.scss';

type Props = {
  images: {
    url?: string;
    src: string;
    alt: string;
  }[];
};

export const ImagesSlider: FC<Props> = ({ images }) => {
  const [imageWidth, setImageWidth] = useState(0);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState(
    new Slider(images.length, 0, 0, 1, true),
  );

  const prevSlide = () => setSlider(slider.prevSlide());
  const nextSlide = () => setSlider(slider.nextSlide());
  const setSlide = (index: number) => setSlider(slider.setIndex(index));

  const handleResize = () => {
    if (imageContainer.current) {
      setImageWidth(imageContainer.current.clientWidth);
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
    slider.containerWidth = imageWidth;
  }, [imageWidth]);

  useEffect(() => {
    const timerId = setTimeout(nextSlide, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [slider.index]);

  return (
    <div className="ImagesSlider">
      <div className="ImagesSlider__content">
        <button
          type="button"
          className="ImagesSlider__button button"
          onClick={prevSlide}
        >
          <IconArrowLeft />
        </button>

        <div className="ImagesSlider__imageContainer" ref={imageContainer}>
          <ul
            className="ImagesSlider__list"
            style={{ transform: `translateX(-${slider.scrollTo}px)` }}
          >
            {images.map(image => (
              <li className="ImagesSlider__item" key={image.src}>
                {image.url ? (
                  <Link to={image.url}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="ImagesSlider__image"
                    />
                  </Link>
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="ImagesSlider__image"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="ImagesSlider__button button"
          onClick={nextSlide}
        >
          <IconArrowRight />
        </button>
      </div>

      <div className="ImagesSlider__dots">
        {images.map((image, i) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            key={image.src}
            title={image.alt}
            className={classNames(
              'ImagesSlider__dot',
              { 'ImagesSlider__dot--active': slider.index === i },
            )}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};
