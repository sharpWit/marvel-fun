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
import { IMarvelResponse } from "@/types/response";
import { ISeriesInfo } from "@/types/series";
import { modifyUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/Separator";

interface Props {
  params: { seriesId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/series";

const getData = async (seriesId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<ISeriesInfo>>(
      `${apiUrl}/${seriesId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel serie!");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const SeriePage: NextPage<Props> = async ({ params }) => {
  const serieObj = await getData(params.seriesId);
  const serie = serieObj.data.results;
  return serie.length
    ? serie.map((serieItem) => (
        <Card
          key={serieItem.id}
          className="flex flex-col lg:flex-wrap lg:flex-row"
        >
          <CardHeader className="flex-1 ">
            <CardTitle>{serieItem.title}</CardTitle>
            <CardDescription className="!mb-8">
              {serieItem.description}
            </CardDescription>
            <CardContent className="!mt-auto">
              {serieItem.urls.map((url, index) => (
                <Badge key={index} className="mr-1">
                  <Link href={url.url}>{url.type}</Link>
                </Badge>
              ))}
            </CardContent>
          </CardHeader>
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${serieItem.thumbnail.path}.${serieItem.thumbnail.extension}`}
                alt={serieItem.title}
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
              {serieItem.creators.items.map((item) => (
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
              {serieItem.characters.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {serieItem.comics.items.map((item) => (
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
              {serieItem.events.items.map((item) => (
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
    : "There is no serie";
};
export default SeriePage;
