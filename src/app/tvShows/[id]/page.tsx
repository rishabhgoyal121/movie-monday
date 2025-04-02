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
import type { TVShowDetails, TVShowCredit } from "@/interfaces/tvShows";
import {
  fetchTVShowDetails,
  fetchTVShowCredits,
  addTVShowRating,
} from "@/api/tvShows/tvShows.api";
import TMBDImage from "@/components/TMBDImage";
import { Heart, PlusIcon, CheckIcon } from "lucide-react";
import {
  addToFavorites,
  getFavoriteTVShows,
  addToWatchlist,
  getWatchlistTVShows,
  getUserRatedTVShows,
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
  const [tvShowData, setTVShowData] = useState<
    TVShowDetails | undefined | null
  >(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [tvShowCreditsData, setTVShowCreditsData] = useState<
    TVShowCredit[] | null | undefined
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
      const loadTVShowDetails = async () => {
        setLoading(true); // Ensure loading starts

        const { data, error, message } = await fetchTVShowDetails(id); // Await the async function

        setTVShowData(data);

        if (error && message) {
          setError(message);
        }

        setLoading(false); // End loading
      };
      loadTVShowDetails();
      const loadTVShowCredits = async () => {
        setLoadingCredits(true); // Ensure loading starts

        const { data, error, message } = await fetchTVShowCredits(id); // Await the async function

        setTVShowCreditsData(data?.cast);

        if (error && message) {
          setErrorCredits(message);
        }

        setLoadingCredits(false); // End loading
      };
      loadTVShowCredits();
      const loadFavoriteTVShows = async () => {
        const { data, error, message } = await getFavoriteTVShows();
        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setIsFavorite(true);
          }
        }
      };
      loadFavoriteTVShows();
      const loadWatchlistTVShows = async () => {
        const { data, error, message } = await getWatchlistTVShows();

        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setIsInWatchlist(true);
          }
        }
      };
      loadWatchlistTVShows();
      const loadUserRatedTVShows = async () => {
        const { data, error, message } = await getUserRatedTVShows();
        console.log(data, error, message);
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].id == id) {
            setUserRating(data.results[i].rating);
          }
        }
      };
      loadUserRatedTVShows();
    };
    getProps();
  }, [params]);

  const toggleFavorite = async (i: boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToFavorites({
      media_id: +id,
      favorite: i,
      media_type: "tv",
    });
    console.log(data, error, message);
  };

  const toggleWatchlist = async (i: boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToWatchlist({
      media_id: +id,
      watchlist: i,
      media_type: "tv",
    });
    console.log(data, error, message);
  };

  const toggleRating = async (rating: number | null) => {
    const { id } = await params;
    const { data, error, message } = await addTVShowRating({ id, rating });
    console.log(data, error, message);
  };

  return (
    <div
      style={
        tvShowData?.backdrop_path
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${tvShowData?.backdrop_path})`,
            }
          : {}
      }
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
    >
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center min-h-[80vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {!loading && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <TMBDImage
                  src={tvShowData?.poster_path}
                  alt={tvShowData?.name ?? ""}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {tvShowData?.name}
                    </h1>
                    <p className="text-gray-300 italic text-lg">
                      {tvShowData?.tagline}
                    </p>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <Heart
                        size={32}
                        fill={shouldFillFav ? "red" : ""}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => {
                          setIsFavorite((i) => {
                            toggleFavorite(!i);
                            return !i;
                          });
                        }}
                        onMouseEnter={() => setIsHoveredOnFav(true)}
                        onMouseLeave={() => setIsHoveredOnFav(false)}
                      />
                      <span className="text-sm text-gray-300">Favorite</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="cursor-pointer hover:scale-110 transition-transform"
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
                      </div>
                      <span className="text-sm text-gray-300">Watchlist</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-semibold text-white">Rating</p>
                      <StyledRating
                        name="avg-rating"
                        value={tvShowData?.vote_average}
                        defaultValue={0}
                        precision={0.5}
                        max={10}
                        readOnly
                        className="w-full"
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-semibold text-white">Your Rating</p>
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

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {tvShowData?.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Cast</h2>
          {loadingCredits && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
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
                {tvShowCreditsData?.map((actor) => (
                  <CarouselItem
                    key={actor.credit_id}
                    className="md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                  >
                    <div className="p-2">
                      <Card className="bg-gray-800 border-gray-700 hover:border-gray-500 transition-colors">
                        <CardContent className="p-0">
                          <Link href={`/actors/${actor.id}`}>
                            <div className="relative aspect-[2/3]">
                              <TMBDImage
                                src={actor.profile_path}
                                alt={actor.name}
                                className="rounded-t-lg"
                              />
                            </div>
                            <div className="p-3">
                              <p className="text-white font-medium truncate">
                                {actor.name}
                              </p>
                              <p className="text-gray-400 text-sm truncate">
                                {actor.character}
                              </p>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
          {errorCredits && (
            <p className="text-red-500 text-center mt-4">{errorCredits}</p>
          )}
        </div>
      </div>
    </div>
  );
}
