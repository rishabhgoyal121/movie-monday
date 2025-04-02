import MovieSwitchDisplay from "./MovieSwitchDisplay";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Upcoming Movies
        </h2>
        <MovieSwitchDisplay movieListType="upcoming" />
      </div>
    </div>
  );
}
