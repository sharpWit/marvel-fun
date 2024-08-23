"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import env from "@/services/env";
import Loading from "@/app/loading";
import { Input } from "../form/Input";
import { Button } from "../ui/Button";
import SearchResults from "./SearchResults";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import useDebounce from "@/hooks/useDebounce";
import { getAllChars } from "@/services/endpoints";
import { ICharactersInfo } from "@/types/characters";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";

const { url: charURL } = getAllChars();

const getData = async (
  search: string
): Promise<IMarvelRes<ICharactersInfo>> => {
  try {
    const url = `${
      env.API_URL
    }${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${0}&limit=${PAGE_SIZE}&nameStartsWith=${search}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch characters data list: ${res.status} ${res.statusText}`
      );
    }
    const data: IMarvelRes<ICharactersInfo> = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
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
      setResultsData(null);
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
                resultsData.data.results && // Adjusted to access nested data
                resultsData.data.results.length > 0 ? (
                <SearchResults
                  isLoading={isLoading}
                  data={resultsData.data.results} // Adjusted to access nested data
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
