import dynamic from "next/dynamic";

const CharactesrPage = () => {
  const CharacterCard = dynamic(
    () => import("@/components/character-card/CharacterCard"),
    {
      ssr: false,
    }
  );
  return (
    <div>
      <CharacterCard />
    </div>
  );
};
export default CharactesrPage;
