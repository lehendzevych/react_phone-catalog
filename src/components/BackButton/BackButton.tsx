import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconArrowLeft } from '../../icons/arrow_left.svg';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-cy="backButton"
      className="BackButton"
      onClick={() => navigate(-1)}
    >
      <IconArrowLeft className="BackButton__arrow-left" />

      <span>Back</span>
    </button>
  );
};
