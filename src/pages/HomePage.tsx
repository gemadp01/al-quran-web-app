import { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SurahContainer from "../components/Surah/SurahContainer";
import Navigation from "../components/Navigation";
import { BookmarkContext } from "../contexts/BookmarkContext";

function HomePage() {
  const { lastRead } = useContext(BookmarkContext);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Hero />
      
      {/* Last Read Quick Access */}
      {lastRead && (
        <div className="px-6 mb-6">
          <div className="bg-surface border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-1">Terakhir Dibaca</h3>
                <p className="text-text-secondary text-sm mb-2">
                  {lastRead.surahNameLatin} - Ayat {lastRead.ayatNumber}
                </p>
                <p className="text-subtle text-xs line-clamp-2">
                  "{lastRead.ayatText}"
                </p>
              </div>
              <Link
                to={`/surah/${lastRead.surahId}?ayat=${lastRead.ayatNumber}`}
                className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
              >
                Lanjutkan
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <SurahContainer />
      <Navigation />
    </div>
  );
}

export default HomePage;
