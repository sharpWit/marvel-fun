import axios from "axios";
import { IMarvelResponse } from "@/types/response";
import { apiKeyParam, hashParam, tsParam } from "./urlParams";
import { ICreatorsInfo } from "@/types/creators";

const PAGE_SIZE = 20;
const apiUrl = "https://gateway.marvel.com/v1/public/creators";

export const fetchCreatorsData = async (page = 0) => {
  const offset = page * PAGE_SIZE; // Calculate the offset based on the page number and page size
  const limit = PAGE_SIZE; // Set the number of items per page

  const url = `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${limit}`;

  try {
    const res = await axios.get<IMarvelResponse<ICreatorsInfo>>(url);

    if (res.status !== 200) {
      throw new Error("Error fetching Marvel characters");
    }

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
