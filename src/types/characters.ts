export interface IMarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
  };
}
