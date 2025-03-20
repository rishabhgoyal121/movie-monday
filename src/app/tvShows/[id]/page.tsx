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
import { fetchTVShowDetails, fetchTVShowCredits } from "@/api/tvShows/tvShows.api";
import TMBDImage from "@/components/TMBDImage";
import { Heart, PlusIcon, CheckIcon } from "lucide-react";
import { addToFavorites, getFavoriteTVShows } from "@/api/user/user.api";
import { addToWatchlist, getWatchlistTVShows } from "@/api/user/user.api";
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
  const [tvShowData, setTVShowData] = useState<TVShowDetails | undefined | null>(
    null
  );
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
      
    };
    getProps();
  }, [params]);

  const toggleFavorite = async (i: boolean) => {
    const { id } = await params;
    const { data, error, message } = await addToFavorites({
      media_id: +id,
      favorite: i,
      media_type:'tv'
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

  return (
    <div
      style={
        tvShowData?.backdrop_path
          ? {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvShowData?.backdrop_path})`,
            }
          : {}
      }
      className="bg-cover bg-center bg-no-repeat h-[100vh] relative top-0 w-full"
    >
      <div className="relative bg-[#00000099] h-[100vh] fixed top-0 w-full">
        <h2 className="mx-4 pt-4 text-lg font-semibold">Movie</h2>
        {loading && <p>Loading...</p>}
        <div>
          <br />
          {!loading && (
            <div className="flex text-center mb-4">
              <div className="w-72 mx-4">
                <TMBDImage
                  src={tvShowData?.poster_path}
                  alt={tvShowData?.name ?? ""}
                />
              </div>
              <div className="w-full">
                <div className="flex w-full">
                  <div className="w-[90%]">
                    <p className=" font-bold text-3xl">
                      {tvShowData && tvShowData.name}
                    </p>
                    <p className="italic">{tvShowData && tvShowData.tagline}</p>
                  </div>
                  <div className="flex flex-col gap-4 ml-[-22%]">
                    <div className="flex gap-8 items-center align-center justify-center">
                      <Heart
                        size={32}
                        fill={shouldFillFav ? "red" : ""}
                        onClick={() => {
                          setIsFavorite((i) => {
                            toggleFavorite(!i);
                            return !i;
                          });
                        }}
                        onMouseEnter={() => setIsHoveredOnFav(true)}
                        onMouseLeave={() => setIsHoveredOnFav(false)}
                      />
                      <div
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
                          <CheckIcon size={36} />
                        ) : (
                          <PlusIcon size={36} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex flex-col gap-2 items-start justify-center w-28">
                        <p className="text-lg font-semibold flex justify-center">
                          Rating :{" "}
                        </p>

                        <p className="text-lg font-semibold flex items-center">
                          Your Rating :{" "}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center">
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
                        <StyledRating
                          name="user-rating"
                          value={userRating}
                          onChange={(e, v) => {
                            setUserRating(v);
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

                <br />
                <p className="mx-20 mt-2">{tvShowData && tvShowData.overview}</p>
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
                {tvShowCreditsData &&
                  tvShowCreditsData.length > 0 &&
                  tvShowCreditsData.map((actor) => {
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
