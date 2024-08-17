import { cache } from "react";
import { NextPage } from "next";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { ICharactersInfo } from "@/types/characters";
import { getAllChars } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import CharactersCard from "@/components/character-card/CharactersCard";

const { url: charURL, method, data } = getAllChars();

const getCharacters = cache(
  async (params?: number): Promise<IMarvelRes<ICharactersInfo>> => {
    // const startTime = performance.now();

    const offset = params ?? 0 * PAGE_SIZE; // Calculate the offset based on the page number and page size
    const res: IMarvelRes<ICharactersInfo> = await AxiosAdapter(
      {
        url: `${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
        method,
        data,
      },
      undefined,
      false
    );
    // const endTime = performance.now();
    // console.log("Data fetched in", endTime - startTime, "ms");
    // console.log("RES: ", res);

    return res;
  }
);

interface Props {
  searchParams: any;
}

const CharactesrPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const characters = await getCharacters(Number(page));

  // console.log("getAllChars: ", { url: charURL, method, data });
  // console.log("page-main: ", page);
  // console.log("characters: ", characters);

  return <CharactersCard marvelCharacters={characters} />;
};
export default CharactesrPage;
