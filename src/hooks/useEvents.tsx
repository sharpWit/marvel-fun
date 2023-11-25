"use client";

import { fetchEventsData } from "@/app/api/marvel/getEventsParams";
import { IEventsInfo } from "@/types/events";
import { IMarvelResponse } from "@/types/response";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useEvents = () => {
  const [page, setPage] = useState(0);

  const {
    data: marvelEvents,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery<IMarvelResponse<IEventsInfo>, Error>({
    queryKey: ["events", page],
    queryFn: () => fetchEventsData(page),
    placeholderData: keepPreviousData,
  });
  return {
    marvelEvents,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  };
};
export default useEvents;
