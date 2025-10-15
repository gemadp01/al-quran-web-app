import type { Ayat } from "../../types/surah";
import AyatCard from "./AyatCard";

type AyatListProps = {
  ayat: Ayat[];
  surahNamaLatin: string;
  surahId?: number;
  surahName?: string;
};

function AyatList({ ayat, surahNamaLatin, surahId, surahName }: AyatListProps) {
  return (
    <div className="flex flex-col gap-4">
      {ayat.map((item) => (
        <AyatCard 
          key={item.nomorAyat} 
          ayat={item} 
          surahNamaLatin={surahNamaLatin}
          surahId={surahId}
          surahName={surahName}
        />
      ))}
    </div>
  );
}

export default AyatList;
