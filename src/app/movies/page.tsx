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
      return movie.vote_average > filters.vote_average;
    });
    const fromReleaseDateFilteredMovies = ratingFilteredUpcomingMovies?.filter(
      (movie) => {
        if (filters.release_date?.from) {
          const movieReleaseDate = new Date(movie.release_date);
          return movieReleaseDate > filters.release_date?.from;
        }
        return true;
      }
    );
    const toReleaseDateFilteredMovies = fromReleaseDateFilteredMovies?.filter(
      (movie) => {
        if (filters.release_date?.to) {
          const movieReleaseDate = new Date(movie.release_date);
          return movieReleaseDate < filters.release_date?.to;
        }
        return true;
      }
    );
    setFilteredUpcomingMovies(toReleaseDateFilteredMovies);
  }, [filters, upcomingMovies]);

  return (
    <>
      <h2>Upcoming Movies</h2>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-[1fr_4fr]">
        <div className="border">
          <span>Filters</span>
          <Accordion type="single" collapsible>
            <AccordionItem value="rating">
              <AccordionTrigger>Rating?</AccordionTrigger>
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
        <div className="flex flex-wrap mx-8">
          <Switch
            checked={isListDisplayModeEnabled}
            onCheckedChange={() => {
              setIsListDisplayModeEnabled(!isListDisplayModeEnabled);
            }}
            name="List display"
          />
          <span>List mode</span>
          {isListDisplayModeEnabled ? (
            <DataTable columns={columns} data={upcomingMovies} />
          ) : (
            filteredUpcomingMovies &&
            filteredUpcomingMovies.length > 0 &&
            filteredUpcomingMovies?.map((movie) => {
              return (
                <div className="flex px-2 py-8 w-44" key={movie.id}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 ">
                      <Link href={`/movies/${movie.id}`}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                          height={160}
                          width={90}
                          layout="responsive"
                          className="rounded-xl"
                        />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          )}
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
