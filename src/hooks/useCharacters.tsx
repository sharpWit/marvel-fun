"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  apiUrl,
  apiKeyParam,
  tsParam,
  hashParam,
} from "@/app/api/marvel/getCharsParams";
import { ICharactersInfo } from "@/types/characters";

interface IMarvelResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ICharactersInfo[];
  };
  etag: "string";
}

const fetchData = async () => {
  const res = await axios.get<IMarvelResponse>(
    `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}`
  );
  if (res.status !== 200) {
    throw new Error("Error fetching Marvel characters");
  }
  return res.data;
};

const useCharacters = () => {
  const {
    data: marvelChars,
    isLoading,
    isError,
  } = useQuery<IMarvelResponse, Error>({
    queryKey: ["characters"],
    queryFn: fetchData,
  });
  return { marvelChars, isLoading, isError };
};
export default useCharacters;
