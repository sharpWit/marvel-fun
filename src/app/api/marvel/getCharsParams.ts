import axios from "axios";
import { ICharactersInfo } from "@/types/characters";
import { IMarvelResponse } from "@/types/response";
import { apiKeyParam, hashParam, tsParam } from "./urlParams";

const PAGE_SIZE = 20;
const apiUrl = "https://gateway.marvel.com/v1/public/characters";

export const fetchCharsData = async (page = 0, search?: string) => {
  const offset = page * PAGE_SIZE; // Calculate the offset based on the page number and page size
  const limit = PAGE_SIZE; // Set the number of items per page

  let url = `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${limit}`;

  // If a search term is provided, append it to the URL
  if (search) {
    url += `&nameStartsWith=${encodeURIComponent(search)}`;
  }

  try {
    const res = await axios.get<IMarvelResponse<ICharactersInfo>>(url);

    if (res.status !== 200) {
      throw new Error("Error fetching Marvel characters");
    }

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
