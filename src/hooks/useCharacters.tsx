"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { marvelURL } from "@/app/api/marvel/marvel";
import { IMarvelCharacter } from "@/types/characters";

interface IMarvelResponse {
  code: number;
  status: string;
  data: {
    total: number;
    results: IMarvelCharacter[];
  };
}

const useCharacters = () => {
  const {
    data: marvelChars,
    isLoading,
    isError,
  } = useQuery<IMarvelResponse, Error>({
    queryKey: ["characters"],
    queryFn: async () => {
      try {
        const res = await axios.get<IMarvelResponse>(marvelURL);
        if (res.status !== 200) {
          throw new Error("Error fetching Marvel characters");
        }
        const data = res.data;
        return data;
      } catch (error: any) {
        throw error.message;
      }
    },
  });
  return { marvelChars, isLoading, isError };
};
export default useCharacters;
