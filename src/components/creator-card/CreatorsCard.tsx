"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { IMarvelRes } from "@/types/response";
import { AspectRatio } from "../ui/AspectRatio";
import { ICreatorsInfo } from "@/types/creators";
import Pagination from "../ui/pagination/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface Props {
  marvelCreators: IMarvelRes<ICreatorsInfo>;
}

const CreatorsCard: React.FC<Props> = ({ marvelCreators }) => {
  return (
    <>
      <h2 className="m-2 p-2 text-yellow-300 drop-shadow-lg text-xl md:text-2xl font-bold">
        Marvel Creators
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {marvelCreators && marvelCreators.data.data.count > 0 ? (
          marvelCreators.data.data.results?.map((creator) => (
            <Card key={creator.id} className="flex flex-col md:flex-row">
              <CardContent className="flex-1 p-4 w-full">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                    alt={creator.fullName}
                    fill
                    priority
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                  />
                </AspectRatio>
              </CardContent>
              <CardHeader className="flex-1">
                <CardTitle>{creator.fullName}</CardTitle>
                <Link
                  href={`/creators/${creator.id}`}
                  className="self-end !mt-auto"
                >
                  <Button className="mt-4">Detailes</Button>
                </Link>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="flex items-center w-full p-3">
            <h2 className="bg-yellow-300 p-2 rounded-md">
              There's no creator yet!
            </h2>
          </div>
        )}
      </div>
      <Pagination totalData={marvelCreators.data?.data?.total ?? 0} />
    </>
  );
};
export default CreatorsCard;
