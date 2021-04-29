import {
  CLEAR_IMAGES,
  ClearImages,
  SET_CURRENT_STATE,
  SET_EXCLUDED_IMAGES,
  SET_IMAGES,
  SET_IS_LOADING_IMAGES,
  SET_OFFSET,
  SET_SEARCH,
  SET_TOTAL_COUNT,
  SetCurrentState,
  SetExcludedImg,
  SetImages,
  SetIsLoadingImages,
  SetOffset,
  SetSearch,
  SetTotalCount
} from './app.action.types';
import { Image } from '../interfaces/Image';
import { Meta } from '../interfaces/DTO';
import { Dispatch } from 'redux';
import to from '../helpers/to';
import { GiphyService } from '../services/giphy';
import { AppState } from './app.reducers';
import { StateOfSearch } from '../interfaces/enums';
import { ImageResponse } from '../interfaces/ImageResponse';
import { toast } from 'react-toastify';

export function setImages(images: Image[][]): SetImages {
  return {
    type: SET_IMAGES,
    images
  };
}

export function clearImages(): ClearImages {
  return {
    type: CLEAR_IMAGES
  };
}

export function setSearch(search: string): SetSearch {
  return {
    type: SET_SEARCH,
    search
  };
}

export function setOffset(offset: number): SetOffset {
  return {
    type: SET_OFFSET,
    offset
  };
}

export function setTotalCount(totalCount: number): SetTotalCount {
  return {
    type: SET_TOTAL_COUNT,
    totalCount
  };
}

export function setCurrentState(currentState: StateOfSearch): SetCurrentState {
  return {
    type: SET_CURRENT_STATE,
    currentState
  };
}

export function setExcludedImg(excludedImg: string): SetExcludedImg {
  return {
    type: SET_EXCLUDED_IMAGES,
    excludedImg
  };
}

export function setIsLoadingImages(isLoading: boolean): SetIsLoadingImages {
  return {
    type: SET_IS_LOADING_IMAGES,
    isLoading
  };
}

export const fetchImages = (stateOfSearch: StateOfSearch) => {
  return async (
    dispatch: Dispatch<any>,
    getState: () => { appState: AppState }
  ) => {
    const {
      appState: { isLoadingImages, currentState }
    } = getState();

    if (isLoadingImages) {
      return;
    }

    dispatch(setIsLoadingImages(true));

    if (currentState !== stateOfSearch) {
      dispatch(resetState(stateOfSearch));
    }

    const {
      appState: { offset, excludedImg, search }
    } = getState();

    const [err, imgResponse]: [Meta | null, ImageResponse] = await to(
      stateOfSearch === StateOfSearch.TRENDING
        ? GiphyService.getTrending(offset, excludedImg)
        : GiphyService.getFromSearch(offset, search, excludedImg)
    );

    if (err) {
      dispatch(setIsLoadingImages(false));
      return toast(err.msg, { type: 'error' });
    }

    dispatch(setImages(imgResponse.data));
    dispatch(setTotalCount(imgResponse.totalCount));
    dispatch(setIsLoadingImages(false));
    dispatch(setOffset(offset + 12));
  };
};

export const resetState = (stateOfSearch: StateOfSearch) => {
  return (dispatch: Dispatch) => {
    if (stateOfSearch !== StateOfSearch.SEARCHING) {
      dispatch(setSearch(''));
    }
    dispatch(setCurrentState(stateOfSearch));
    dispatch(clearImages());
    dispatch(setOffset(0));
    dispatch(setTotalCount(0));
  };
};
