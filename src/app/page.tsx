import Banner from "@/components/Banner";
import Leaderboard from "@/components/Leaderboard";
import TabbedCarousel from "@/components/TabbedCarousel";
import { Input } from "@/components/ui/Input";

export default function Home() {
  return (
    <>
      <Input />
      <Banner
        title="Welcome."
        subtitle="Millions of movies, TV shows and people to discover. Explore now."
        bannerImageUrl="https://i.ibb.co/Gv3qbkfg/pexels-ron-lach-9807277.jpg"
      />
      <TabbedCarousel title="Trending" tabNames={["Today", "This Week"]} />
      <TabbedCarousel
        title="Latest Trailers"
        tabNames={["Popular", "Streaming", "On TV", "For Rent", "In Theaters"]}
      />
      <TabbedCarousel
        title="What's Popular"
        tabNames={["Streaming", "On TV", "For Rent", "In Theaters"]}
      />
      <TabbedCarousel title="Free To Watch" tabNames={["Movies", "TV"]} />
      <Leaderboard/>
    </>
  );
}
