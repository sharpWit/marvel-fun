"use client";

import { fetchCharsData } from "@/app/api/marvel/getCharsParams";
import { ICharactersInfo } from "@/types/characters";
import { IMarvelResponse } from "@/types/response";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

const useCharacters = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelChars,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<ICharactersInfo>, Error>({
    queryKey: ["characters", page],
    queryFn: () => fetchCharsData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelChars,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useCharacters;
