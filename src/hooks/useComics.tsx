"use client";

import { fetchComicsData } from "@/app/api/marvel/getComicsParams";
import { IComicsInfo } from "@/types/comics";
import { IMarvelResponse } from "@/types/response";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useComics = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelComics,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<IComicsInfo>, Error>({
    queryKey: ["comics", page],
    queryFn: () => fetchComicsData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelComics,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useComics;
