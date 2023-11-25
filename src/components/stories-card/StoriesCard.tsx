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

import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/buttons/Button";
import Pagination from "../ui/pagination/Pagination";
import useStories from "@/hooks/useStories";

const StoriesCard = () => {
  const {
    marvelStories,
    isError,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    page,
    setPage,
  } = useStories();

  const marvelStoriesObjs = marvelStories?.data.results;

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
        Marvel Stories
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {marvelStoriesObjs?.map((story) => (
          <Card key={story.id} className="flex flex-col md:flex-row">
            <CardContent className="flex-1 p-4 w-full">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src="/images/erik-mclean-LSPUdV6IWsY-unsplash.jpg"
                  alt="Photo by Erik Mclean on Unsplash"
                  fill
                  priority
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                />
              </AspectRatio>
            </CardContent>
            <CardHeader className="flex-1">
              <CardTitle>{story.title}</CardTitle>
              <CardDescription className="overflow-hidden truncate w-56">
                {story.description}
              </CardDescription>
              <Link href={`/stories/${story.id}`} className="self-end !mt-auto">
                <Button className="mt-4">Detailes</Button>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        isPlaceholderData={isPlaceholderData}
        data={marvelStories?.data}
      />
    </>
  );
};
export default StoriesCard;
