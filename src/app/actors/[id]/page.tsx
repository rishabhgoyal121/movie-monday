"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ActorDetails,
  ActorCreditMovie,
  ActorCreditTVShow,
} from "@/interfaces/actors";
import {
  fetchActorDetails,
  fetchActorCreditMovies,
  fetchActorCreditTVShows,
} from "@/api/actors/actors.api";
import TMBDImage from "@/components/TMBDImage";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [actorData, setActorData] = useState<ActorDetails | undefined | null>(
    null
  );
  const [error, setError] = useState<string | null | undefined>(null);
  const [loadingMovieCredits, setLoadingMovieCredits] = useState(true);
  const [movieCredits, setMovieCredits] = useState<
    ActorCreditMovie[] | null | undefined
  >(null);
  const [errorMovieCredits, setErrorMovieCredits] = useState<
    string | null | undefined
  >(null);
  const [loadingTVShowCredits, setLoadingTVShowCredits] = useState(true);
  const [TVShowCredits, setTVShowCredits] = useState<
    ActorCreditTVShow[] | undefined | null
  >(null);
  const [errorTVShowCredits, setErrorTVShowCredits] = useState<
    string | null | undefined
  >(null);

  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const loadActorDetails = async () => {
        setLoading(true);
        const { data, error, message } = await fetchActorDetails(id);
        setActorData(data);
        if (error && message) {
          setError(message);
        }
        setLoading(false);
      };
      loadActorDetails();
      const loadActorCreditMovies = async () => {
        setLoadingMovieCredits(true); // Ensure loading starts

        const { data, error, message } = await fetchActorCreditMovies(id); // Await the async function

        setMovieCredits(data?.cast);

        if (error && message) {
          setErrorMovieCredits(message);
        }

        setLoadingMovieCredits(false); // End loading
      };
      loadActorCreditMovies();
      const loadActorCreditTVShows = async () => {
        setLoadingTVShowCredits(true); // Ensure loading starts

        const { data, error, message } = await fetchActorCreditTVShows(id); // Await the async function

        setTVShowCredits(data?.cast);

        if (error && message) {
          setErrorTVShowCredits(message);
        }

        setLoadingTVShowCredits(false); // End loading
      };
      loadActorCreditTVShows();
      return id;
    };
    getProps();
  }, [params]);

  return (
    <>
      <h2 className="mx-4 pt-4 text-lg font-semibold">Actor</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex text-center mb-4">
          <div className="w-72 mx-4 flex items-center">
            <TMBDImage
              src={actorData?.profile_path}
              alt={actorData?.name ?? ""}
            />
          </div>

          <div className=" text-center w-full">
            <div>
              <p className=" font-bold text-3xl">
                {actorData && actorData.name}
              </p>
              <p className="italic">
                {actorData && actorData.birthday} -{" "}
                {actorData && actorData.deathday}
              </p>
            </div>

            <br />
            <p className="mx-20 mt-2">{actorData && actorData.biography}</p>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {movieCredits && movieCredits.length > 0 && (
        <h2 className="ml-12 font-semibold text-lg">Actor Credits</h2>
      )}
      {loadingMovieCredits && <p>Loading...</p>}
      {movieCredits && movieCredits.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[90vw] ml-16 mt-4"
        >
          <CarouselPrevious />
          <CarouselContent className="">
            {movieCredits &&
              movieCredits.length > 0 &&
              movieCredits.map((movie) => {
                return (
                  <CarouselItem
                    key={movie.credit_id}
                    className="md:basis-1/6 lg:basis-1/9"
                  >
                    <div className="p-1">
                      <Card>
                        <Link href={`/movies/${movie.id}`}>
                          <CardContent className="flex aspect-square items-center justify-center p-0 ">
                            <TMBDImage
                              src={movie.poster_path}
                              alt={movie.title}
                            />
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      )}
      {errorMovieCredits && <p>{errorMovieCredits}</p>}
      {TVShowCredits && TVShowCredits.length > 0 && (
        <h2 className="ml-12 font-semibold text-lg">TV Show Credits</h2>
      )}
      {loadingTVShowCredits && <p>Loading...</p>}
      {TVShowCredits && TVShowCredits.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[90vw] ml-16 mt-4"
        >
          <CarouselPrevious />
          <CarouselContent className="">
            {TVShowCredits &&
              TVShowCredits.length > 0 &&
              TVShowCredits.map((tvShow) => {
                return (
                  <CarouselItem
                    key={tvShow.credit_id}
                    className="md:basis-1/6 lg:basis-1/9"
                  >
                    <div className="p-1">
                      <Card>
                        <Link href={`/tvShows/${tvShow.id}`}>
                          <CardContent className="flex aspect-square items-center justify-center p-0 ">
                            <TMBDImage
                              src={tvShow.poster_path}
                              alt={tvShow.name}
                            />
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      )}
      {errorTVShowCredits && <p>{errorTVShowCredits}</p>}
    </>
  );
}
