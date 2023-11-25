"use client";

import { fetchStoriesData } from "@/app/api/marvel/getStoriesParams";
import { IMarvelResponse } from "@/types/response";
import { ISeriesInfo } from "@/types/series";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useStories = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelStories,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<ISeriesInfo>, Error>({
    queryKey: ["stories", page],
    queryFn: () => fetchStoriesData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelStories,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useStories;
