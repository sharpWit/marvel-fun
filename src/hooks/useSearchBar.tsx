"use client";

import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { fetchCharsData } from "@/app/api/marvel/getCharsParams";
import { ICharactersInfo } from "@/types/characters";
import { IMarvelResponse } from "@/types/response";

const useSearchbar = (searchTerm: string) => {
  const options: UseQueryOptions<IMarvelResponse<ICharactersInfo>, Error> = {
    queryKey: ["search", searchTerm],
    queryFn: () => fetchCharsData(0, searchTerm),
  };

  const {
    data,
    isLoading,
    error,
  }: UseQueryResult<IMarvelResponse<ICharactersInfo>, Error> = useQuery(
    options
  );
  return { data, isLoading, error };
};
export default useSearchbar;
