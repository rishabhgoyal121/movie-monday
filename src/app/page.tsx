"use client";
import Banner from "@/components/Banner";
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
import { LocalStorageService } from "@/services/local-storage-service";
import type { Movie } from "@/interfaces/movies";
import { fetchMovies } from "@/api/movies/movies.api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingTopRatedMovies, setLoadingTopRatedMovies] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorTopRatedMovies, setErrorTopRatedMovies] = useState<string | null>(
    null
  );
  const [loadingMostPopularMovies, setLoadingMostPopularMovies] =
    useState(true);
  const [mostPopularMovies, setMostPopularMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorMostPopularMovies, setErrorMostPopularMovies] = useState<
    string | null
  >(null);
  const [loadingNowPlayingMovies, setLoadingNowPlayingMovies] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorNowPlayingMovies, setErrorNowPlayingMovies] = useState<
    string | null
  >(null);

  useEffect(() => {
    // set bearer token in local storage on initial load
    // doing this for now as we do not have a login api to get access token.
    LocalStorageService.set("Bearer", process.env.NEXT_PUBLIC_ACCESS_TOKEN);

    const loadUpcomingMovies = async () => {
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
    loadUpcomingMovies();
    const loadTopRatedMovies = async () => {
      setLoadingTopRatedMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("top_rated", 1); // Await the async function

      if (data && data.results.length > 0) {
        setTopRatedMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorTopRatedMovies(message);
      }

      setLoadingTopRatedMovies(false); // End loading
    };
    loadTopRatedMovies();
    const loadMostPopularMovies = async () => {
      setLoadingMostPopularMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("popular", 1); // Await the async function

      if (data && data.results.length > 0) {
        setMostPopularMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorMostPopularMovies(message);
      }

      setLoadingMostPopularMovies(false); // End loading
    };
    loadMostPopularMovies();
    const loadNowPlayingMovies = async () => {
      setLoadingNowPlayingMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("now_playing", 1); // Await the async function

      if (data && data.results.length > 0) {
        setNowPlayingMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorNowPlayingMovies(message);
      }

      setLoadingNowPlayingMovies(false); // End loading
    };
    loadNowPlayingMovies();
  }, []);

  return (
    <>
      <Banner
        title="Welcome."
        subtitle="Millions of movies, TV shows and people to discover. Explore now."
        bannerImageUrl="https://i.ibb.co/Gv3qbkfg/pexels-ron-lach-9807277.jpg"
      />
      <h2>Upcoming Movies</h2>
      {loading && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {upcomingMovies &&
            upcomingMovies.length > 0 &&
            upcomingMovies.map((movie) => {
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
      {error && <p>{error}</p>}
      <br />
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
      <br />
      <h2>Most Popular Movies</h2>
      {loadingMostPopularMovies && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {mostPopularMovies &&
            mostPopularMovies.length > 0 &&
            mostPopularMovies.map((movie) => {
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
      {errorMostPopularMovies && <p>{errorMostPopularMovies}</p>}
      <br />
      <h2>Now Playing Movies</h2>
      {loadingNowPlayingMovies && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {nowPlayingMovies &&
            nowPlayingMovies.length > 0 &&
            nowPlayingMovies.map((movie) => {
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
      {errorNowPlayingMovies && <p>{errorNowPlayingMovies}</p>}
    </>
  );
}
