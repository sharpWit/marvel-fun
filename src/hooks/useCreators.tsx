"use client";

import { fetchCreatorsData } from "@/app/api/marvel/getCreatorsParams";
import { ICreatorsInfo } from "@/types/creators";
import { IMarvelResponse } from "@/types/response";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useCreator = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelCreators,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<ICreatorsInfo>, Error>({
    queryKey: ["creators", page],
    queryFn: () => fetchCreatorsData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelCreators,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useCreator;
