import MovieSwitchDisplay from "../MovieSwitchDisplay";

export default function Page() {
  return (
    <>
      <h2 className="px-2 font-bold text-lg mb-2 mt-4">Top Rated Movies</h2>
      <MovieSwitchDisplay movieListType="top_rated" />
    </>
  );
}
