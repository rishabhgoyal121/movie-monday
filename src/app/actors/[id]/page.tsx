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
  const [showFullBio, setShowFullBio] = useState(false);

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

  const getShortenedBio = (bio: string) => {
    const words = bio.split(' ');
    if (words.length <= 100) return bio;
    return words.slice(0, 100).join(' ') + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {!loading && (
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <TMBDImage
                  src={actorData?.profile_path}
                  alt={actorData?.name ?? ""}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                  {actorData?.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>{actorData?.birthday}</span>
                  {actorData?.deathday && (
                    <>
                      <span>•</span>
                      <span>{actorData.deathday}</span>
                    </>
                  )}
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="max-h-[400px] overflow-y-auto pr-4">
                    <p className="text-lg leading-relaxed">
                      {actorData?.biography ? (
                        <>
                          {showFullBio ? actorData.biography : getShortenedBio(actorData.biography)}
                          {actorData.biography.split(' ').length > 100 && (
                            <button
                              onClick={() => setShowFullBio(!showFullBio)}
                              className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              {showFullBio ? 'Show Less' : 'Read More'}
                            </button>
                          )}
                        </>
                      ) : 'No biography available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            {error}
          </div>
        )}

        {movieCredits && movieCredits.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Movie Credits</h2>
            {loadingMovieCredits ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {movieCredits.map((movie) => (
                    <CarouselItem
                      key={movie.credit_id}
                      className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <div className="p-2">
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                          <Link href={`/movies/${movie.id}`}>
                            <CardContent className="p-0">
                              <div className="relative aspect-[2/3]">
                                <TMBDImage
                                  src={movie.poster_path}
                                  alt={movie.title}
                                  className="rounded-t-lg"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <p className="text-white text-center px-2 font-medium">
                                    {movie.title}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Link>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        )}
        {errorMovieCredits && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 mb-8">
            {errorMovieCredits}
          </div>
        )}

        {TVShowCredits && TVShowCredits.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">TV Show Credits</h2>
            {loadingTVShowCredits ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {TVShowCredits.map((tvShow) => (
                    <CarouselItem
                      key={tvShow.credit_id}
                      className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <div className="p-2">
                        <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                          <Link href={`/tvShows/${tvShow.id}`}>
                            <CardContent className="p-0">
                              <div className="relative aspect-[2/3]">
                                <TMBDImage
                                  src={tvShow.poster_path}
                                  alt={tvShow.name}
                                  className="rounded-t-lg"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <p className="text-white text-center px-2 font-medium">
                                    {tvShow.name}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Link>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        )}
        {errorTVShowCredits && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            {errorTVShowCredits}
          </div>
        )}
      </div>
    </div>
  );
}
