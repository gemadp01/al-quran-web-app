import { createContext, useState, useEffect, useMemo } from "react";
import type { Bookmark, BookmarkContextType, LastRead } from "../types/bookmark";

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
  getBookmarkId: () => null,
  lastRead: null,
  setLastRead: () => {},
  clearLastRead: () => {},
});

interface BookmarkProviderProps {
  children: React.ReactNode;
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [lastRead, setLastReadState] = useState<LastRead | null>(null);

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

  // Load last read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("quran-last-read");
    if (stored) {
      try {
        const parsedLastRead = {
          ...JSON.parse(stored),
          readAt: new Date(JSON.parse(stored).readAt),
        };
        setLastReadState(parsedLastRead);
      } catch (error) {
        console.error("Error loading last read:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save last read to localStorage whenever lastRead changes
  useEffect(() => {
    if (lastRead) {
      localStorage.setItem("quran-last-read", JSON.stringify(lastRead));
    }
  }, [lastRead]);

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

  const setLastRead = (lastReadData: Omit<LastRead, 'readAt'>) => {
    const newLastRead: LastRead = {
      ...lastReadData,
      readAt: new Date(),
    };
    setLastReadState(newLastRead);
  };

  const clearLastRead = () => {
    setLastReadState(null);
    localStorage.removeItem("quran-last-read");
  };

  const contextValue = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkId,
    lastRead,
    setLastRead,
    clearLastRead,
  }), [bookmarks, lastRead]);

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
}
