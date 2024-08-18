"use client";

import { useEffect, useRef, useState } from "react";
import Loading from "@/app/loading";
import useDebounce from "@/hooks/useDebounce";
import SearchResults from "./SearchResults";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Search } from "lucide-react";
import { Input } from "../form/Input";
import { Button } from "../ui/Button";
import { getAllChars } from "@/services/endpoints";
import { IMarvelRes } from "@/types/response";
import { ICharactersInfo } from "@/types/characters";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { PAGE_SIZE } from "@/lib/constants";
import env from "@/services/env";
import axios from "axios";

const { url: charURL } = getAllChars();

const getData = async (search: string) => {
  try {
    const url = `${
      env.API_URL
    }${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${0}&limit=${PAGE_SIZE}&nameStartsWith=${search}`;
    // console.log("Request URL: ", url); // Log the complete URL
    const res = await axios.get<IMarvelRes<ICharactersInfo>>(url);
    // console.log("RES-1: ", res);
    if (res.status !== 200) {
      throw new Error("Error");
    }
    // console.log("RES-2: ", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const SearchBar: React.FC = () => {
  const clickPoint = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsData, setResultsData] =
    useState<IMarvelRes<ICharactersInfo> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [modalRoot, setModalRoot] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      setError(null);

      getData(debouncedSearchTerm)
        .then((data) => {
          setResultsData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      setResultsData(null); // Clear results if the search term is empty
    }
  }, [debouncedSearchTerm]);

  const handleFocus = () => {
    if (clickPoint.current) {
      clickPoint.current.style.display = "none";
    }
  };

  const handleBlur = () => {
    if (clickPoint.current) {
      clickPoint.current.style.display = "block";
    }
  };

  const handleResultClick = () => {
    // Reset the search input after a result is clicked
    setSearch("");
    setModalRoot(!modalRoot);
  };

  // console.log("debouncedSearchTerm: ", debouncedSearchTerm);
  // console.log("DATA: ", resultsData);

  return (
    <Dialog open={modalRoot} onOpenChange={setModalRoot}>
      <div>
        <DialogTrigger asChild>
          <div ref={clickPoint}>
            <Button className="bg-transparent outline ml-2">
              <Search />
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="p-4">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Here..."
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <div className="max-h-96 h-full relative overflow-y-auto">
            {debouncedSearchTerm && // Only render results when search term is not empty
              (isLoading ? (
                <Loading />
              ) : resultsData &&
                resultsData.data.data.results && // Adjusted to access nested data
                resultsData.data.data.results.length > 0 ? (
                <SearchResults
                  isLoading={isLoading}
                  data={resultsData.data.data.results} // Adjusted to access nested data
                  onResultClick={handleResultClick}
                />
              ) : (
                <p>No results found</p>
              ))}
            {error && <div>Error fetching data: {error.message}</div>}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default SearchBar;
