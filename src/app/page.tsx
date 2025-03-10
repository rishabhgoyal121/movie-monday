"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const upcomingMoviesUrl =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const topRatedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const mostPopularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const nowPlayingMoviesUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const options = {
  method: "GET",
  url: upcomingMoviesUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState([
    {
      adult: false,
      backdrop_path: "/ek8CJRZchT9YIB4p7ktEjPXuCIi.jpg",
      genre_ids: [28, 53, 80],
      id: 1126166,
      original_language: "en",
      original_title: "Flight Risk",
      overview:
        "A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
      popularity: 333.328,
      poster_path: "/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
      release_date: "2025-01-22",
      title: "Flight Risk",
      video: false,
      vote_average: 6.1,
      vote_count: 414,
    },
    {
      adult: false,
      backdrop_path: "/sc1abgWNXc29wSBaerrjGBih06l.jpg",
      genre_ids: [27, 878, 53],
      id: 1084199,
      original_language: "en",
      original_title: "Companion",
      overview:
        "During a weekend getaway at a secluded lakeside estate, a group of friends finds themselves entangled in a web of secrets, deception, and advanced technology. As tensions rise and loyalties are tested, they uncover unsettling truths about themselves and the world around them.",
      popularity: 128.04,
      poster_path: "/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
      release_date: "2025-01-22",
      title: "Companion",
      video: false,
      vote_average: 7,
      vote_count: 710,
    },
    {
      adult: false,
      backdrop_path: "/b3mdmjYTEL70j7nuXATUAD9qgu4.jpg",
      genre_ids: [16, 14, 12],
      id: 823219,
      original_language: "lv",
      original_title: "Straume",
      overview:
        "A solitary cat, displaced by a great flood, finds refuge on a boat with various species and must navigate the challenges of adapting to a transformed world together.",
      popularity: 173.824,
      poster_path: "/imKSymKBK7o73sajciEmndJoVkR.jpg",
      release_date: "2024-08-29",
      title: "Flow",
      video: false,
      vote_average: 8.3,
      vote_count: 1432,
    },
  ]);
  const [loadingTopRatedMovies, setLoadingTopRatedMovies] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([
    {
      adult: false,
      backdrop_path: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
      genre_ids: [18, 80],
      id: 278,
      original_language: "en",
      original_title: "The Shawshank Redemption",
      overview:
        "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
      popularity: 29.053,
      poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      release_date: "1994-09-23",
      title: "The Shawshank Redemption",
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
      original_title: "The Godfather",
      overview:
        "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      popularity: 29.152,
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      release_date: "1972-03-14",
      title: "The Godfather",
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
      original_title: "Flight Risk",
      overview:
        "A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
      popularity: 333.328,
      poster_path: "/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
      release_date: "2025-01-22",
      title: "Flight Risk",
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
      original_title: "Anora",
      overview:
        "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.",
      popularity: 269.054,
      poster_path: "/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg",
      release_date: "2024-10-14",
      title: "Anora",
      video: false,
      vote_average: 7.1,
      vote_count: 1553,
    },
  ]);
  const [loadingNowPlayingMovies, setLoadingNowPlayingMovies] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([
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
      vote_average: 7.778,
      vote_count: 1768,
    },
    {
      adult: false,
      backdrop_path: "/ek8CJRZchT9YIB4p7ktEjPXuCIi.jpg",
      genre_ids: [28, 53, 80],
      id: 1126166,
      original_language: "en",
      original_title: "Flight Risk",
      overview:
        "A U.S. Marshal escorts a government witness to trial after he's accused of getting involved with a mob boss, only to discover that the pilot who is transporting them is also a hitman sent to assassinate the informant. After they subdue him, they're forced to fly together after discovering that there are others attempting to eliminate them.",
      popularity: 333.328,
      poster_path: "/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
      release_date: "2025-01-22",
      title: "Flight Risk",
      video: false,
      vote_average: 6.1,
      vote_count: 414,
    },
    {
      adult: false,
      backdrop_path: "/kEYWal656zP5Q2Tohm91aw6orlT.jpg",
      genre_ids: [18, 35, 10749],
      id: 1064213,
      original_language: "en",
      original_title: "Anora",
      overview:
        "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.",
      popularity: 269.054,
      poster_path: "/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg",
      release_date: "2024-10-14",
      title: "Anora",
      video: false,
      vote_average: 7.081,
      vote_count: 1554,
    },
  ]);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setUpcomingMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
      });
    axios
      .request({ ...options, url: mostPopularMoviesUrl })
      .then((res) => {
        console.log(res.data);
        setMostPopularMovies(res.data.results);
        setLoadingMostPopularMovies(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMostPopularMovies(false);
      });
    axios
      .request({ ...options, url: nowPlayingMoviesUrl })
      .then((res) => {
        console.log(res.data);
        setNowPlayingMovies(res.data.results);
        setLoadingNowPlayingMovies(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingNowPlayingMovies(false);
      });
  }, []);

  return (
    <>
      <h2>Upcoming Movies</h2>
      {loading && <p>Loading...</p>}
      {upcomingMovies.length > 0 &&
        upcomingMovies.map((movie) => {
          return <li key={movie.id}>{movie.original_title}</li>;
        })}
      <br />
      <h2>Top Rated Movies</h2>
      {loadingTopRatedMovies && <p>Loading...</p>}
      {topRatedMovies.length > 0 &&
        topRatedMovies.map((movie) => {
          return <li key={movie.id}>{movie.original_title}</li>;
        })}
      <br />
      <h2>Most Popular Movies</h2>
      {loadingMostPopularMovies && <p>Loading...</p>}
      {mostPopularMovies.length > 0 &&
        mostPopularMovies.map((movie) => {
          return <li key={movie.id}>{movie.original_title}</li>;
        })}
      <br />
      <h2>Now Playing Movies</h2>
      {loadingNowPlayingMovies && <p>Loading...</p>}
      {nowPlayingMovies.length > 0 &&
        nowPlayingMovies.map((movie) => {
          return <li key={movie.id}>{movie.original_title}</li>;
        })}
    </>
  );
}
