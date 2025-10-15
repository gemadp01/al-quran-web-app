import { useState, useEffect } from "react";
import SurahList from "./SurahList";
import type { Surah } from "../../types/surah";

function SurahContainer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchSurahs = async () => {
    try {
      const response = await fetch("https://equran.id/api/v2/surat");
      if (!response.ok) {
        throw new Error("Failed to fetch surahs");
      }
      const data = await response.json();
      setSurahs(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter((surah) => {
    const searchLower = search.toLowerCase().replace(/\s+-/, "-");
    return (
      surah.namaLatin.toLowerCase().includes(searchLower) ||
      surah.arti.toLowerCase().includes(searchLower) ||
      surah.nama.toLowerCase().includes(searchLower) ||
      surah.nomor.toString().includes(searchLower)
    );
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="px-6 pb-8">
      <input
        type="text"
        placeholder="Cari surah..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 mb-6 rounded-xl bg-surface text-text border border-border placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
      />
      <SurahList surahs={filteredSurahs} />
    </div>
  );
}

export default SurahContainer;
