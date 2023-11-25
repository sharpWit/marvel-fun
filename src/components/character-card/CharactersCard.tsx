"use client";

import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards/Card";

import useCharacters from "@/hooks/useCharacters";
import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/buttons/Button";
import Pagination from "../ui/pagination/Pagination";

const CharactersCard = () => {
  const {
    marvelChars,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  } = useCharacters();

  const marvelCharacters = marvelChars?.data.results;

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }
  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="m-2 p-2 text-yellow-300 drop-shadow-lg text-xl md:text-2xl font-bold">
        Marvel Characters
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {marvelCharacters?.map((character) => (
          <Card key={character.id} className="flex flex-col md:flex-row">
            <CardContent className="flex-1 p-4 w-full">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  fill
                  priority
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                />
              </AspectRatio>
            </CardContent>
            <CardHeader className="flex-1">
              <CardTitle>{character.name}</CardTitle>
              <CardDescription className="overflow-hidden truncate w-56">
                {character.description}
              </CardDescription>
              <Link
                href={`/characters/${character.id}`}
                className="self-end !mt-auto"
              >
                <Button className="mt-4">Details</Button>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        isPlaceholderData={isPlaceholderData}
        data={marvelChars?.data}
      />
    </>
  );
};
export default CharactersCard;
