import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { BookmarkContext } from "../contexts/BookmarkContext";

function Navigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { bookmarks, lastRead } = useContext(BookmarkContext);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border backdrop-blur-sm">
      <div className="flex justify-around items-center py-2 px-2 max-w-lg mx-auto">
        {/* Home Button */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-3 px-3 rounded-xl transition-all duration-200 ${
            isActive("/")
              ? "bg-primary text-white"
              : "text-text hover:bg-surface-hover"
          }`}
          aria-label="Home"
          title="Beranda"
        >
          <span className="text-xl mb-1">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </Link>

        {/* Last Read Button */}
        {lastRead && (
          <Link
            to={`/surah/${lastRead.surahId}?ayat=${lastRead.ayatNumber}`}
            className={`flex flex-col items-center justify-center py-3 px-3 rounded-xl transition-all duration-200 ${
              isActive(`/surah/${lastRead.surahId}`)
                ? "bg-primary text-white"
                : "text-text hover:bg-surface-hover"
            }`}
            aria-label="Continue reading"
            title={`Terakhir baca: ${lastRead.surahNameLatin} Ayat ${lastRead.ayatNumber}`}
          >
            <span className="text-xl mb-1">📖</span>
            <span className="text-xs font-medium">Terakhir</span>
          </Link>
        )}

        {/* Bookmark Button */}
        <Link
          to="/bookmark"
          className={`relative flex flex-col items-center justify-center py-3 px-3 rounded-xl transition-all duration-200 ${
            isActive("/bookmark")
              ? "bg-primary text-white"
              : "text-text hover:bg-surface-hover"
          }`}
          aria-label="Bookmark page"
          title="Bookmark Ayat"
        >
          <span className="text-xl mb-1">🔖</span>
          <span className="text-xs font-medium">Bookmark</span>
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {bookmarks.length}
            </span>
          )}
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center py-3 px-3 rounded-xl text-text hover:bg-surface-hover transition-all duration-200"
          aria-label="Toggle dark/light mode"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span className="text-xl mb-1">{theme === "dark" ? "🌙" : "☀️"}</span>
          <span className="text-xs font-medium">Theme</span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
