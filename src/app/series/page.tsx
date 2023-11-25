import dynamic from "next/dynamic";

const SeriesPage = () => {
  const SeriesCard = dynamic(
    () => import("@/components/series-card/SeriesCard"),
    {
      ssr: false,
    }
  );

  return <SeriesCard />;
};
export default SeriesPage;
