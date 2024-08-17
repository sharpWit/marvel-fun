import axios from "axios";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Badge } from "@/components/ui/Badge";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { IComicsInfo } from "@/types/comics";
import { IMarvelResponse } from "@/types/response";
import { modifyUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/Separator";

interface Props {
  params: { comicId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/comics";

const getData = async (comicId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<IComicsInfo>>(
      `${apiUrl}/${comicId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel comic!");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const ComicPage: NextPage<Props> = async ({ params }) => {
  const comicObj = await getData(params.comicId);
  const comic = comicObj.data.results;
  return comic.length
    ? comic.map((comicItem) => (
        <Card
          key={comicItem.id}
          className="flex flex-col lg:flex-wrap lg:flex-row"
        >
          <CardHeader className="flex-1">
            <CardTitle>{comicItem.title}</CardTitle>
            <CardDescription className="!mb-8">
              {comicItem.description}
            </CardDescription>
            <CardContent className="!mt-auto">
              {comicItem.urls.map((url, index) => (
                <Badge key={index} className="mr-1">
                  <Link href={url.url}>{url.type}</Link>
                </Badge>
              ))}
            </CardContent>
          </CardHeader>
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${comicItem.thumbnail.path}.${comicItem.thumbnail.extension}`}
                alt={comicItem.title}
                fill
                priority
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </CardContent>

          <CardContent className="basis-full p-2">
            <div className="my-3">
              <h3 className="font-semibold m-2">Creators:</h3>
              {comicItem.creators.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Characters:</h3>
              {comicItem.characters.items.map((item) => (
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
              {comicItem.events.items.map((item) => (
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
    : "There is no comic";
};
export default ComicPage;
