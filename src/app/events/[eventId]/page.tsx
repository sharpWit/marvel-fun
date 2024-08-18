import { cache } from "react";
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
import { modifyUrl } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { IEventsInfo } from "@/types/events";
import { Badge } from "@/components/ui/Badge";
import { getEventByID } from "@/services/endpoints";
import { Separator } from "@/components/ui/Separator";
import AxiosAdapter from "@/services/fetch-in-server";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const getEvent = cache(
  async (params: number): Promise<IMarvelRes<IEventsInfo>> => {
    const { url: charURL, method } = getEventByID(params);
    const offset = params ?? 0 * PAGE_SIZE; // Calculate the offset based on the page number and page size

    const res: IMarvelRes<IEventsInfo> = await AxiosAdapter(
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
  params: { eventId: number };
}

const EventPage: NextPage<Props> = async ({ params }) => {
  const eventObj = await getEvent(params.eventId);
  const event = eventObj.data.data.results;

  return event.length
    ? event.map((eventItem) => (
        <Card
          key={eventItem.id}
          className="flex flex-col lg:flex-wrap lg:flex-row"
        >
          <CardHeader className="flex-1 ">
            <CardTitle>{eventItem.title}</CardTitle>
            <CardDescription className="!mb-8">
              {eventItem.description}
            </CardDescription>
            <CardContent className="!mt-auto">
              {eventItem.urls.map((url, index) => (
                <Badge key={index} className="mr-1">
                  <Link href={url.url}>{url.type}</Link>
                </Badge>
              ))}
            </CardContent>
          </CardHeader>
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${eventItem.thumbnail.path}.${eventItem.thumbnail.extension}`}
                alt={eventItem.title}
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
              {eventItem.creators.items.map((item) => (
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
              {eventItem.characters.items.map((item) => (
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
              {eventItem.series.items.map((item) => (
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
              {eventItem.comics.items.map((item) => (
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
    : "There is no event";
};
export default EventPage;
