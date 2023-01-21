import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import { ReactComponent as IconClose } from '../../icons/close.svg';

import './SearchInput.scss';

export const SearchInput = () => {
  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParams);
  const searchInput = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();
  const pathNames = pathname.slice(1).split('/');
  const searchIn = pathNames[0].toLocaleLowerCase();

  const onQueryChange = (value: string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  const focusInput = () => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const onQueryClear = () => {
    setQuery('');
    focusInput();
  };

  useEffect(() => {
    if (search) {
      focusInput();
    }
  }, [search]);

  useEffect(() => {
    setQuery(queryParams);
  }, [queryParams]);

  useEffect(() => {
    let timerId = 0;

    timerId = window.setTimeout(() => onQueryChange(query), 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [query]);

  return (
    <div
      className={classNames(
        'SearchInput',
        { 'is-active': search },
      )}
    >
      <div className="SearchInput__content">
        <div className="SearchInput__wrapper">
          <input
            ref={searchInput}
            type="text"
            placeholder={`Search in ${searchIn}...`}
            className="SearchInput__input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {queryParams !== query && (
          <span className="SearchInput__loader" />
        )}

        {!query ? (
          <>
            <div className="SearchInput__icon-search">
              <IconSearch />
            </div>

            <button
              type="button"
              className="SearchInput__mobile-button"
              onClick={() => setSearch(current => !current)}
            >
              <IconSearch />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="SearchInput__clear"
            onClick={onQueryClear}
          >
            <IconClose />
          </button>
        )}
      </div>
    </div>
  );
};
