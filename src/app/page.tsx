"use client";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import { LocalStorageService } from "@/services/local-storage-service";
import type { Movie } from "@/interfaces/movies";
import { fetchMovies } from "@/api/movies/movies.api";
import MovieCarousel from "@/app/MovieCarousel";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingTopRatedMovies, setLoadingTopRatedMovies] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorTopRatedMovies, setErrorTopRatedMovies] = useState<string | null>(
    null
  );
  const [loadingMostPopularMovies, setLoadingMostPopularMovies] =
    useState(true);
  const [mostPopularMovies, setMostPopularMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorMostPopularMovies, setErrorMostPopularMovies] = useState<
    string | null
  >(null);
  const [loadingNowPlayingMovies, setLoadingNowPlayingMovies] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<
    Movie[] | null | undefined
  >([]);
  const [errorNowPlayingMovies, setErrorNowPlayingMovies] = useState<
    string | null
  >(null);

  useEffect(() => {
    // set bearer token in local storage on initial load
    // doing this for now as we do not have a login api to get access token.
    LocalStorageService.set("Bearer", process.env.NEXT_PUBLIC_ACCESS_TOKEN);

    const loadUpcomingMovies = async () => {
      setLoading(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("upcoming", 1); // Await the async function

      if (data && data.results.length > 0) {
        setUpcomingMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false); // End loading
    };
    loadUpcomingMovies();
    const loadTopRatedMovies = async () => {
      setLoadingTopRatedMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("top_rated", 1); // Await the async function

      if (data && data.results.length > 0) {
        setTopRatedMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorTopRatedMovies(message);
      }

      setLoadingTopRatedMovies(false); // End loading
    };
    loadTopRatedMovies();
    const loadMostPopularMovies = async () => {
      setLoadingMostPopularMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("popular", 1); // Await the async function

      if (data && data.results.length > 0) {
        setMostPopularMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorMostPopularMovies(message);
      }

      setLoadingMostPopularMovies(false); // End loading
    };
    loadMostPopularMovies();
    const loadNowPlayingMovies = async () => {
      setLoadingNowPlayingMovies(true); // Ensure loading starts

      const { data, error, message } = await fetchMovies("now_playing", 1); // Await the async function

      if (data && data.results.length > 0) {
        setNowPlayingMovies(data.results); // Ensure accessing `results` array
      }

      if (error && message) {
        setErrorNowPlayingMovies(message);
      }

      setLoadingNowPlayingMovies(false); // End loading
    };
    loadNowPlayingMovies();
  }, []);

  return (
    <>
      <Banner
        title="Welcome."
        subtitle="Millions of movies, TV shows and people to discover. Explore now."
        bannerImageUrl="https://i.ibb.co/Gv3qbkfg/pexels-ron-lach-9807277.jpg"
      />
      <h2>Upcoming Movies</h2>
      {loading && <p>Loading...</p>}
      <MovieCarousel movieList={upcomingMovies} />
      {error && <p>{error}</p>}
      <br />
      <h2>Top Rated Movies</h2>
      {loadingTopRatedMovies && <p>Loading...</p>}
      <MovieCarousel movieList={topRatedMovies} />
      {errorTopRatedMovies && <p>{errorTopRatedMovies}</p>}
      <br />
      <h2>Most Popular Movies</h2>
      {loadingMostPopularMovies && <p>Loading...</p>}
      <MovieCarousel movieList={mostPopularMovies} />
      {errorMostPopularMovies && <p>{errorMostPopularMovies}</p>}
      <br />
      <h2>Now Playing Movies</h2>
      {loadingNowPlayingMovies && <p>Loading...</p>}
      <MovieCarousel movieList={nowPlayingMovies} />
      {errorNowPlayingMovies && <p>{errorNowPlayingMovies}</p>}
    </>
  );
}
