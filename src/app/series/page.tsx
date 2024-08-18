import { cache } from "react";
import { NextPage } from "next";
import { PAGE_SIZE } from "@/lib/constants";
import { ISeriesInfo } from "@/types/series";
import { IMarvelRes } from "@/types/response";
import { getAllChars } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import SeriesCard from "@/components/series-card/SeriesCard";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const { url: serieURL, method, data } = getAllChars();

const getSeries = cache(
  async (params?: number): Promise<IMarvelRes<ISeriesInfo>> => {
    const offset =
      (typeof params !== "number" || isNaN(params) ? 0 : params) * PAGE_SIZE;

    const res: IMarvelRes<ISeriesInfo> = await AxiosAdapter(
      {
        url: `${serieURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
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

const SeriesPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const series = await getSeries(Number(page));

  return <SeriesCard marvelSeries={series} />;
};
export default SeriesPage;
