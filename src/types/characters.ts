interface ICharURLs {
  type: string;
  url: string;
}

interface IComicsItems {
  resourceURI: string;
  name: string;
}

interface IStoriesItems {
  resourceURI: string;
  name: string;
  type: string;
}

interface IEventsItems {
  resourceURI: string;
  name: string;
}

interface ISeriesItems {
  resourceURI: string;
  name: string;
}
export interface ICharactersInfo {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: ICharURLs[];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IComicsItems[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItems[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventsItems[];
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ISeriesItems[];
  };
}
