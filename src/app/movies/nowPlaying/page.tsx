import MovieSwitchDisplay from "../MovieSwitchDisplay";

export default function Page() {
  return (
    <>
      <h2 className="px-2 font-bold text-lg mb-2 mt-4">Now Playing Movies</h2>
      <MovieSwitchDisplay movieListType="now_playing" />
    </>
  );
}
