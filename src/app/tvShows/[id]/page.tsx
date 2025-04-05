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
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${tvShowData?.backdrop_path})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
            }
          : {}
      }
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    >
      <div className="container mx-auto px-4 py-12">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <div>
          {!loading && (
            <div className="flex flex-col md:flex-row gap-12 text-white">
              <div className="w-full md:w-80">
                <TMBDImage
                  src={tvShowData?.poster_path}
                  alt={tvShowData?.name ?? ""}
                  className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">
                      {tvShowData && tvShowData.name}
                    </h1>
                    <p className="text-xl text-gray-300 italic mb-8">
                      {tvShowData && tvShowData.tagline}
                    </p>
                    <div className="bg-white/10 rounded-xl p-8 mb-8 backdrop-blur-sm">
                      <p className="text-lg leading-relaxed">
                        {tvShowData && tvShowData.overview}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-6 items-center">
                      <button
                        className="p-3 rounded-full hover:bg-red-500/30 transition-colors duration-300 transform hover:scale-110"
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
                          size={36}
                          fill={shouldFillFav ? "red" : "none"}
                          stroke={shouldFillFav ? "red" : "white"}
                          className="transition-colors duration-300"
                        />
                      </button>
                      <button
                        className="p-3 rounded-full hover:bg-green-500/30 transition-colors duration-300 transform hover:scale-110"
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
                          <CheckIcon size={40} className="text-green-500" />
                        ) : (
                          <PlusIcon size={40} className="text-white" />
                        )}
                      </button>
                    </div>
                    <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-lg font-semibold mb-3">Average Rating</p>
                          <StyledRating
                            name="avg-rating"
                            value={tvShowData?.vote_average}
                            defaultValue={0}
                            precision={0.5}
                            max={10}
                            readOnly
                            className="w-full"
                            icon={<StarIcon fontSize="large" />}
                            emptyIcon={<StarBorderIcon fontSize="large" />}
                          />
                        </div>
                        <div>
                          <p className="text-lg font-semibold mb-3">Your Rating</p>
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
                            icon={<StarIcon fontSize="large" />}
                            emptyIcon={<StarBorderIcon fontSize="large" />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-500/30 p-6 rounded-xl text-white mt-8 backdrop-blur-sm">
              <p className="text-lg">{error}</p>
            </div>
          )}
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Cast</h2>
            {loadingCredits && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            {!loadingCredits && (
              <div className="h-fit">
                <Carousel
                  opts={{
                    align: "center",
                  }}
                  className="w-full mx-4"
                >
                  <CarouselContent className="-ml-2 md:mx-8 overflow-x-hidden">
                    {tvShowCreditsData &&
                      tvShowCreditsData.length > 0 &&
                      tvShowCreditsData.map((actor) => (
                        <CarouselItem
                          key={actor.credit_id}
                          className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                        >
                          <div className="p-1">
                            <Card className="bg-white/10 border-none backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                              <CardContent className="p-0 relative overflow-hidden">
                                <Link href={`/actors/${actor.id}`} className="block aspect-[2/3] w-full">
                                  <TMBDImage
                                    src={actor.profile_path}
                                    alt={actor.name}
                                    className="rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                      <h3 className="text-white font-semibold text-lg mb-1 truncate">
                                        {actor.name}
                                      </h3>
                                      <p className="text-gray-300 text-sm truncate">
                                        {actor.character}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 transition-colors duration-300 -left-4" />
                  <CarouselNext className="text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 transition-colors duration-300 -right-4" />
                </Carousel>
              </div>
            )}
            {errorCredits && (
              <div className="bg-red-500/30 p-6 rounded-xl text-white mt-8 backdrop-blur-sm">
                <p className="text-lg">{errorCredits}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
