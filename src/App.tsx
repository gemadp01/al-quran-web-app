import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailSurahPage from "./pages/DetailSurahPage";
import BookmarkPage from "./pages/BookmarkPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookmarkProvider } from "./contexts/BookmarkContext";

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surah/:surahId" element={<DetailSurahPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
        </Routes>
      </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;
