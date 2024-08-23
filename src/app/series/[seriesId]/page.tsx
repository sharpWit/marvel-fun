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
import env from "@/services/env";
import { modifyUrl } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";
import { ISeriesInfo } from "@/types/series";
import { IMarvelRes } from "@/types/response";
import { Badge } from "@/components/ui/Badge";
import { getSerieByID } from "@/services/endpoints";
import { Separator } from "@/components/ui/Separator";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

// Fetch serie data
const getSerie = async (params: number): Promise<IMarvelRes<ISeriesInfo>> => {
  const offset = (params ?? 0) * PAGE_SIZE;
  const { url: serieURL } = getSerieByID(params);

  try {
    const res = await fetch(
      `${env.API_URL}${serieURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch serie data: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<ISeriesInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};

interface Props {
  params: { seriesId: number };
}

const SeriePage: NextPage<Props> = async ({ params }) => {
  const serieObj = await getSerie(params.seriesId);
  // Handle case where serie data is not returned
  if (!serieObj || !serieObj.data) {
    return <p>There is no serie</p>;
  }

  const serieData = serieObj.data.results;

  return serieData && serieData.length > 0
    ? serieData.map((serieItem) => (
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
