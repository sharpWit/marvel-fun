interface ISeriesUrl {
  type: string;
  url: string;
}

interface ISeriesItem {
  resourceURI: string;
  name: string;
  type?: string; // Add the type property if applicable
  role?: string; // Add the role property if applicable
}

export interface ISeriesInfo {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: ISeriesUrl[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItem[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItem[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItem[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItem[];
  };
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItem[];
  };
  next: {
    resourceURI: string;
    name: string;
  };
  previous: {
    resourceURI: string;
    name: string;
  };
}
