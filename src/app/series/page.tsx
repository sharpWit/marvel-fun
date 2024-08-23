import "server-only";
import { NextPage } from "next";
import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { ISeriesInfo } from "@/types/series";
import { IMarvelRes } from "@/types/response";
import { getAllChars } from "@/services/endpoints";
import SeriesCard from "@/components/series-card/SeriesCard";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const { url: serieURL } = getAllChars();

const getSeries = async (
  params: number = 0
): Promise<IMarvelRes<ISeriesInfo>> => {
  const offset = isNaN(params) ? 0 : (params - 1) * PAGE_SIZE;

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
    // console.log("Serie Data: ", data);
    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};

interface Props {
  searchParams: {
    page: string;
  };
}

const SeriesPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const series = await getSeries(Number(page));

  return <SeriesCard marvelSeries={series.data} />;
};
export default SeriesPage;
