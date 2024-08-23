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
import env from "@/services/env";
import { modifyUrl } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { IEventsInfo } from "@/types/events";
import { Badge } from "@/components/ui/Badge";
import { getEventByID } from "@/services/endpoints";
import { Separator } from "@/components/ui/Separator";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

// Fetch event data
const getEvent = async (params: number): Promise<IMarvelRes<IEventsInfo>> => {
  const offset = (params ?? 0) * PAGE_SIZE;
  const { url: eventURL } = getEventByID(params);

  try {
    const res = await fetch(
      `${env.API_URL}${eventURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch event data: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<IEventsInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};

interface Props {
  params: { eventId: number };
}

const EventPage: NextPage<Props> = async ({ params }) => {
  const eventObj = await getEvent(params.eventId);
  // Handle case where event data is not returned
  if (!eventObj || !eventObj.data) {
    return <p>There is no event</p>;
  }

  const eventsData = eventObj.data.results;

  return eventsData && eventsData.length > 0
    ? eventsData.map((eventItem) => (
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
