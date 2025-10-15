import { createContext, useState, useEffect, useMemo } from "react";
import type { Bookmark, BookmarkContextType } from "../types/bookmark";

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
  getBookmarkId: () => null,
});

interface BookmarkProviderProps {
  children: React.ReactNode;
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("quran-bookmarks");
    if (stored) {
      try {
        const parsedBookmarks = JSON.parse(stored).map((bookmark: any) => ({
          ...bookmark,
          createdAt: new Date(bookmark.createdAt),
        }));
        setBookmarks(parsedBookmarks);
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmarkData: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmarkData,
      id: `${bookmarkData.surahId}-${bookmarkData.ayatNumber}-${Date.now()}`,
      createdAt: new Date(),
    };
    
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const isBookmarked = (surahId: number, ayatNumber: number) => {
    return bookmarks.some(
      bookmark => bookmark.surahId === surahId && bookmark.ayatNumber === ayatNumber
    );
  };

  const getBookmarkId = (surahId: number, ayatNumber: number) => {
    const bookmark = bookmarks.find(
      bookmark => bookmark.surahId === surahId && bookmark.ayatNumber === ayatNumber
    );
    return bookmark ? bookmark.id : null;
  };

  const contextValue = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkId,
  }), [bookmarks]);

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
}
