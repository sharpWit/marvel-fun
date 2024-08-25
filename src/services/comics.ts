import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { getAllComics } from "@/services/endpoints";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { IComicsInfo } from "@/types/comics";

const { url: comicURL } = getAllComics();

export const getComics = async (
  params: number = 0
): Promise<IMarvelRes<IComicsInfo>> => {
  const offset = isNaN(params) || params === 0 ? 0 : (params - 1) * PAGE_SIZE;

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

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};
