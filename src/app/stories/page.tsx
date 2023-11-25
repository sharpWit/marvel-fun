import dynamic from "next/dynamic";

const StoriesPage = () => {
  const StoriesCard = dynamic(
    () => import("@/components/stories-card/StoriesCard"),
    {
      ssr: false,
    }
  );
  return <StoriesCard />;
};
export default StoriesPage;
