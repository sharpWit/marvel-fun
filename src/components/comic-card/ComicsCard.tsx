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

import useComics from "@/hooks/useComics";
import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/buttons/Button";

const ComicsCard = () => {
  const { marvelComics, isLoading, isError } = useComics();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Error: {isError || "An error occurred"}</p>;
  }

  //   Extract the first 10 characters
  const firstTenComics = marvelComics?.data.results.slice(0, 20) || [];

  return (
    <>
      <h2 className="m-2 p-2 text-yellow-300 drop-shadow-lg text-xl md:text-2xl font-bold">
        Marvel Comics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {firstTenComics.map((comic) => (
          <Card key={comic.id} className="flex flex-col md:flex-row">
            <CardContent className="flex-1 p-4 w-full">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  fill
                  className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                />
              </AspectRatio>
            </CardContent>
            <CardHeader className="flex-1">
              <CardTitle>{comic.title}</CardTitle>
              <CardDescription className="overflow-hidden truncate w-56">
                {comic.description}
              </CardDescription>
              <Link href={`/comics/${comic.id}`} className="self-end !mt-auto">
                <Button className="mt-4">Detailes</Button>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};
export default ComicsCard;
