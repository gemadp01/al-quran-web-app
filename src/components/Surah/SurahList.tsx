import type { Surah } from "../../types/surah";
import SurahCard from "./SurahCard";

type SurahListProps = {
  surahs: Surah[];
};

function SurahList({ surahs }: SurahListProps) {
  if (surahs.length === 0) {
    return <p>No surahs found</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {surahs.map((surah) => (
        <SurahCard key={surah.nomor} surah={surah} />
      ))}
    </div>
  );
}

export default SurahList;
