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
import { IMarvelResponse } from "@/types/response";
import { IEventsInfo } from "@/types/events";
import { modifyUrl } from "@/lib/utils";

interface Props {
  params: { eventId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/events";

const getData = async (eventId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<IEventsInfo>>(
      `${apiUrl}/${eventId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel event!");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const EventPage: NextPage<Props> = async ({ params }) => {
  const eventObj = await getData(params.eventId);
  const event = eventObj.data.results;
  return event.length
    ? event.map((eventItem) => (
        <Card
          key={eventItem.id}
          className="flex flex-col md:flex-wrap md:flex-row"
        >
          <CardHeader className="flex-1 ">
            <CardTitle>{eventItem.title}</CardTitle>
            <CardDescription>{eventItem.description}</CardDescription>
            <CardFooter className="!mt-auto">
              {eventItem.urls.map((url) => (
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
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              <CardFooter>
                <Link href={eventItem.series.collectionURI}>
                  {eventItem.series.items.map((item) => (
                    <CardFooter key={item.resourceURI}>
                      <Link href={modifyUrl(item.resourceURI)}>
                        {item.name}
                      </Link>
                    </CardFooter>
                  ))}
                </Link>
              </CardFooter>
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {eventItem.comics.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Stories:</h3>
              {eventItem.stories.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no event";
};
export default EventPage;
