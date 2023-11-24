// export interface IMarvelCharacter {
//   id: number;
//   name: string;
//   description: string;
//   thumbnail: {
//     path: string;
//     extension: string;
//   };
//   comics: {
//     items: Array<{
//       resourceURI: string;
//       name: string;
//     }>;
//   };
// }

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

export interface ICharURLs {
  type: string;
  url: string;
}

export interface IComicsItems {
  resourceURI: string;
  name: string;
}

export interface IStoriesItems {
  resourceURI: string;
  name: string;
  type: string;
}

export interface IEventsItems {
  resourceURI: string;
  name: string;
}

export interface ISeriesItems {
  resourceURI: string;
  name: string;
}
