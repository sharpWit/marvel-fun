import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/app/api/marvel/urlParams";
import { IMarvelResponse } from "@/types/response";
import { ICharactersInfo } from "@/types/characters";
import { modifyUrl } from "@/lib/utils";

interface Props {
  params: { characterId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/characters";

const getData = async (characterId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<ICharactersInfo>>(
      `${apiUrl}/${characterId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel character!");
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
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                alt={char.name}
                fill
                priority
                className="rounded-md object-contain"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </AspectRatio>
          </CardContent>
          <CardContent className="basis-full p-2">
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {char.comics.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              {char.series.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {char.events.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Stories:</h3>
              {char.stories.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no character";
};
export default CharacterPage;
