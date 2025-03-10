"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const topRatedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const options = {
  method: "GET",
  url: topRatedMoviesUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page() {
  const [loadingTopRatedMovies, setLoadingTopRatedMovies] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([
    {
      adult: false,
      backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      genre_ids: [18, 80],
      id: 278,
      original_language: "en",
      title: "The Shawshank Redemption",
      overview:
        "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
      popularity: 29.053,
      poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      release_date: "1994-09-23",
      original_title: "The Shawshank Redemption",
      video: false,
      vote_average: 8.708,
      vote_count: 27852,
    },
    {
      adult: false,
      backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      genre_ids: [18, 80],
      id: 238,
      original_language: "en",
      title: "The Godfather",
      overview:
        "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      popularity: 29.152,
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      release_date: "1972-03-14",
      original_title: "The Godfather",
      video: false,
      vote_average: 8.7,
      vote_count: 21131,
    },
    {
      adult: false,
      backdrop_path: "/ixKQ55OL3S4Lm0wuKU0s09cVGpX.jpg",
      genre_ids: [28, 12, 53],
      id: 1356039,
      original_language: "es",
      original_title: "Contraataque",
      overview:
        "When a hostage rescue mission creates a new enemy, Capt. Guerrero and his elite soldiers must face an ambush by a criminal group.",
      popularity: 66.527,
      poster_path: "/lI2uFlSEkwXKljqiry7coaJ6wIS.jpg",
      release_date: "2025-02-27",
      title: "Counterattack",
      video: false,
      vote_average: 8.6,
      vote_count: 368,
    },
  ]);
  const [errorTopRatedMovies, setErrorTopRatedMovies] = useState(null);

  useEffect(() => {
    axios
      .request({ ...options, url: topRatedMoviesUrl })
      .then((res) => {
        console.log(res.data);
        setTopRatedMovies(res.data.results);
        setLoadingTopRatedMovies(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingTopRatedMovies(false);
        setErrorTopRatedMovies(err.message);
      });
  }, []);

  return (
    <>
      <h2>Top Rated Movies</h2>
      {loadingTopRatedMovies && <p>Loading...</p>}
      {topRatedMovies.length > 0 &&
        topRatedMovies.map((movie) => {
          return <li key={movie.id}>{movie.title}</li>;
        })}
      {errorTopRatedMovies && <p>{errorTopRatedMovies}</p>}
    </>
  );
}
