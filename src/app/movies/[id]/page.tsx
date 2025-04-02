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
import {
  fetchMovieDetails,
  fetchMovieCredits,
  addMovieRating,
} from "@/api/movies/movies.api";
import TMBDImage from "@/components/TMBDImage";
import { Heart, PlusIcon, CheckIcon } from "lucide-react";
import {
  addToFavorites,
  getFavoriteMovies,
  addToWatchlist,
  getWatchlistMovies,
  getUserRatedMovies,
} from "@/api/user/user.api";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
  "& .MuiRating-icon": {
    color: "#faaf00",
  },
  "& .MuiRating-iconHover": {
    color: "#faaf00",
  },
});

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
  const [isHoveredOnFav, setIsHoveredOnFav] = useState(false);
  const shouldFillFav = isHoveredOnFav ? !isFavorite : isFavorite;
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isHoveredOnWatchList, setIsHoveredOnWatchList] = useState(false);
  const shouldCheckWatchList = isHoveredOnWatchList
    ? !isInWatchlist
    : isInWatchlist;
  const [userRating, setUserRating] = useState<number | null>(0);

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
      const loadWatchlistMovies = async () => {
        const { data, error, message } = await getWatchlistMovies();
        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setIsInWatchlist(true);
          }
        }
      };
      loadWatchlistMovies();
      const loadUserRatedMovies = async () => {
        const { data, error, message } = await getUserRatedMovies();
        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setUserRating(data.results[i].rating);
          }
        }
      };
      loadUserRatedMovies();
    };
    getProps();
  }, [params]);

  const toggleFavorite = async (i: boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToFavorites({
      media_id: +id,
      favorite: i,
    });
    console.log(data, error, message);
  };

  const toggleWatchlist = async (i: boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToWatchlist({
      media_id: +id,
      watchlist: i,
    });
    console.log(data, error, message);
  };

  const toggleRating = async (rating: number | null) => {
    const { id } = await params;
    const { data, error, message } = await addMovieRating({ id, rating });
    console.log(data, error, message);
  };

  return (
    <div
      style={
        movieData?.backdrop_path
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
            }
          : {}
      }
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Movie Details</h2>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-lg">Loading...</p>
          </div>
        )}
        <div>
          {!loading && (
            <div className="flex flex-col md:flex-row gap-8 text-white">
              <div className="w-full md:w-72">
                <TMBDImage
                  src={movieData?.poster_path}
                  alt={movieData?.title ?? ""}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">
                      {movieData && movieData.title}
                    </h1>
                    <p className="text-xl text-gray-300 italic mb-6">
                      {movieData && movieData.tagline}
                    </p>
                    <p className="text-lg leading-relaxed mb-8">
                      {movieData && movieData.overview}
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-6 items-center">
                      <button
                        className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
                        onClick={() => {
                          setIsFavorite((i) => {
                            toggleFavorite(!i);
                            return !i;
                          });
                        }}
                        onMouseEnter={() => setIsHoveredOnFav(true)}
                        onMouseLeave={() => setIsHoveredOnFav(false)}
                      >
                        <Heart
                          size={32}
                          fill={shouldFillFav ? "red" : "none"}
                          stroke={shouldFillFav ? "red" : "white"}
                          className="transition-colors"
                        />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-green-500/20 transition-colors"
                        onClick={() => {
                          setIsInWatchlist((i) => {
                            toggleWatchlist(!i);
                            return !i;
                          });
                        }}
                        onMouseEnter={() => setIsHoveredOnWatchList(true)}
                        onMouseLeave={() => setIsHoveredOnWatchList(false)}
                      >
                        {shouldCheckWatchList ? (
                          <CheckIcon size={36} className="text-green-500" />
                        ) : (
                          <PlusIcon size={36} className="text-white" />
                        )}
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-lg font-semibold mb-2">Average Rating</p>
                        <StyledRating
                          name="avg-rating"
                          value={movieData?.vote_average}
                          defaultValue={0}
                          precision={0.5}
                          max={10}
                          readOnly
                          className="w-full"
                          icon={<StarIcon fontSize="inherit" />}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-2">Your Rating</p>
                        <StyledRating
                          name="user-rating"
                          value={userRating}
                          onChange={(e, v) => {
                            setUserRating(v);
                            toggleRating(v);
                          }}
                          defaultValue={0}
                          precision={0.5}
                          max={10}
                          icon={<StarIcon fontSize="inherit" />}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-500/20 p-4 rounded-lg text-white mt-4">
              <p>{error}</p>
            </div>
          )}
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            {loadingCredits && (
              <div className="flex justify-center items-center h-32">
                <p className="text-white text-lg">Loading cast...</p>
              </div>
            )}
            {!loadingCredits && (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {movieCreditsData &&
                    movieCreditsData.length > 0 &&
                    movieCreditsData.map((actor) => (
                      <CarouselItem
                        key={actor.credit_id}
                        className="md:basis-1/6 lg:basis-1/9"
                      >
                        <div className="p-1 h-full">
                          <Card className="h-full bg-white/10 border-none">
                            <CardContent className="flex aspect-square items-center justify-center p-0">
                              <Link href={`/actors/${actor.id}`}>
                                <TMBDImage
                                  src={actor.profile_path}
                                  alt={actor.name}
                                  className="rounded-lg"
                                />
                              </Link>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-white hover:text-gray-300" />
                <CarouselNext className="text-white hover:text-gray-300" />
              </Carousel>
            )}
            {errorCredits && (
              <div className="bg-red-500/20 p-4 rounded-lg text-white mt-4">
                <p>{errorCredits}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

