import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/getNumbers';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import { ReactComponent as IconArrowLeft } from '../../icons/arrow_left.svg';
import { ReactComponent as IconArrowRight } from '../../icons/arrow_right.svg';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const Pagination: FC<Props> = ({ total, perPage, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const onPrevPage = () => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage - 1}` }),
    );
  };

  const onNextPage = () => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage + 1}` }),
    );
  };

  return (
    <div className="Pagination" data-cy="pagination">
      <button
        data-cy="paginationLeft"
        type="button"
        className="Pagination__button button"
        onClick={onPrevPage}
        disabled={isFirstPage}
      >
        <IconArrowLeft />
      </button>

      <ul className="Pagination__pages">
        {pages.map(page => (
          <li className="Pagination__page" key={page}>
            <SearchLink
              params={{ page: `${page}` }}
              className={classNames(
                'Pagination__button button is-light',
                {
                  'is-active': page === currentPage,
                },
              )}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>

      <button
        data-cy="paginationRight"
        type="button"
        className="Pagination__button button"
        onClick={onNextPage}
        disabled={isLastPage}
      >
        <IconArrowRight />
      </button>
    </div>
  );
};
