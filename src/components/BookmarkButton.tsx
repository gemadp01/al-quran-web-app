import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";

interface BookmarkButtonProps {
  surahId: number;
  surahName: string;
  surahNameLatin: string;
  ayatNumber: number;
  ayatText: string;
  className?: string;
}

function BookmarkButton({
  surahId,
  surahName,
  surahNameLatin,
  ayatNumber,
  ayatText,
  className = "",
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark, getBookmarkId } = useContext(BookmarkContext);
  
  const bookmarked = isBookmarked(surahId, ayatNumber);
  const bookmarkId = getBookmarkId(surahId, ayatNumber);

  const handleToggleBookmark = () => {
    if (bookmarked && bookmarkId) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark({
        surahId,
        surahName,
        surahNameLatin,
        ayatNumber,
        ayatText,
      });
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
        bookmarked
          ? "text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
          : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
      } ${className}`}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        className="w-5 h-5"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}

export default BookmarkButton;
