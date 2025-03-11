"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const mostPopularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  url: mostPopularMoviesUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page() {
  const [loadingMostPopularMovies, setLoadingMostPopularMovies] =
    useState(true);
  const [mostPopularMovies, setMostPopularMovies] = useState([
    {
      adult: false,
      backdrop_path: "/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
      genre_ids: [10749, 878, 53],
      id: 950396,
      original_language: "en",
      original_title: "The Gorge",
      overview:
        "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.",
      popularity: 350.678,
      poster_path: "/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg",
      release_date: "2025-02-13",
      title: "The Gorge",
      video: false,
      vote_average: 7.775,
      vote_count: 1765,
    },
    {
      adult: false,
      backdrop_path: "/ek8CJRZchT9YIB4p7ktEjPXuCIi.jpg",
      genre_ids: [28, 53, 80],
      id: 1126166,
      original_language: "en",
      title: "Flight Risk",
      overview:
        "A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
      popularity: 333.328,
      poster_path: "/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
      release_date: "2025-01-22",
      original_title: "Flight Risk",
      video: false,
      vote_average: 6.064,
      vote_count: 414,
    },
    {
      adult: false,
      backdrop_path: "/kEYWal656zP5Q2Tohm91aw6orlT.jpg",
      genre_ids: [18, 35, 10749],
      id: 1064213,
      original_language: "en",
      title: "Anora",
      overview:
        "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.",
      popularity: 269.054,
      poster_path: "/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg",
      release_date: "2024-10-14",
      original_title: "Anora",
      video: false,
      vote_average: 7.1,
      vote_count: 1553,
    },
  ]);
  const [errorMostPopularMovies, setErrorMostPopularMovies] = useState(null);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setMostPopularMovies(res.data.results);
        setLoadingMostPopularMovies(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMostPopularMovies(false);
        setErrorMostPopularMovies(err.message);
      });
  }, []);

  return (
    <>
      <h2>Most Popular Movies</h2>
      {loadingMostPopularMovies && <p>Loading...</p>}
      {mostPopularMovies.length > 0 &&
        mostPopularMovies.map((movie) => {
          return <li key={movie.id}><Link href={`/movies/${movie.id}`}>{movie.title}</Link></li>;
        })}
      {errorMostPopularMovies && <p>{errorMostPopularMovies}</p>}
    </>
  );
}
