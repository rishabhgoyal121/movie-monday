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
import type { MovieDetails, MovieCredit } from "@/interfaces/movies";
import { fetchMovieDetails, fetchMovieCredits } from "@/api/movies/movies.api";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieDetails | undefined | null>(
    null
  );
  const [error, setError] = useState<string | null | undefined>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [movieCreditsData, setMovieCreditsData] = useState<
    MovieCredit[] | null | undefined
  >(null);
  const [errorCredits, setErrorCredits] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const loadMovieDetails = async () => {
        setLoading(true); // Ensure loading starts

        const { data, error, message } = await fetchMovieDetails(id); // Await the async function

        setMovieData(data);

        if (error && message) {
          setError(message);
        }

        setLoading(false); // End loading
      };
      loadMovieDetails();
      const loadMovieCredits = async () => {
        setLoadingCredits(true); // Ensure loading starts

        const { data, error, message } = await fetchMovieCredits(id); // Await the async function

        setMovieCreditsData(data?.cast);

        if (error && message) {
          setErrorCredits(message);
        }

        setLoadingCredits(false); // End loading
      };
      loadMovieCredits();
    };
    getProps();
  }, [params]);

  return (
    <>
      <h2 className="text-center text-lg font-semibold">Movie</h2>
      {loading && <p>Loading...</p>}
      <br />
      {!loading && (
        <p className="text-center font-bold text-3xl">
          {movieData && movieData.title}
        </p>
      )}
      {!loading && (
        <p className="text-center italic">{movieData && movieData.tagline}</p>
      )}
      <br />
      {!loading && (
        <p className="text-center">{movieData && movieData.overview}</p>
      )}
      <br />
      {error && <p>{error}</p>}
      <h2 className="ml-12 font-semibold text-lg">Credits</h2>
      {loadingCredits && <p>Loading...</p>}
      {!loadingCredits && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[90vw] ml-16 mt-4"
        >
          <CarouselPrevious />
          <CarouselContent className="">
            {movieCreditsData &&
              movieCreditsData.length > 0 &&
              movieCreditsData.map((actor) => {
                return (
                  <CarouselItem
                    key={actor.credit_id}
                    className="md:basis-1/6 lg:basis-1/9"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0 ">
                          <Link href={`/actors/${actor.id}`}>
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                              alt={actor.name}
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
      )}
      {errorCredits && <p>{errorCredits}</p>}
    </>
  );
}
