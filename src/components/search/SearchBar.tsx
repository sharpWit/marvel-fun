"use client";

import { useRef, useState } from "react";
import Loading from "@/app/loading";
import useDebounce from "@/hooks/useDebounce";
import SearchResults from "./SearchResults";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Search } from "lucide-react";
import { Input } from "../form/Input";
import { Button } from "../ui/Button";

const SearchBar: React.FC = () => {
  const clickPoint = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  // const {
  //   data: resultsData,
  //   isLoading,
  //   error,
  // } = useSearchbar(debouncedSearchTerm);
  const [modalRoot, setModalRoot] = useState(false);

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
    <Dialog open={modalRoot} onOpenChange={handleResultClick}>
      <div>
        <DialogTrigger asChild>
          <div ref={clickPoint}>
            <Button className=" bg-transparent outline ml-2">
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
                resultsData.data.results &&
                resultsData.data.results.length > 0 ? (
                <SearchResults
                  isLoading={isLoading}
                  data={resultsData.data.results}
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
