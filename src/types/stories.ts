interface IStoriesUrl {
  type: string;
  url: string;
}

interface IStoriesItem {
  resourceURI: string;
  name: string;
  type?: string; // Add the type property if applicable
  role?: string; // Add the role property if applicable
}

export interface IStoriesInfo {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItem[];
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItem[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItem[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItem[];
  };
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoriesItem[];
  };
  originalissue: {
    resourceURI: string;
    name: string;
  };
  urls: IStoriesUrl[]; // Added this line to include IStoriesUrl type
}
