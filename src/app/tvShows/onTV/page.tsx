import TVShowSwitchDisplay from "../TVShowSwitchDisplay";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center my-4">
        On the Air TV Shows
      </h2>
      <TVShowSwitchDisplay tvShowListType="on_the_air" />
    </>
  );
}
