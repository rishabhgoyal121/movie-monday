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

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [filteredUpcomingMovies, setFilteredUpcomingMovies] = useState<
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

      const { data, error, message } = await fetchMovies("upcoming", 1); // Await the async function

      if (data && data.results.length > 0) {
        setUpcomingMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false); // End loading
    };
    loadMovies();
  }, []);

  // effect for filtering data when filter value changes
  useEffect(() => {
    const ratingFilteredUpcomingMovies = upcomingMovies?.filter((movie) => {
      return movie.vote_average >= filters.vote_average;
    });
    const fromReleaseDateFilteredMovies =
      filters.release_date && filters.release_date.from
        ? ratingFilteredUpcomingMovies?.filter((movie) => {
            if (filters.release_date?.from) {
              const movieReleaseDate = new Date(movie.release_date);
              return movieReleaseDate >= filters.release_date?.from;
            }
            return true;
          })
        : ratingFilteredUpcomingMovies;
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
    setFilteredUpcomingMovies(toReleaseDateFilteredMovies);
  }, [filters, upcomingMovies]);

  return (
    <>
      <h2 className="px-2 font-bold text-lg mb-2 mt-4">Upcoming Movies</h2>

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
              {!isListDisplayModeEnabled && (
                <div>
                  <p className="text-lg underline font-semibold">Filters</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="rating">
                      <AccordionTrigger>Minimum Rating?</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
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
                          <span className="mx-auto text-lg">
                            {filters.vote_average}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="release-date">
                      <AccordionTrigger>Release Date?</AccordionTrigger>
                      <AccordionContent>
                        <DatePickerWithRange
                          date={filters.release_date}
                          setDate={(d) => {
                            setFilters((f) => {
                              return { ...f, release_date: d };
                            });
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>

            <div>
              {isListDisplayModeEnabled ? (
                <div className="mt-[-6.6rem] px-4 w-[80vw] max-w-250 font-semibold">
                  <DataTable columns={columns} data={upcomingMovies} />
                </div>
              ) : (
                <div className="flex px-2 flex-wrap mx-8 gap-8">
                  {filteredUpcomingMovies &&
                    filteredUpcomingMovies.length > 0 &&
                    filteredUpcomingMovies?.map((movie) => {
                      return (
                        <Card key={movie.id} className="w-44">
                          <Link href={`/movies/${movie.id}`}>
                            <CardContent className="flex aspect-square items-center justify-center p-0 ">
                              {movie.poster_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                  alt={movie.title}
                                  height={160}
                                  width={90}
                                  layout="responsive"
                                  className="rounded-xl"
                                />
                              ) : (
                                <p className="text-center font-semibold">
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

      {error && <p>{error}</p>}
    </>
  );
}
