import './Search.css';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchButtonsGroup from './SearchButtonsGroup';
import {
  clearImages,
  fetchImages,
  setOffset,
  setSearch
} from '../../state/app.actions';
import { StateOfSearch } from '../../interfaces/enums';
import { AppState } from '../../state/app.reducers';

type Props = {};

const Search: FC<Props> = () => {
  const dispatch = useDispatch();
  const [search, setInputSearch] = useState('');
  const currentState = useSelector(
    (state: { appState: AppState }) => state.appState.currentState
  );

  const searchState = useSelector(
    (state: { appState: AppState }) => state.appState.search
  );

  const submitForm = useCallback(
    (e?) => {
      if (e) {
        e.preventDefault();
      }
      if (search === searchState) {
        return;
      }
      dispatch(setSearch(search));
      dispatch(clearImages());
      dispatch(setOffset(0));

      if (!search && currentState === StateOfSearch.SEARCHING) {
        return dispatch(fetchImages(StateOfSearch.TRENDING));
      }
      dispatch(fetchImages(StateOfSearch.SEARCHING));
    },
    [currentState, dispatch, search, searchState]
  );

  const clear = useCallback(() => {
    setInputSearch('');
    dispatch(setSearch(''));
    if (currentState === StateOfSearch.SEARCHING) {
      return dispatch(fetchImages(StateOfSearch.TRENDING));
    }
  }, [currentState, dispatch]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="search-form">
      <form onSubmit={submitForm}>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <input
              type="text"
              className="form-control"
              onChange={onInputChange}
              placeholder="Search..."
              value={search}
            />
          </div>
          <SearchButtonsGroup
            clear={clear}
            search={submitForm}
            trending={clear}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
