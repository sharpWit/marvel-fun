import dynamic from "next/dynamic";

const ComicsPage = () => {
  const ComicsCard = dynamic(
    () => import("@/components/comic-card/ComicsCard"),
    {
      ssr: false,
    }
  );
  return <ComicsCard />;
};
export default ComicsPage;
