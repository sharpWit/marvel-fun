"use client";

import useCharacters from "@/hooks/useCharacters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/cards/Card";
import Image from "next/image";
import { AspectRatio } from "../ui/AspectRatio";
import Link from "next/link";
import { Separator } from "../ui/Separator";
import Loading from "@/app/loading";

const CharacterCard = () => {
  const { marvelChars, isLoading, isError } = useCharacters();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error: {isError || "An error occurred"}</p>;
  }

  //   Extract the first 10 characters
  const firstTenChars = marvelChars?.data.results.slice(0, 10) || [];
  return (
    <>
      <h2 className="m-2 p-2 text-yellow-300 drop-shadow-lg text-xl md:text-2xl font-bold">
        Marvel Characters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {firstTenChars.map((character) => (
          <Card key={character.id}>
            <CardContent className="p-4 w-full">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  fill
                  className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                />
              </AspectRatio>
            </CardContent>
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
              <p className="text-sm font-semibold">Description:</p>
              <CardDescription>
                {character.description || "No description available"}
              </CardDescription>
            </CardHeader>

            <Separator />

            <h4 className="ml-4 mt-2 text-sm font-semibold">Comics:</h4>
            <CardFooter>
              <ul>
                {character.comics.items.map((comic) => (
                  <li key={comic.resourceURI}>
                    <Link
                      href={comic.resourceURI}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" leading-8"
                    >
                      {comic.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default CharacterCard;
