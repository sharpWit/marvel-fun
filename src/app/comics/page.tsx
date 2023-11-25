import dynamic from "next/dynamic";

const page = () => {
  const ComicsCard = dynamic(
    () => import("@/components/comic-card/ComicsCard"),
    {
      ssr: false,
    }
  );
  return <ComicsCard />;
};
export default page;
