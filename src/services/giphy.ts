import to from '../helpers/to';
import axios from 'axios';
import { ImageResponse } from '../interfaces/ImageResponse';
import { Data, DataImageRes, GiffleResponse } from '../interfaces/DTO';
import { Image } from '../interfaces/Image';

export class GiphyService {
  private static API_KEY = 'lCCqruBTb22sHP1F1t4CwFBjgFVZ81s1';

  public static async getTrending(
    offset: number,
    excludedImg: string[]
  ): Promise<ImageResponse> {
    let err, response: { data: GiffleResponse };

    [err, response] = await to(
      axios.get('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: GiphyService.API_KEY,
          limit: 12,
          rating: 'G',
          offset
        }
      })
    );

    if (err) {
      throw err.response.data?.meta;
    }

    const images = GiphyService.createImageArray(response.data.data);

    return {
      data: GiphyService.formatImages(
        images.filter((img: Image) => excludedImg.indexOf(img.id) === -1)
      ),
      offset: response.data.pagination.offset,
      totalCount: response.data.pagination.total_count
    };
  }

  public static async getFromSearch(
    offset: number,
    search: string,
    excludedImg: string[]
  ): Promise<ImageResponse> {
    let err, response: { data: GiffleResponse };

    [err, response] = await to(
      axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: GiphyService.API_KEY,
          limit: 12,
          lang: 'en',
          rating: 'G',
          q: search,
          offset
        }
      })
    );

    if (err) {
      throw err.response.data?.meta;
    }

    const images = GiphyService.createImageArray(response.data.data);

    return {
      data: GiphyService.formatImages(
        images.filter((img: Image) => excludedImg.indexOf(img.id) === -1)
      ),
      offset: response.data.pagination.offset,
      totalCount: response.data.pagination.total_count
    };
  }

  private static createImageArray(images: Data[]) {
    return images.map((img) => {
      const key = GiphyService.getClosest(img.images);

      return {
        id: img.id,
        height: img.images[key].height,
        size: img.images[key].size,
        url: img.images[key].url,
        width: img.images[key].width,
        type: img.type,
        title: img.title
      };
    });
  }

  private static getClosest(obj: { any: DataImageRes }): string {
    const widthArr: DataImageRes[] = [];

    Object.keys(obj)
      .filter((key) => !key.includes('still') && obj[key].url)
      .forEach((key) => {
        if (!obj[key].width || (!obj[key].size && !obj[key].mp4_size)) {
          return;
        }

        const existWidth = widthArr.findIndex(
          (wd) => wd.width === Number(obj[key].width)
        );

        if (existWidth > -1) {
          if (widthArr[existWidth].size > Number(obj[key].width)) {
            widthArr[existWidth] = {
              width: Number(obj[key].width),
              size: Number(obj[key].size || obj[key].mp4_size),
              key
            };
          }
        } else {
          widthArr.push({
            width: Number(obj[key].width),
            size: Number(obj[key].size || obj[key].mp4_size),
            key
          });
        }
      });

    const closest = GiphyService.findClosest(widthArr);

    return closest.curr.key;
  }

  private static findClosest(
    array: DataImageRes[]
  ): { width: number; index: number; curr: DataImageRes } {
    const divideBy =
      window.innerWidth > 768 ? 4 : window.innerWidth > 425 ? 2 : 1;
    const windowSize =
      window.innerWidth / divideBy - (window.innerWidth / divideBy) * 0.1;

    return array.reduce(
      (prev, curr, index) => {
        const currentWidth = Math.abs(curr.width - windowSize);
        const previousWidth = Math.abs(prev.width - windowSize);

        return currentWidth < previousWidth
          ? {
              curr: curr,
              width: curr.width,
              index
            }
          : prev;
      },
      { width: 0 } as { curr: DataImageRes; width: number; index: number }
    );
  }

  public static formatImages(images: Image[]): Image[][] {
    return images.reduce(
      (resultArray: Image[][], item: Image, index: number) => {
        const chunkIndex: number = Math.floor(index / 3);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      },
      []
    );
  }
}
