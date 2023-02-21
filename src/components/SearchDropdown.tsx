import {
  FC, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { ReactComponent as IconArrowDown } from '../icons/arrow_down.svg';

type Props = {
  label: string;
  param: string;
  paramValue: string;
  options: {
    value: string,
    text?: string,
  }[];
};

export const SearchDropdown: FC<Props> = ({
  label, param, paramValue, options,
}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const currentOption = options.find(option => option.value === paramValue);

  const handleOnBlur = (event: MouseEvent) => {
    if (dropdown.current
      && !dropdown.current.contains(event.target as HTMLElement)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  }, [isActive]);

  return (
    <div
      className={classNames(
        'dropdown',
        { 'dropdown--active': isActive },
      )}
      ref={dropdown}
    >
      <span className="dropdown__label">{label}</span>

      <div className="dropdown__trigger">
        <button
          type="button"
          className="dropdown__button button"
          onClick={() => setIsActive(current => !current)}
        >
          <span>
            {currentOption?.text || currentOption?.value}
          </span>

          <IconArrowDown
            className="dropdown__icon"
          />
        </button>
      </div>

      <div className="dropdown__menu">
        <div className="dropdown__content">
          {options.map(option => (
            <SearchLink
              key={option.value}
              params={{ [param]: option.value, page: null }}
              className={classNames(
                'dropdown__item',
                { 'dropdown__item--active': paramValue === option.value },
              )}
              onClick={() => setIsActive(current => !current)}
            >
              {option.text ? option.text : option.value}
            </SearchLink>
          ))}
        </div>
      </div>
    </div>
  );
};
