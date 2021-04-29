import {
  AppActionTypes,
  CLEAR_IMAGES,
  SET_CURRENT_STATE,
  SET_EXCLUDED_IMAGES,
  SET_IMAGES,
  SET_IS_LOADING_IMAGES,
  SET_OFFSET,
  SET_SEARCH,
  SET_TOTAL_COUNT
} from './app.action.types';
import { Image } from '../interfaces/Image';
import { StateOfSearch } from '../interfaces/enums';
import { GiphyService } from '../services/giphy';

export interface AppState {
  images: Image[][];
  isLoadingImages: boolean;
  search: string;
  offset: number;
  totalCount: number;
  currentState: StateOfSearch;
  excludedImg: string[];
}

const initialState: AppState = {
  images: [],
  isLoadingImages: false,
  search: '',
  offset: 0,
  totalCount: 0,
  currentState: StateOfSearch.TRENDING,
  excludedImg: []
};

export function appReducer(state = initialState, action: AppActionTypes) {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.images]
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        images: []
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.offset
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount
      };
    case SET_CURRENT_STATE:
      return {
        ...state,
        currentState: action.currentState
      };
    case SET_EXCLUDED_IMAGES:
      const images = [...state.images]
        .flat()
        .filter((img) => img.id !== action.excludedImg);

      return {
        ...state,
        excludedImg: [...state.excludedImg, action.excludedImg],
        images: GiphyService.formatImages(images)
      };
    case SET_IS_LOADING_IMAGES:
      return {
        ...state,
        isLoadingImages: action.isLoading
      };
    default:
      return state;
  }
}
