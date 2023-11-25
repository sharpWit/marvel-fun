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
import { ICreatorsInfo } from "@/types/creators";

interface Props {
  params: { creatorId: number };
}

const apiUrl = "https://gateway.marvel.com/v1/public/creators";

const getData = async (creatorId: number) => {
  try {
    const res = await axios.get<IMarvelResponse<ICreatorsInfo>>(
      `${apiUrl}/${creatorId}?${apiKeyParam}&${tsParam}&${hashParam}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching Marvel creator!");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

const CreatorPage: NextPage<Props> = async ({ params }) => {
  const creatorObj = await getData(params.creatorId);
  const creator = creatorObj.data.results;
  return creator.length
    ? creator.map((creatorItem) => (
        <Card
          key={creatorItem.id}
          className="flex flex-col md:flex-wrap md:flex-row"
        >
          <CardHeader className="flex-1 ">
            <CardTitle>{creatorItem.fullName}</CardTitle>
            <CardDescription>
              {creatorItem.firstName}
              {creatorItem.middleName}
              {creatorItem.lastName}
            </CardDescription>
            <CardFooter className="!mt-auto">
              {creatorItem.urls.map((url) => (
                <ul key={url.url} className="p-1">
                  <Link href={url.url}>
                    <Badge>{url.type}</Badge>
                  </Link>
                </ul>
              ))}
            </CardFooter>
          </CardHeader>
          <CardContent className="flex-1 w-full p-2">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={`${creatorItem.thumbnail.path}.${creatorItem.thumbnail.extension}`}
                alt={creatorItem.fullName}
                fill
                priority
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </CardContent>
          <CardContent className="basis-full p-2">
            <div className="my-3">
              <h3 className="font-semibold m-2">Comics:</h3>
              {creatorItem.comics.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              <CardFooter>
                <Link href={creatorItem.series.collectionURI}>
                  {creatorItem.series.items.map((item) => (
                    <CardFooter key={item.resourceURI}>
                      <Link href={item.resourceURI}>{item.name}</Link>
                    </CardFooter>
                  ))}
                </Link>
              </CardFooter>
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {creatorItem.events.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
            <div className="my-3">
              <h3 className="font-semibold m-2">Stories:</h3>
              {creatorItem.stories.items.map((item) => (
                <CardFooter key={item.resourceURI}>
                  <Link href={item.resourceURI}>{item.name}</Link>
                </CardFooter>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no creator";
};
export default CreatorPage;
