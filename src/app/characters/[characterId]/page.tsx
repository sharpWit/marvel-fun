import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { modifyUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { IMarvelRes } from "@/types/response";
import { ICharactersInfo } from "@/types/characters";
import { Separator } from "@/components/ui/Separator";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { getCharecterByID } from "@/services/endpoints";
import { cache } from "react";
import AxiosAdapter from "@/services/fetch-in-server";
import { PAGE_SIZE } from "@/lib/constants";

const getCharacter = cache(
  async (params: number): Promise<IMarvelRes<ICharactersInfo>> => {
    const { url: charURL, method } = getCharecterByID(params);
    const offset = params ?? 0 * PAGE_SIZE; // Calculate the offset based on the page number and page size

    const res: IMarvelRes<ICharactersInfo> = await AxiosAdapter(
      {
        url: `${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
        method,
      },
      undefined,
      false
    );
    // console.log("RES: ", res);
    return res;
  }
);

interface Props {
  params: { characterId: number };
}

const CharacterPage: NextPage<Props> = async ({ params }) => {
  const characterObj = await getCharacter(params.characterId);
  const character = characterObj.data.data.results;

  // console.log("characterObj: ", characterObj);
  // console.log("character: ", character);

  return character.length
    ? character.map((char) => (
        <Card key={char.id} className="flex flex-col lg:flex-wrap lg:flex-row">
          <CardHeader className="flex-1 ">
            <CardTitle>{char.name}</CardTitle>
            <CardDescription className="!mb-8">
              {char.description}
            </CardDescription>
            <CardContent className="!mt-auto">
              {char.urls.map((url, index) => (
                <Badge key={index} className="mr-1">
                  <Link href={url.url}>{url.type}</Link>
                </Badge>
              ))}
            </CardContent>
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
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              {char.series.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {char.events.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no character";
};
export default CharacterPage;
