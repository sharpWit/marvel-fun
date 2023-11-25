interface IEventUrl {
  type: string;
  url: string;
}

interface IEventItem {
  resourceURI: string;
  name: string;
  type?: string; // Add the type property if applicable
  role?: string; // Add the role property if applicable
}

export interface IEventsInfo {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: IEventUrl[];
  modified: Date;
  start: Date;
  end: Date;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
  };
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
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
