import { cache } from "react";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { modifyUrl } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { IMarvelRes } from "@/types/response";
import { ICreatorsInfo } from "@/types/creators";
import { Separator } from "@/components/ui/Separator";
import { getCreatorByID } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import { AspectRatio } from "@/components/ui/AspectRatio";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";

const getCreator = cache(
  async (params: number): Promise<IMarvelRes<ICreatorsInfo>> => {
    const { url: charURL, method } = getCreatorByID(params);
    const offset = params ?? 0 * PAGE_SIZE;

    const res: IMarvelRes<ICreatorsInfo> = await AxiosAdapter(
      {
        url: `${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
        method,
      },
      undefined,
      false
    );
    // console.log("RES: ", res);
    return res;
  }
);

interface Props {
  params: { creatorId: number };
}

const CreatorPage: NextPage<Props> = async ({ params }) => {
  const creatorObj = await getCreator(params.creatorId);
  const creator = creatorObj.data.data.results;

  return creator.length
    ? creator.map((creatorItem) => (
        <Card
          key={creatorItem.id}
          className="flex flex-col lg:flex-wrap lg:flex-row"
        >
          <CardHeader className="flex-1">
            <CardTitle>{creatorItem.fullName}</CardTitle>
            <CardDescription className="!mb-8">
              {`${creatorItem.firstName} ${creatorItem.middleName} ${creatorItem.lastName}`}
            </CardDescription>
            <CardContent className="!mt-auto">
              {creatorItem.urls.map((url, index) => (
                <Badge key={index} className="mr-1">
                  <Link href={url.url}>{url.type}</Link>
                </Badge>
              ))}
            </CardContent>
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
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Series:</h3>
              {creatorItem.series.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
            <Separator />
            <div className="my-3">
              <h3 className="font-semibold m-2">Events:</h3>
              {creatorItem.events.items.map((item) => (
                <ul key={item.resourceURI}>
                  <li className="p-1 mb-2">
                    <Link href={modifyUrl(item.resourceURI)}>{item.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
          </CardContent>
        </Card>
      ))
    : "There is no creator";
};
export default CreatorPage;
