import { NextPage } from "next";
import { ISeriesInfo } from "@/types/series";
import { IMarvelRes } from "@/types/response";
import CharactersCard from "@/components/character-card/CharactersCard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotFound from "../not-found";
import { getSeries } from "@/services/series";

interface Props {
  searchParams: {
    page?: string | string[] | undefined;
  };
}

const SeriesPage: NextPage<Props> = async ({ searchParams }) => {
  const queryClient = new QueryClient();
  // Handle `searchParams` safely, checking types
  const page = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;

  const pageNum = page ? parseInt(page, 10) : 1;

  // If pageNum isn't valid, render the NotFound component
  if (isNaN(pageNum) || pageNum < 1) {
    return <NotFound />;
  }

  await queryClient.prefetchQuery({
    queryKey: ["series"],
    queryFn: (): Promise<IMarvelRes<ISeriesInfo>> => getSeries(pageNum),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharactersCard />
    </HydrationBoundary>
  );
};

export default SeriesPage;
