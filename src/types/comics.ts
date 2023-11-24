interface ITextObject {
  type: string;
  language: string;
  text: string;
}

interface IUrl {
  type: string;
  url: string;
}

interface IVariant {
  resourceURI: string;
  name: string;
}

interface ICollection {
  resourceURI: string;
  name: string;
}

interface IIssue {
  resourceURI: string;
  name: string;
}

interface IDate {
  type: string;
  date: string;
}

interface IPrice {
  type: string;
  price: number;
}

interface IImage {
  path: string;
  extension: string;
}

interface ICreatorItem {
  resourceURI: string;
  name: string;
  role: string;
}

interface ICharacterItem {
  resourceURI: string;
  name: string;
  role: string;
}

interface IStoryItem {
  resourceURI: string;
  name: string;
  type: string;
}

interface IEventItem {
  resourceURI: string;
  name: string;
}

export interface IComicsInfo {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: ITextObject[];
  resourceURI: string;
  urls: IUrl[];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: IVariant[];
  collections: ICollection[];
  collectedIssues: IIssue[];
  dates: IDate[];
  prices: IPrice[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: IImage[];
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICreatorItem[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: ICharacterItem[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IStoryItem[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: IEventItem[];
  };
}
