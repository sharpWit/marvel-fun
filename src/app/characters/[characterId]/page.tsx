import axios from "axios";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/Card";

import {
  apiUrl,
  apiKeyParam,
  tsParam,
  hashParam,
} from "@/app/api/marvel/getCharsParams";
import { ICharactersInfo } from "@/types/characters";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Badge } from "@/components/ui/Badge";

interface IMarvelResponse {
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
    results: ICharactersInfo[];
  };
  etag: "string";
}
interface Props {
  params: { characterId: number };
}

const getData = async (characterId: number) => {
  try {
    const res = await axios.get<IMarvelResponse>(
      `${apiUrl}/${characterId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel character");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const CharacterPage: NextPage<Props> = async ({ params }) => {
  const characterObj = await getData(params.characterId);
  const character = characterObj.data.results;

  return character.length
    ? character.map((char) => (
        <Card key={char.id} className="flex flex-col md:flex-wrap md:flex-row">
          <CardHeader className="flex-1 ">
            <CardTitle>{char.name}</CardTitle>
            <CardDescription>{char.description}</CardDescription>
            <CardFooter className="!mt-auto">
              {char.urls.map((url) => (
                <ul key={url.url} className="p-1">
                  <Link href={url.url}>
                    <Badge>{url.type}</Badge>
                  </Link>
                </ul>
              ))}
            </CardFooter>
          </CardHeader>
          <CardContent className="flex-1 w-full p-1">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
                fill
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </CardContent>
          <CardContent className="basis-full p-2">
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {char.comics.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              {char.series.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {char.events.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Stories:</h3>
              {char.stories.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no character";
};
export default CharacterPage;
