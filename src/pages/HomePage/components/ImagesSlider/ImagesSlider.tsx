import {
  FC, useState, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {
  ReactComponent as IconArrowLeft,
} from '../../../../icons/arrow_left.svg';
import {
  ReactComponent as IconArrowRight,
} from '../../../../icons/arrow_right.svg';

import './ImagesSlider.scss';

type Props = {
  images: {
    url?: string;
    src: string;
    alt: string;
  }[];
};

export const ImagesSlider: FC<Props> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [scroll, setScroll] = useState(0);
  const imageContainer = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (images.length - 1 === imageIndex) {
      setImageIndex(0);
    } else {
      setImageIndex(current => current + 1);
    }
  };

  const prevSlide = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex(current => current - 1);
    }
  };

  const onScroll = () => {
    setScroll(imageIndex * imageWidth);
  };

  useEffect(() => {
    const handleImageWidth = () => {
      if (imageContainer.current) {
        setImageWidth(imageContainer.current.clientWidth);
      }
    };

    handleImageWidth();

    window.addEventListener('resize', handleImageWidth);

    return () => {
      window.removeEventListener('resize', handleImageWidth);
    };
  }, []);

  useEffect(() => {
    onScroll();
  }, [imageIndex, imageWidth]);

  useEffect(() => {
    const timerId = setTimeout(nextSlide, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [imageIndex]);

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
            style={{ transform: `translateX(-${scroll}px)` }}
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
              { 'is-active': imageIndex === i },
            )}
            onClick={() => setImageIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
