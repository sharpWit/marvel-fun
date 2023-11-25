"use client";

import { fetchSeriesData } from "@/app/api/marvel/getSeriesParams";
import { IMarvelResponse } from "@/types/response";
import { ISeriesInfo } from "@/types/series";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useSeries = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelSeries,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<ISeriesInfo>, Error>({
    queryKey: ["series", page],
    queryFn: () => fetchSeriesData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelSeries,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useSeries;
