import type { Ayat } from "../../types/surah";
import Number from "../Number";
import BookmarkButton from "../BookmarkButton";

type AyatCardProps = {
  ayat: Ayat;
  surahNamaLatin: string;
  surahId?: number;
  surahName?: string;
};

function AyatCard({ ayat, surahNamaLatin, surahId, surahName }: AyatCardProps) {
  const handleShare = async () => {
    const shareText = `"${ayat.teksArab}"
${ayat.teksLatin}
${ayat.teksIndonesia}
(QS. ${surahNamaLatin}:${ayat.nomorAyat})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QS. ${surahNamaLatin}:${ayat.nomorAyat}`,
          text: shareText,
        });
      } catch (e) {
        // user cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Ayat berhasil disalin ke clipboard!");
      } catch (e) {
        alert("Gagal menyalin ayat");
      }
    }
  };
  return (
    <div 
      id={`ayat-${ayat.nomorAyat}`}
      className="bg-surface border border-border p-5 rounded-xl text-text text-left flex flex-col gap-4 relative hover:shadow-lg transition-all duration-200"
    >
      <div className="flex justify-between gap-4">
        <Number nomor={ayat.nomorAyat} />
        <p className="font-bold text-2xl text-right w-full text-text">{ayat.teksArab}</p>
      </div>
      <p className="font-sm text-text-secondary">{ayat.teksLatin}</p>
      <p className="font-sm text-subtle">{ayat.teksIndonesia}</p>
      
      <div className="flex justify-end gap-2">
        {surahId && surahName && (
          <BookmarkButton
            surahId={surahId}
            surahName={surahName}
            surahNameLatin={surahNamaLatin}
            ayatNumber={ayat.nomorAyat}
            ayatText={ayat.teksIndonesia}
            className="hover:scale-110"
          />
        )}
        <button
          onClick={handleShare}
          className="px-3 py-2 rounded-lg bg-primary text-white text-xs hover:bg-primary-hover transition shadow-lg"
          title="Bagikan ayat ini"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default AyatCard;
