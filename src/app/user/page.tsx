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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        )}
        
        {userDetails && (
          <div className="text-center mb-12">
            {userDetails.avatar &&
              userDetails.avatar.tmdb &&
              userDetails.avatar.tmdb.avatar_path && (
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${userDetails.avatar.tmdb.avatar_path}`}
                    alt={userDetails.username}
                    fill
                    className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                </div>
              )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {userDetails.name || userDetails.username}
            </h1>
          </div>
        )}

        <div className="space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Favorite Movies</h2>
            <div className="w-11/12 mx-auto">
              <MovieCarousel movieList={favMovies} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Favorite TV Shows</h2>
            <div className="w-11/12 mx-auto">
              <TVShowCarousel tvShowList={favTVShows} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Watchlist Movies</h2>
            <div className="w-11/12 mx-auto">
              <MovieCarousel movieList={watchlistMovies} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Watchlist TV Shows</h2>
            <div className="w-11/12 mx-auto">
              <TVShowCarousel tvShowList={watchlistTVShows} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Rated Movies</h2>
            <div className="w-11/12 mx-auto">
              <MovieCarousel movieList={userRatedMovies} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Rated TV Shows</h2>
            <div className="w-11/12 mx-auto">
              <TVShowCarousel tvShowList={userRatedTVShows} />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
