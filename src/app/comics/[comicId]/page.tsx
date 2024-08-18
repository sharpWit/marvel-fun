import { cache } from "react";
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
import { PAGE_SIZE } from "@/lib/constants";
import { IComicsInfo } from "@/types/comics";
import { IMarvelRes } from "@/types/response";
import { Badge } from "@/components/ui/Badge";
import { getComicByID } from "@/services/endpoints";
import { Separator } from "@/components/ui/Separator";
import AxiosAdapter from "@/services/fetch-in-server";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const getComic = cache(
  async (params: number): Promise<IMarvelRes<IComicsInfo>> => {
    const { url: comicURL, method } = getComicByID(params);
    const offset = params ?? 0 * PAGE_SIZE;

    const res = await AxiosAdapter(
      {
        url: `${comicURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
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
  params: { comicId: number };
}
const ComicPage: NextPage<Props> = async ({ params }) => {
  const comicObj = await getComic(params.comicId);
  const comic = comicObj.data.data.results;

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
