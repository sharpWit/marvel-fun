import { cache } from "react";
import { NextPage } from "next";
import { PAGE_SIZE } from "@/lib/constants";
import { IEventsInfo } from "@/types/events";
import { IMarvelRes } from "@/types/response";
import { getAllEvents } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import EventsCard from "@/components/event-card/EventsCard";

const { url: eventURL, method, data } = getAllEvents();

const getEvents = cache(
  async (params?: number): Promise<IMarvelRes<IEventsInfo>> => {
    const offset =
      (typeof params !== "number" || isNaN(params) ? 0 : params) * PAGE_SIZE;

    const res: IMarvelRes<IEventsInfo> = await AxiosAdapter(
      {
        url: `${eventURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
        method,
        data,
      },
      undefined,
      false
    );
    // console.log("RES: ", res);

    return res;
  }
);

interface Props {
  searchParams: any;
}

const EventsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const events = await getEvents(Number(page));

  return <EventsCard marvelEvents={events} />;
};
export default EventsPage;
