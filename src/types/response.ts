export interface IMarvelRes<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: IMarvelData<T>;
  etag: "string";
}

export interface IMarvelData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}
