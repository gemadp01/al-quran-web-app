import Profile from "./Profile";
import Verse from "./Verse";

function Hero() {
  return (
    <div className="relative text-light mb-2">
      <div className="absolute top-0 left-0 w-full h-72 bg-[url('/src/assets/HeroBackgroundImage.png')] bg-cover bg-no-repeat bg-center rounded-b-3xl shadow-lg"></div>
      <div className="relative z-10 px-6 pt-12 pb-8 flex flex-col gap-10">
        <Profile/>
        <Verse
          verse="“He said: ‘Therein you shall live, and therein you shall die, and from it you shall be brought out (i.e. resurrected).’”"
          surah="Al-A’raaf (7:25)"
        />
      </div>
    </div>
  );
}

export default Hero;
