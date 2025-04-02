"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import type { Actor } from "@/interfaces/actors";
import { fetchActors } from "@/api/actors/actors.api";
import { Switch } from "@/components/ui/switch";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TMBDImage from "@/components/TMBDImage";

export default function ActorSwitchDisplay() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<Actor[]>([]);
  const [filteredActors, setFilteredActors] = useState<Actor[] | null | undefined>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    popularity: 0,
  });
  const [isListDisplayModeEnabled, setIsListDisplayModeEnabled] = useState(false);

  useEffect(() => {
    const loadActors = async () => {
      setLoading(true);
      const { data, error, message } = await fetchActors();

      if (data && data.results.length > 0) {
        setActors(data.results);
        setFilteredActors(data.results);
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false);
    };
    loadActors();
  }, []);

  useEffect(() => {
    const popularityFilteredActors = actors?.filter((actor) => {
      return actor.popularity >= filters.popularity;
    });
    setFilteredActors(popularityFilteredActors);
  }, [filters, actors]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {!loading && (
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg mb-6">
            <span className="text-gray-300">Cards mode</span>
            <Switch
              checked={isListDisplayModeEnabled}
              onCheckedChange={() => {
                setIsListDisplayModeEnabled(!isListDisplayModeEnabled);
              }}
              name="List display"
              className="data-[state=checked]:bg-blue-500"
            />
            <span className="text-gray-300">List mode</span>
          </div>
          <div className="grid grid-cols-[1fr_4fr] gap-6">
            <div
              className={`${
                isListDisplayModeEnabled
                  ? "p-4 w-[20vw]"
                  : "border border-gray-700 p-4 w-[20vw] rounded-lg bg-gray-800 shadow-lg"
              }`}
            >
              {!isListDisplayModeEnabled && (
                <div>
                  <p className="text-xl font-semibold mb-4 text-blue-400">Filters</p>
                  <Accordion type="single" collapsible className="bg-gray-800 rounded-lg">
                    <AccordionItem value="popularity" className="border-gray-700">
                      <AccordionTrigger className="text-gray-300 hover:text-white">Minimum Popularity?</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col p-4">
                          <Slider
                            defaultValue={[0]}
                            max={100}
                            step={1}
                            className="p-2"
                            onValueCommit={(value) => {
                              setFilters((f) => {
                                return { ...f, popularity: value[0] };
                              });
                            }}
                          />
                          <span className="mx-auto text-lg text-blue-400 font-semibold">
                            {filters.popularity}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>

            <div>
              {isListDisplayModeEnabled ? (
                <div className="px-4 w-full">
                  <DataTable columns={columns} data={actors} />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                  {filteredActors &&
                    filteredActors.length > 0 &&
                    filteredActors?.map((actor) => {
                      return (
                        <Card key={actor.id} className="w-full bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
                          <Link href={`/actors/${actor.id}`}>
                            <CardContent className="flex aspect-square items-center justify-center p-0 group">
                              <div className="rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <TMBDImage
                                  src={actor.profile_path}
                                  alt={actor.name}
                                />
                              </div>
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
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
    </>
  );
}
