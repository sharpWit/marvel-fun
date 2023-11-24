"use client";

import { fetchCharsData } from "@/app/api/marvel/getCharsParams";
import { ICharactersInfo } from "@/types/characters";
import { IMarvelResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const useCharacters = () => {
  const {
    data: marvelChars,
    isLoading,
    isError,
  } = useQuery<IMarvelResponse<ICharactersInfo>, Error>({
    queryKey: ["characters"],
    queryFn: fetchCharsData,
  });
  return { marvelChars, isLoading, isError };
};
export default useCharacters;
