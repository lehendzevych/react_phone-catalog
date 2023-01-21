import { FC } from 'react';
import classNames from 'classnames';

import './Notification.scss';

type Props = {
  isError?: boolean;
  isSuccess?: boolean;
};

export const Notification: FC<Props> = ({ children, isError, isSuccess }) => (
  <div
    className={classNames(
      'Notification',
      { 'is-error': isError, 'is-success': isSuccess },
    )}
  >
    {children}
  </div>
);

Notification.defaultProps = {
  isError: false,
  isSuccess: false,
};
