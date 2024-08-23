import "server-only";
import { NextPage } from "next";
import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IComicsInfo } from "@/types/comics";
import { IMarvelRes } from "@/types/response";
import { getAllComics } from "@/services/endpoints";
import ComicsCard from "@/components/comic-card/ComicsCard";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const { url: comicURL } = getAllComics();

const getComics = async (params: number): Promise<IMarvelRes<IComicsInfo>> => {
  const offset = isNaN(params) ? 0 : (params - 1) * PAGE_SIZE;

  try {
    const res = await fetch(
      `${env.API_URL}${comicURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch comics data list: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<IComicsInfo> = await res.json();
    // console.log("Comic Data: ", data);
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

const ComicsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const comics = await getComics(Number(page));

  return <ComicsCard marvelComics={comics.data} />;
};
export default ComicsPage;
