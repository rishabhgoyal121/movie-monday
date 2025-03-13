"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/interfaces/movies";
import { fetchMovies } from "@/api/movies/movies.api";

export default function Page() {
  const [loadingTopRatedMovies, setLoadingTopRatedMovies] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[] | null>([]);
  const [errorTopRatedMovies, setErrorTopRatedMovies] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadMovies = async () => {
      setLoadingTopRatedMovies(true);
      const { data, error, message } = await fetchMovies("top_rated", 1);
      if (data && data.results.length > 0) {
        setTopRatedMovies(data.results);
      }
      if (error && message) {
        setErrorTopRatedMovies(message);
      }
      setLoadingTopRatedMovies(false); // End loading
    };
    loadMovies();
  }, []);

  return (
    <>
      <h2>Top Rated Movies</h2>
      {loadingTopRatedMovies && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {topRatedMovies &&
            topRatedMovies.length > 0 &&
            topRatedMovies.map((movie) => {
              return (
                <CarouselItem
                  key={movie.id}
                  className="md:basis-1/6 lg:basis-1/9"
                >
                  <div className="p-1">
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
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
      {errorTopRatedMovies && <p>{errorTopRatedMovies}</p>}
    </>
  );
}
