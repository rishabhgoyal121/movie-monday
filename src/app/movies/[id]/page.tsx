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
import type { MovieDetails, MovieCredit } from "@/interfaces/movies";
import { fetchMovieDetails, fetchMovieCredits } from "@/api/movies/movies.api";
import TMBDImage from "@/components/TMBDImage";
import { Heart } from "lucide-react";
import { addToFavorites, getFavoriteMovies } from "@/api/user/user.api";

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
  const [isFavorite, setIsFavorite] = useState(false);

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
      const loadFavoriteMovies = async () => {
        const { data, error, message } = await getFavoriteMovies();
        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setIsFavorite(true);
          }
        }
      };
      loadFavoriteMovies();
    };
    getProps();
  }, [params]);

  const toggleFavorite = async (i:boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToFavorites({
      media_id: +id,
      favorite: i,
    });
    console.log(data, error, message);
  };

  return (
    <div
      style={
        movieData?.backdrop_path
          ? {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
            }
          : {}
      }
      className="bg-cover bg-center bg-no-repeat h-[100vh] relative top-0 w-[100vw]"
    >
      <div className="relative bg-[#00000099] h-[100vh] fixed top-0 w-[100vw]">
        <h2 className="mx-4 pt-4 text-lg font-semibold">Movie</h2>
        {loading && <p>Loading...</p>}
        <div>
          <br />
          {!loading && (
            <div className="flex text-center mb-4">
              <div className="w-72 mx-4">
                <TMBDImage
                  src={movieData?.poster_path}
                  alt={movieData?.title ?? ""}
                />
              </div>
              <div>
                <div className="">
                  <div>
                    <p className=" font-bold text-3xl">
                      {movieData && movieData.title}
                    </p>
                    <p className="italic">{movieData && movieData.tagline}</p>
                  </div>
                  <div className="absolute top-20 right-40">
                    <Heart
                      size={32}
                      fill={isFavorite ? "red" : ""}
                      onClick={() => {
                        setIsFavorite((i) => {
                          toggleFavorite(!i);
                          return !i;
                        });
                      }}
                    />
                  </div>
                </div>

                <br />
                <p className="mx-20 mt-2">{movieData && movieData.overview}</p>
              </div>
            </div>
          )}
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
                        <div className="p-1 h-full">
                          <Card className="h-full">
                            <CardContent className="flex aspect-square items-center justify-center p-0 ">
                              <Link href={`/actors/${actor.id}`}>
                                <TMBDImage
                                  src={actor.profile_path}
                                  alt={actor.name}
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
        </div>
      </div>
    </div>
  );
}
