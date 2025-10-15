import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DetailSurah from "./DetailSurah";
import type { Surah } from "../../types/surah";
import Navigation from "../Navigation";
import { BookmarkContext } from "../../contexts/BookmarkContext";

function DetailSurahContainer() {
  const { surahId } = useParams<{ surahId: string }>();
  const [searchParams] = useSearchParams();
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentReciter, setCurrentReciter] = useState("01");
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setLastRead } = useContext(BookmarkContext);

  console.log(audioRef.current);
  // console.log(surah?.audioFull[currentReciter]); // audio url berdasarkan number dari currentReciter

  //! handlePlayFullSurah
  const handlePlayFullSurah = () => {
    if (!surah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(surah.audioFull[currentReciter]);
    audioRef.current.onended = () => {
      setAudioPlaying(false);
    };

    audioRef.current.play();
    setAudioPlaying(true);
  };

  //! changeReciter
  const changeReciter = (reciterId: string) => {
    setCurrentReciter(reciterId);
    // If audio is playing, restart with new reciter
    if (audioPlaying) {
      handlePauseAudio();

      // Timeout to ensure audio is properly stopped before starting new one
      setTimeout(() => {
        handlePlayFullSurah();
      }, 100);
    }
  };

  //! handlePauseAudio
  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setAudioPlaying(false);
  };

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://equran.id/api/v2/surat/${surahId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch surah data");
        }
        const data = await response.json();
        setSurah(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahId]);

  // Scroll to specific ayat when component loads
  useEffect(() => {
    if (surah && searchParams.get('ayat')) {
      const ayatNumber = parseInt(searchParams.get('ayat') || '1');
      setTimeout(() => {
        const element = document.getElementById(`ayat-${ayatNumber}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Add highlight effect
          element.classList.add('highlight-ayat');
          setTimeout(() => {
            element.classList.remove('highlight-ayat');
          }, 3000);
        }
      }, 500); // Delay to ensure content is rendered
    }
  }, [surah, searchParams]);

  // Track last read based on scroll position
  useEffect(() => {
    if (!surah) return;

    const handleScroll = () => {
      const ayatElements = document.querySelectorAll('[id^="ayat-"]');
      let visibleAyat = null;
      let maxVisibleArea = 0;

      ayatElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visible area of the element
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // If this element is more visible than the previous one
        if (visibleArea > maxVisibleArea && visibleArea > 100) {
          maxVisibleArea = visibleArea;
          visibleAyat = element;
        }
      });

      if (visibleAyat) {
        const ayatNumber = parseInt((visibleAyat as HTMLElement).id.replace('ayat-', ''));
        const ayat = surah.ayat.find(a => a.nomorAyat === ayatNumber);
        
        if (ayat) {
          setLastRead({
            surahId: surah.nomor,
            surahName: surah.nama,
            surahNameLatin: surah.namaLatin,
            ayatNumber: ayat.nomorAyat,
            ayatText: ayat.teksIndonesia,
          });
        }
      }
    };

    // Throttle scroll events
    let scrollTimeout: number;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [surah, setLastRead]);

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  if (loading) {
    return <div className="p-5 text-center">Memuat...</div>;
  }

  if (error || !surah) {
    return (
      <div className="p-5 text-center text-red-500">
        Error: {error || "Surah tidak ditemukan"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <DetailSurah
        surah={surah}
        currentReciter={currentReciter}
        changeReciter={changeReciter}
        onPlay={handlePlayFullSurah}
        onPause={handlePauseAudio}
        audioPlaying={audioPlaying}
      />
      <Navigation />
    </div>
  );
}

export default DetailSurahContainer;
