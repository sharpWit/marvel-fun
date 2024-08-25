import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { getAllChars } from "@/services/endpoints";
import { ICharactersInfo } from "@/types/characters";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const { url: charURL } = getAllChars();

export const getCharacters = async (
  params: number = 0
): Promise<IMarvelRes<ICharactersInfo>> => {
  const offset = isNaN(params) || params === 0 ? 0 : (params - 1) * PAGE_SIZE;

  try {
    const res = await fetch(
      `${env.API_URL}${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch characters data list: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<ICharactersInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};
