import ActorSwitchDisplay from "./ActorSwitchDisplay";

export default function ActorsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Actors</h1>
      <ActorSwitchDisplay />
    </div>
  );
}
