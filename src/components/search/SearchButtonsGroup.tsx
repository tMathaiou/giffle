import { FC } from 'react';

type Props = {
  trending: () => void;
  clear: () => void;
  search: () => void;
};

const SearchButtonsGroup: FC<Props> = ({ clear, search, trending }) => {
  return (
    <div className="input-field second-wrap">
      <button
        type="button"
        className="btn  btn-outline-primary btn-elevate"
        onClick={trending}
      >
        Trending
      </button>
      <button
        type="button"
        className="btn  btn-outline-success btn-elevate"
        onClick={search}
      >
        Search
      </button>
      <button
        onClick={clear}
        type="button"
        className="btn  btn-outline-danger btn-elevate"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchButtonsGroup;
