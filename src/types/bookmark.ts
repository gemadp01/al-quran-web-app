export interface Bookmark {
  id: string;
  surahId: number;
  surahName: string;
  surahNameLatin: string;
  ayatNumber: number;
  ayatText: string;
  createdAt: Date;
}

export interface LastRead {
  surahId: number;
  surahName: string;
  surahNameLatin: string;
  ayatNumber: number;
  ayatText: string;
  readAt: Date;
}

export interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surahId: number, ayatNumber: number) => boolean;
  getBookmarkId: (surahId: number, ayatNumber: number) => string | null;
  lastRead: LastRead | null;
  setLastRead: (lastRead: Omit<LastRead, 'readAt'>) => void;
  clearLastRead: () => void;
}
