import { Image } from './Image';

export interface ImageResponse {
  data: Image[][];
  offset: number;
  totalCount: number;
}
