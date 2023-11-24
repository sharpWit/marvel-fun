"use client";

import { fetchComicsData } from "@/app/api/marvel/getComicsParams";
import { IComicsInfo } from "@/types/comics";
import { IMarvelResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const useComics = () => {
  const {
    data: marvelComics,
    isLoading,
    isError,
  } = useQuery<IMarvelResponse<IComicsInfo>, Error>({
    queryKey: ["comics"],
    queryFn: fetchComicsData,
  });
  return { marvelComics, isLoading, isError };
};
export default useComics;
