import { cache } from "react";
import { NextPage } from "next";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { ICreatorsInfo } from "@/types/creators";
import { getAllCreators } from "@/services/endpoints";
import AxiosAdapter from "@/services/fetch-in-server";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import CreatorsCard from "@/components/creator-card/CreatorsCard";

const { url: creatorURL, method, data } = getAllCreators();

const getCreators = cache(
  async (params?: number): Promise<IMarvelRes<ICreatorsInfo>> => {
    const offset =
      (typeof params !== "number" || isNaN(params) ? 0 : params) * PAGE_SIZE;

    const res: IMarvelRes<ICreatorsInfo> = await AxiosAdapter(
      {
        url: `${creatorURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`,
        method,
        data,
      },
      undefined,
      false
    );
    // console.log("RES: ", res);

    return res;
  }
);

interface Props {
  searchParams: any;
}

const CreatorsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const creators = await getCreators(Number(page));

  return <CreatorsCard marvelCreators={creators} />;
};
export default CreatorsPage;
