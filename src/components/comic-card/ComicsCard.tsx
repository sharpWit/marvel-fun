import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { IComicsInfo } from "@/types/comics";
import { IMarvelData } from "@/types/response";
import { AspectRatio } from "../ui/AspectRatio";
import Pagination from "@/components/pagination/Pagination";

interface Props {
  marvelComics: IMarvelData<IComicsInfo>;
}

const ComicsCard: React.FC<Props> = ({ marvelComics }) => {
  const comics = marvelComics.results;
  return (
    <>
      <h2 className="m-2 p-2 text-yellow-300 drop-shadow-lg text-xl md:text-2xl font-bold">
        Marvel Comics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {comics && comics.length > 0 ? (
          comics.map((comic) => (
            <Card key={comic.id} className="flex flex-col md:flex-row">
              <CardContent className="flex-1 p-4 w-full">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    fill
                    priority
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="rounded-md object-fill drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-500"
                  />
                </AspectRatio>
              </CardContent>
              <CardHeader className="flex-1">
                <CardTitle>{comic.title}</CardTitle>
                <CardDescription className="overflow-hidden truncate w-56">
                  {comic.description}
                </CardDescription>
                <Link
                  href={`/comics/${comic.id}`}
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
              There's no comic yet!
            </h2>
          </div>
        )}
      </div>
      <Pagination totalData={marvelComics.total ?? 0} />
    </>
  );
};
export default ComicsCard;
