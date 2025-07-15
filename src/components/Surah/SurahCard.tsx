import { Link } from "react-router-dom";
import type { Surah } from "../../types/surah";
import Number from "../Number";

type SurahCardProps = {
  surah: Surah;
};

function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link to={`/surah/${surah.nomor}`}>
      <div className="bg-dark p-4 rounded-lg flex justify-between gap-3">
        <div>
          <Number nomor={surah.nomor} />
          <div className="text-light">
            <p>{surah.namaLatin}</p>
            <p>{surah.arti}</p>
            <p>
              {surah.tempatTurun} • {surah.jumlahAyat} Ayat
            </p>
          </div>
        </div>
        <p>{surah.nama}</p>
      </div>
    </Link>
  );
}

export default SurahCard;
