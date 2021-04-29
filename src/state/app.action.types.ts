import { Image } from '../interfaces/Image';
import { StateOfSearch } from '../interfaces/enums';

export const SET_IMAGES = 'SET_IMAGES';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export const SET_CURRENT_STATE = 'SET_CURRENT_STATE';
export const SET_EXCLUDED_IMAGES = 'SET_EXCLUDED_IMAGES';
export const SET_IS_LOADING_IMAGES = 'SET_IS_LOADING_IMAGES';

export interface SetIsLoadingImages {
  type: typeof SET_IS_LOADING_IMAGES;
  isLoading: boolean;
}

export interface ClearImages {
  type: typeof CLEAR_IMAGES;
}

export interface SetImages {
  type: typeof SET_IMAGES;
  images: Image[][];
}

export interface SetSearch {
  type: typeof SET_SEARCH;
  search: string;
}

export interface SetOffset {
  type: typeof SET_OFFSET;
  offset: number;
}

export interface SetTotalCount {
  type: typeof SET_TOTAL_COUNT;
  totalCount: number;
}

export interface SetCurrentState {
  type: typeof SET_CURRENT_STATE;
  currentState: StateOfSearch;
}

export interface SetExcludedImg {
  type: typeof SET_EXCLUDED_IMAGES;
  excludedImg: string;
}

export type AppActionTypes =
  | SetImages
  | ClearImages
  | SetSearch
  | SetOffset
  | SetTotalCount
  | SetCurrentState
  | SetIsLoadingImages
  | SetExcludedImg;
