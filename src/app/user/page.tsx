"use client";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/users";
import Image from "next/image";
import { Movie } from "@/interfaces/movies";
import MovieCarousel from "../MovieCarousel";
import {
  getUserDetails,
  getFavoriteTVShows,
  getWatchlistTVShows,
  getFavoriteMovies,
  getWatchlistMovies,
  getUserRatedMovies,
  getUserRatedTVShows,
} from "@/api/user/user.api";
import { TVShow } from "@/interfaces/tvShows";
import TVShowCarousel from "../TVShowCarousel";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null | undefined>();
  const [favMovies, setFavMovies] = useState<Movie[] | null | undefined>();
  const [favTVShows, setFavTVShows] = useState<TVShow[] | null | undefined>();
  const [watchlistMovies, setWatchlistMovies] = useState<
    Movie[] | null | undefined
  >();
  const [watchlistTVShows, setWatchlistTVShows] = useState<
    TVShow[] | null | undefined
  >();
  const [userRatedMovies, setUserRatedMovies] = useState<
    Movie[] | null | undefined
  >();
  const [userRatedTVShows, setUserRatedTVShows] = useState<
    TVShow[] | null | undefined
  >();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const { data, error, message } = await getUserDetails();
      if (data) {
        setUserDetails(data);
      }
      if (error && message) {
        setError(message);
      }
      const loadFavoriteMovies = async () => {
        const { data, error, message } = await getFavoriteMovies();
        console.log(data, error, message);
        if (data && data.results) {
          setFavMovies(data.results);
        }
      };
      loadFavoriteMovies();
      const loadFavoriteTVShows = async () => {
        const { data, error, message } = await getFavoriteTVShows();
        console.log(data, error, message);
        if (data && data.results) {
          setFavTVShows(data.results);
        }
      };
      loadFavoriteTVShows();
      const loadWatchlistMovies = async () => {
        const { data, error, message } = await getWatchlistMovies();
        console.log(data, error, message);
        if (data && data.results) {
          setWatchlistMovies(data.results);
        }
      };
      loadWatchlistMovies();
      const loadWatchlistTVShows = async () => {
        const { data, error, message } = await getWatchlistTVShows();
        console.log(data, error, message);
        if (data && data.results) {
          setWatchlistTVShows(data.results);
        }
      };
      loadWatchlistTVShows();

      const loadUserRatedMovies = async () => {
        const { data, error, message } = await getUserRatedMovies();
        console.log(data, error, message);
        setUserRatedMovies(data.results);
      };
      loadUserRatedMovies();
      const loadUserRatedTVShows = async () => {
        const { data, error, message } = await getUserRatedTVShows();
        console.log(data, error, message);
        setUserRatedTVShows(data.results);
      };
      loadUserRatedTVShows();
      setLoading(false);
    };

    loadDetails();
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {userDetails &&
        userDetails.avatar &&
        userDetails.avatar.tmdb &&
        userDetails.avatar.tmdb.avatar_path && (
          <div className="w-32 mx-auto my-4">
            <Image
              src={`https://image.tmdb.org/t/p/original${userDetails.avatar.tmdb.avatar_path}`}
              alt={userDetails.username}
              height={160}
              width={90}
              layout="responsive"
              className="rounded-full"
            />
          </div>
        )}
      {userDetails && userDetails.name ? (
        <p className="text-2xl font-bold text-center">{userDetails.name}</p>
      ) : (
        <p>{userDetails?.username}</p>
      )}
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Favorite Movies</p>
        <MovieCarousel movieList={favMovies} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Favorite TV Shows</p>
        <TVShowCarousel tvShowList={favTVShows} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Watchlist Movies</p>
        <MovieCarousel movieList={watchlistMovies} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Watchlist TV Shows</p>
        <TVShowCarousel tvShowList={watchlistTVShows} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Rated Movies</p>
        <MovieCarousel movieList={userRatedMovies} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">My Rated TV Shows</p>
        <TVShowCarousel tvShowList={userRatedTVShows} />
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
