export interface GiffleResponse {
  data: Data[];
  meta: Meta;
  pagination: Pagination;
}

export interface Data {
  id: string;
  images: { any: DataImageRes };
  type: string;
  title: string;
}

export interface Meta {
  msg: string;
  response_id: any;
  status: number;
}

export interface Pagination {
  offset: number;
  count: number;
  total_count: number;
}

export interface DataImageRes {
  size: number;
  width: number;
  key: string;
  mp4_size?: string;
  url?: string;
}
