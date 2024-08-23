import { NextPage } from "next";
import env from "@/services/env";
import { PAGE_SIZE } from "@/lib/constants";
import { IMarvelRes } from "@/types/response";
import { ICreatorsInfo } from "@/types/creators";
import { getAllCreators } from "@/services/endpoints";
import { apiKeyParam, hashParam, tsParam } from "@/lib/urlParams";
import CreatorsCard from "@/components/creator-card/CreatorsCard";

const { url: creatorURL } = getAllCreators();

const getCreatores = async (
  params: number = 0
): Promise<IMarvelRes<ICreatorsInfo>> => {
  const offset = isNaN(params) ? 0 : (params - 1) * PAGE_SIZE;

  try {
    const res = await fetch(
      `${env.API_URL}${creatorURL}?${apiKeyParam}&${tsParam}&${hashParam}&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch creators data list: ${res.status} ${res.statusText}`
      );
    }

    const data: IMarvelRes<ICreatorsInfo> = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
};

interface Props {
  searchParams: {
    page: string;
  };
}

const CreatorsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page } = searchParams ?? {};
  const creators = await getCreatores(Number(page));

  return <CreatorsCard marvelCreators={creators.data} />;
};
export default CreatorsPage;
