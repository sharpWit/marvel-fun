import { marvelURL } from "@/app/api/marvel/marvel";
import axios from "axios";
import { NextPage } from "next";

interface Props {
  params: { characterId: number };
}

const getData = async (characterId: number) => {
  try {
    const res = await axios
      .get(`${marvelURL}/${characterId}`)
      .then((res) => console.log(res));
  } catch (error) {
    console.warn(error);
  }
};

const CharacterPage: NextPage<Props> = async ({ params }) => {
  const character = await getData(params.characterId);
  return <div>CharacterPage</div>;
};
export default CharacterPage;
