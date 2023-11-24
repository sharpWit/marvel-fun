import { IMarvelResponse } from "@/types/response";
import axios from "axios";
import { apiKeyParam, hashParam, tsParam } from "./urlParams";
import { IComicsInfo } from "@/types/comics";

const apiUrl = "https://gateway.marvel.com/v1/public/comics";

export const fetchComicsData = async () => {
  const res = await axios.get<IMarvelResponse<IComicsInfo>>(
    `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}`
  );
  if (res.status !== 200) {
    throw new Error("Error fetching Marvel characters");
  }
  return res.data;
};
