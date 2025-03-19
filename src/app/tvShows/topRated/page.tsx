import TVShowSwitchDisplay from "../TVShowSwitchDisplay";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center my-4">
        Top Rated TV Shows
      </h2>
      <TVShowSwitchDisplay tvShowListType="top_rated" />
    </>
  );
}
