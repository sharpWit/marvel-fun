import { FC } from "react";
import Link from "next/link";
import Loading from "@/app/loading";

import { ICharactersInfo } from "@/types/characters";

interface Props {
  isLoading: boolean;
  data: ICharactersInfo[];
  onResultClick: () => void; // Add the onResultClick prop
}

const SearchResults: FC<Props> = ({ isLoading, data, onResultClick }) => {
  return (
    <div
      className="flex flex-col p-4
    w-full bg-neutral divide-y divide-border overflow-y-auto relative"
    >
      {isLoading && <Loading />}
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="text-neutral-content hover:text-foreground hover:bg-yellow-600 hover:rounded-md transition-all p-2 h-full"
          >
            <Link
              onClick={(e) => {
                onResultClick();
              }}
              href={`/characters/${item.id}`}
            >
              {item.name}
            </Link>
          </div>
        ))}
    </div>
  );
};
export default SearchResults;
