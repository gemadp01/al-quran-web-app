import Hero from "../components/Hero";
import SurahContainer from "../components/Surah/SurahContainer";
import Navigation from "../components/Navigation";

function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Hero />
      <SurahContainer />
      <Navigation />
    </div>
  );
}

export default HomePage;
