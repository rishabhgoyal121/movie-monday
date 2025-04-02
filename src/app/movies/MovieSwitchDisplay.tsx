"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import type { Movie } from "@/interfaces/movies";
import { fetchMovies } from "@/api/movies/movies.api";
import { Switch } from "@/components/ui/switch";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MovieSwitchDisplay({
  movieListType,
}: {
  movieListType: string;
}) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    vote_average: 0,
    release_date: undefined as DateRange | undefined,
  });
  const [isListDisplayModeEnabled, setIsListDisplayModeEnabled] =
    useState(false);

  // effect for fetching data when component initially renders
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies(movieListType, 1); // Await the async function

      if (data && data.results.length > 0) {
        setMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false); // End loading
    };
    loadMovies();
  }, [movieListType]);

  // effect for filtering data when filter value changes
  useEffect(() => {
    const ratingFilteredMovies = movies?.filter((movie) => {
      return movie.vote_average >= filters.vote_average;
    });
    const fromReleaseDateFilteredMovies =
      filters.release_date && filters.release_date.from
        ? ratingFilteredMovies?.filter((movie) => {
            if (filters.release_date?.from) {
              const movieReleaseDate = new Date(movie.release_date);
              return movieReleaseDate >= filters.release_date?.from;
            }
            return true;
          })
        : ratingFilteredMovies;
    const toReleaseDateFilteredMovies =
      filters.release_date && filters.release_date.to
        ? fromReleaseDateFilteredMovies?.filter((movie) => {
            if (filters.release_date?.to) {
              const movieReleaseDate = new Date(movie.release_date);
              return movieReleaseDate <= filters.release_date?.to;
            }
            return true;
          })
        : fromReleaseDateFilteredMovies;
    setFilteredMovies(toReleaseDateFilteredMovies);
  }, [filters, movies]);

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
                    <AccordionItem value="rating" className="border-gray-700">
                      <AccordionTrigger className="text-gray-300 hover:text-white">Minimum Rating?</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col p-4">
                          <Slider
                            defaultValue={[0]}
                            max={10}
                            step={1}
                            className="p-2"
                            onValueCommit={(value) => {
                              setFilters((f) => {
                                return { ...f, vote_average: value[0] };
                              });
                            }}
                          />
                          <span className="mx-auto text-lg text-blue-400 font-semibold">
                            {filters.vote_average}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="release-date" className="border-gray-700">
                      <AccordionTrigger className="text-gray-300 hover:text-white">Release Date?</AccordionTrigger>
                      <AccordionContent>
                        <div className="p-4">
                          <DatePickerWithRange
                            date={filters.release_date}
                            setDate={(d) => {
                              setFilters((f) => {
                                return { ...f, release_date: d };
                              });
                            }}
                          />
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
                  <DataTable columns={columns} data={movies} />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                  {filteredMovies &&
                    filteredMovies.length > 0 &&
                    filteredMovies?.map((movie) => {
                      return (
                        <Card key={movie.id} className="w-full bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
                          <Link href={`/movies/${movie.id}`}>
                            <CardContent className="flex aspect-square items-center justify-center p-0 group">
                              {movie.poster_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt={movie.title}
                                  height={160}
                                  width={90}
                                  layout="responsive"
                                  className="rounded-xl group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <p className="text-center font-semibold text-gray-300">
                                  {movie.title}
                                </p>
                              )}
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
