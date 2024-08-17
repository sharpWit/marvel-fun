export interface IMarvelRes<T> {
  data: {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: {
      offset: number;
      limit: number;
      total: number;
      count: number;
      results: T[];
    };
    etag: "string";
  };
  message: string;
  status: number;
}
