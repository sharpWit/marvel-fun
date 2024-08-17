import ComicsCard from "@/components/comic-card/ComicsCard";
import { PAGE_SIZE } from "@/lib/constants";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import { getAllComics } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import { NextPage } from "next";

const { url: charURL, method, data } = getAllComics();
const getComics = async (params?: any) => {
  const offset = params ?? 0 * PAGE_SIZE; // Calculate the offset based on the page number and page size
  const res = await AxiosAdapter(
    {
      url: `${charURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
      method,
      data,
    },
    undefined,
    false
  );
  console.log("RES: ", res);
  return res;
};

interface Props {
  searchParams: any;
}

const ComicsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const comics = await getComics(Number(page));

  return <ComicsCard marvelComics={comics} />;
};
export default ComicsPage;
