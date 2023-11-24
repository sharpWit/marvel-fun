import { IMarvelResponse } from "@/types/response";
import axios from "axios";
import { apiKeyParam, hashParam, tsParam } from "./urlParams";
import { ICharactersInfo } from "@/types/characters";

const apiUrl = "https://gateway.marvel.com/v1/public/characters";

export const fetchCharsData = async () => {
  const res = await axios.get<IMarvelResponse<ICharactersInfo>>(
    `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}`
  );
  if (res.status !== 200) {
    throw new Error("Error fetching Marvel characters");
  }
  return res.data;
};
