interface ICreatorUrl {
  type: string;
  url: string;
}

interface ICreatorItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface ICreatorsInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: ICreatorUrl[];
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICreatorItem[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICreatorItem[];
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICreatorItem[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICreatorItem[];
  };
}
