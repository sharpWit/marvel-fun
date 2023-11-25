import axios from "axios";
import { IMarvelResponse } from "@/types/response";
import { apiKeyParam, hashParam, tsParam } from "./urlParams";
import { IEventsInfo } from "@/types/events";

const PAGE_SIZE = 20;
const apiUrl = "https://gateway.marvel.com/v1/public/events";

export const fetchEventsData = async (page = 0) => {
  const offset = page * PAGE_SIZE; // Calculate the offset based on the page number and page size
  const limit = PAGE_SIZE; // Set the number of items per page

  const url = `${apiUrl}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${limit}`;

  try {
    const res = await axios.get<IMarvelResponse<IEventsInfo>>(url);

    if (res.status !== 200) {
      throw new Error("Error fetching Marvel Events");
    }

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
