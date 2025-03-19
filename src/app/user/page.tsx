"use client";
import { getUserDetails } from "@/api/user/user.api";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/users";
import Image from "next/image";
import { getFavoriteMovies } from "@/api/user/user.api";
import { Movie } from "@/interfaces/movies";
import MovieCarousel from "../MovieCarousel";
import { getFavoriteTVShows } from "@/api/user/user.api";
import { TVShow } from "@/interfaces/tvShows";
import TVShowCarousel from "../TVShowCarousel";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null | undefined>();
  const [favMovies, setFavMovies] = useState<Movie[] | null | undefined>();
  const [favTVShows, setFavTVShows] = useState<TVShow[] | null | undefined>();
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
        <p className="text-lg font-semibold pl-4">Favorite Movies</p>
        <MovieCarousel movieList={favMovies} />
      </div>
      <div className="w-full my-8">
        <p className="text-lg font-semibold pl-4">Favorite TV Shows</p>
        <TVShowCarousel tvShowList={favTVShows} />
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
