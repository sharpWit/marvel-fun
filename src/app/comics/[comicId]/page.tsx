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
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Badge } from "@/components/ui/Badge";
import { apiKeyParam, hashParam, tsParam } from "@/app/api/marvel/urlParams";
import { IComicsInfo } from "@/types/comics";
import { IMarvelResponse } from "@/types/response";

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
          className="flex flex-col md:flex-wrap md:flex-row"
        >
          <CardHeader className="flex-1">
            <CardTitle>{comicItem.title}</CardTitle>
            <CardDescription>{comicItem.description}</CardDescription>
            <CardFooter className="!mt-auto flex-wrap">
              {comicItem.urls.map((url) => (
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
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              <CardFooter>
                <Link href={comicItem.series.resourceURI}>
                  {comicItem.series.name}
                </Link>
              </CardFooter>
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {comicItem.events.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Stories:</h3>
              {comicItem.stories.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no comic";
};
export default ComicPage;
