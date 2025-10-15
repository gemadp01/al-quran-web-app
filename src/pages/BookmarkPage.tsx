import { useContext } from "react";
import { Link } from "react-router-dom";
import { BookmarkContext } from "../contexts/BookmarkContext";
import Number from "../components/Number";
import Navigation from "../components/Navigation";

function BookmarkPage() {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header dengan background seperti DetailSurah */}
      <div className="bg-[url('/src/assets/AyatBackgroundImage.png')] relative bg-cover bg-no-repeat py-8 px-6 text-light rounded-b-3xl">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bookmark Ayat</h1>
            <p className="text-light/80 text-sm">
              {bookmarks.length} ayat tersimpan
            </p>
          </div>
        </div>
      </div>

      {/* Content dengan styling seperti DetailSurah */}
      <div className="py-8 px-5 flex flex-col gap-5">
        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-xl font-semibold text-text mb-2">Belum ada bookmark</h2>
            <p className="text-text-secondary mb-6">
              Mulai bookmark ayat favorit Anda untuk akses cepat
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors"
            >
              Jelajahi Surah
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookmarks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-surface border border-border p-5 rounded-xl text-text text-left flex flex-col gap-4 relative hover:shadow-lg transition-all duration-200"
                >
                  {/* Header dengan surah info */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Number nomor={bookmark.ayatNumber} />
                      <div>
                        <p className="font-bold text-lg text-text">{bookmark.surahNameLatin}</p>
                        <p className="text-text-secondary text-sm">{bookmark.surahName}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/surah/${bookmark.surahId}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm"
                      >
                        Baca Surah
                      </Link>
                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  
                  {/* Ayat text */}
                  <blockquote className="text-text text-lg leading-relaxed italic border-l-4 border-primary pl-4">
                    "{bookmark.ayatText}"
                  </blockquote>
                  
                  {/* Footer dengan tanggal */}
                  <div className="flex justify-between items-center text-sm text-text-secondary">
                    <span>Disimpan {formatDate(bookmark.createdAt)}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
}

export default BookmarkPage;
