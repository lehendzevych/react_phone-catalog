import './Loader.scss';

export const Loader = () => (
  <div className="Loader" data-cy="Loader">
    <div className="Loader__spinner" />

    <span className="Loader__text">Loading, please wait...</span>
  </div>
);
