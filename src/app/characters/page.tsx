import dynamic from "next/dynamic";

const CharactesrPage = () => {
  const CharactersCard = dynamic(
    () => import("@/components/character-card/CharactersCard"),
    {
      ssr: false,
    }
  );
  return <CharactersCard />;
};
export default CharactesrPage;
