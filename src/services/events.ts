import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { getAllEvents } from "@/services/endpoints";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { IEventsInfo } from "@/types/events";

const { url: eventURL } = getAllEvents();

export const getEvents = async (
  params: number = 0
): Promise<IMarvelRes<IEventsInfo>> => {
  const offset = isNaN(params) || params === 0 ? 0 : (params - 1) * PAGE_SIZE;

  try {
    const res = await fetch(
      `${env.API_URL}${eventURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch events data list: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<IEventsInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};
