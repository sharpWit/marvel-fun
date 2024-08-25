import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { getAllSeries } from "@/services/endpoints";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { ISeriesInfo } from "@/types/series";

const { url: serieURL } = getAllSeries();

export const getSeries = async (
  params: number = 0
): Promise<IMarvelRes<ISeriesInfo>> => {
  const offset = isNaN(params) || params === 0 ? 0 : (params - 1) * PAGE_SIZE;

  try {
    const res = await fetch(
      `${env.API_URL}${serieURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch series data list: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<ISeriesInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};
