import { Link } from "react-router-dom";
import Number from "../Number";
import type { Surah } from "../../types/surah";

type SurahCardProps = {
  surah: Surah;
};

function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link to={`/surah/${surah.nomor}`} className="block">
      <div className="bg-surface hover:bg-surface-hover p-5 rounded-xl flex justify-between items-center gap-4 transition-all duration-200 hover:shadow-lg border border-border hover:border-primary/20 group">
        <div className="flex text-left gap-4 items-center">
          <Number nomor={surah.nomor} />
          <div className="text-text">
            <p className="font-bold text-lg group-hover:text-primary transition-colors">{surah.namaLatin}</p>
            <p className="text-text-secondary text-sm mt-1">{surah.arti}</p>
            <p className="text-subtle text-xs mt-1">
              {surah.tempatTurun} • {surah.jumlahAyat} Ayat
            </p>
          </div>
        </div>
        <p className="font-bold text-2xl text-primary group-hover:text-primary-hover transition-colors">{surah.nama}</p>
      </div>
    </Link>
  );
}

export default SurahCard;
