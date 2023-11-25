import dynamic from "next/dynamic";

const CreatorsPage = () => {
  const CreatorsCard = dynamic(
    () => import("@/components/creator-card/CreatorsCard"),
    {
      ssr: false,
    }
  );
  return <CreatorsCard />;
};
export default CreatorsPage;
