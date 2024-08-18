import { cache } from "react";
import { NextPage } from "next";
import { PAGE_SIZE } from "@/lib/constants";
import { getAllComics } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import ComicsCard from "@/components/comic-card/ComicsCard";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const { url: charURL, method, data } = getAllComics();

const getComics = cache(async (params?: any) => {
  const offset = params ?? 0 * PAGE_SIZE;
  const res = await AxiosAdapter(
    {
      url: `${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
      method,
      data,
    },
    undefined,
    false
  );
  return res;
});

interface Props {
  searchParams: any;
}

const ComicsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const comics = await getComics(Number(page));

  return <ComicsCard marvelComics={comics} />;
};
export default ComicsPage;
