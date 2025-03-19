"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Actor } from "@/interfaces/actors";
import { fetchActors } from "@/api/actors/actors.api";
import { Switch } from "@/components/ui/switch";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TMBDImage from "@/components/TMBDImage";

export default function ActorSwitchDisplay() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<Actor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isListDisplayModeEnabled, setIsListDisplayModeEnabled] =
    useState(false);

  // effect for fetching data when component initially renders
  useEffect(() => {
    const loadActors = async () => {
      setLoading(true); // Ensure loading starts

      const { data, error, message } = await fetchActors(); // Await the async function

      if (data && data.results.length > 0) {
        setActors(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false); // End loading
    };
    loadActors();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex flex-col">
          <div className="flex items-center px-2 h-12 font-semibold border w-[20vw]">
            <span>Cards mode</span>
            <Switch
              checked={isListDisplayModeEnabled}
              onCheckedChange={() => {
                setIsListDisplayModeEnabled(!isListDisplayModeEnabled);
              }}
              name="List display"
              className="mx-2"
            />
            <span>List mode</span>
          </div>
          <div className="grid grid-cols-[1fr_4fr]">
            <div
              className={`${
                isListDisplayModeEnabled
                  ? "p-2 w-[20vw]"
                  : "border p-2 w-[20vw]"
              }`}
            >
            </div>

            <div>
              {isListDisplayModeEnabled ? (
                <div className="mt-[-6.6rem] px-4 w-[80vw] max-w-250 font-semibold">
                  <DataTable columns={columns} data={actors} />
                </div>
              ) : (
                <div className="flex px-2 flex-wrap mx-8 gap-8">
                  {actors &&
                    actors.length > 0 &&
                    actors?.map((actor) => {
                      return (
                        <Card key={actor.id} className="w-44">
                          <Link href={`/actors/${actor.id}`}>
                            <CardContent className="flex aspect-square items-center justify-center p-0 ">
                              <TMBDImage
                                src={actor.profile_path}
                                alt={actor.name}
                              />
                            </CardContent>
                          </Link>
                        </Card>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
