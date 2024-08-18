export interface DataConfig {
  [key: string]: any;
}
export interface RequestConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: DataConfig;
}

export const getAllChars = (): RequestConfig => ({
  url: "characters",
  method: "GET",
});
export const getCharecterByID = (id: number): RequestConfig => ({
  url: `characters/${id}`,
  method: "GET",
});
export const getAllComics = (): RequestConfig => ({
  url: "comics",
  method: "GET",
});
export const getComicByID = (id: number): RequestConfig => ({
  url: `comics/${id}`,
  method: "GET",
});
export const getAllCreators = (): RequestConfig => ({
  url: "creators",
  method: "GET",
});
export const getCreatorByID = (id: number): RequestConfig => ({
  url: `creators/${id}`,
  method: "GET",
});
export const getAllEvents = (): RequestConfig => ({
  url: "events",
  method: "GET",
});
export const getAllSeries = (): RequestConfig => ({
  url: "series",
  method: "GET",
});
