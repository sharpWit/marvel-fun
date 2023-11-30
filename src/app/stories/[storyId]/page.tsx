import axios from "axios";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/Card";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { Badge } from "@/components/ui/Badge";
import { apiKeyParam, hashParam, tsParam } from "@/app/api/marvel/urlParams";
import { IMarvelResponse } from "@/types/response";
import { IStoriesInfo } from "@/types/stories";
import { modifyUrl } from "@/lib/utils";

interface Props {
  params: { storyId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/stories";

const getData = async (storyId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<IStoriesInfo>>(
      `${apiUrl}/${storyId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel story!");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const StoryPage: NextPage<Props> = async ({ params }) => {
  const storyObj = await getData(params.storyId);
  const story = storyObj.data.results;
  return story.length
    ? story.map((storyItem) => (
        <Card
          key={storyItem.id}
          className="flex flex-col md:flex-wrap md:flex-row"
        >
          <CardHeader className="flex-1 ">
            <CardTitle>{storyItem.title}</CardTitle>
            <CardDescription>{storyItem.description}</CardDescription>
            <CardFooter className="!mt-auto">
              {storyItem.characters.items.map((url) => (
                <ul key={url.resourceURI} className="p-1">
                  <Link href={url.resourceURI}>
                    <Badge>{url.type}</Badge>
                  </Link>
                </ul>
              ))}
            </CardFooter>
          </CardHeader>
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/images/erik-mclean-OQgpRHFJwbQ-unsplash.jpg"
                alt="Photo by Erik Mclean on Unsplash"
                fill
                priority
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </CardContent>
          <CardContent className="basis-full p-2">
            <div className="my-3">
              <h3 className="font-semibold m-2">Creators:</h3>
              {storyItem.creators.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              <CardFooter>
                <Link href={storyItem.series.collectionURI}>
                  {storyItem.series.items.map((item) => (
                    <CardFooter key={item.resourceURI}>
                      <Link href={modifyUrl(item.resourceURI)}>
                        {item.name}
                      </Link>
                    </CardFooter>
                  ))}
                </Link>
              </CardFooter>
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {storyItem.events.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {storyItem.comics.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no story";
};
export default StoryPage;
