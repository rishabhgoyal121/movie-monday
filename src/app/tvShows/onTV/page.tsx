"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const onTheAirTVShowsUrl =
  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1";
const options = {
  method: "GET",
  url: onTheAirTVShowsUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page() {
  const [loadingOnTheAirTVShows, setLoadingOnTheAirTVShows] = useState(true);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState([
    {
      adult: false,
      backdrop_path: "/bWCAkYs4Sd8MOYHkzwbhrw2lgWh.jpg",
      genre_ids: [10763, 10767],
      id: 4496,
      origin_country: ["US"],
      original_language: "en",
      name: "Meet the Press",
      overview:
        "Meet the Press is a weekly American television news/interview program airing on NBC. It is the longest-running television series in American broadcasting history, despite bearing little resemblance to the original format of the program seen in its television debut on November 6, 1947. Meet the Press is the highest-rated of the American television Sunday morning talk shows.\n\nIt has been hosted by 11 moderators, beginning with Martha Rountree.  Meet the Press and similar shows specialize in interviewing national leaders on issues of politics, economics, foreign policy and other public affairs.",
      popularity: 1725.089,
      poster_path: "/lisjDmT2xTykSZxCNvd7E3gQ9AI.jpg",
      first_air_date: "1947-11-06",
      name: "Meet the Press",
      vote_average: 3.583,
      vote_count: 12,
    },
    {
      adult: false,
      backdrop_path: "/j5CR0gFPjwgmAXkV9HGaF4VMjIW.jpg",
      genre_ids: [10766, 18, 35],
      id: 257064,
      origin_country: ["BR"],
      original_language: "pt",
      name: "Volta por Cima",
      overview: "",
      popularity: 2461.871,
      poster_path: "/nyN8R0P1Hqwq7ksJz4O2BIAUd4W.jpg",
      first_air_date: "2024-09-30",
      name: "Volta por Cima",
      vote_average: 5.5,
      vote_count: 17,
    },
    {
      adult: false,
      backdrop_path: "/hifVroEnB9m6vTDXeqCeKfrp7Q3.jpg",
      genre_ids: [10764],
      id: 240909,
      origin_country: ["CO"],
      original_language: "es",
      name: "La Casa de los Famosos Colombia",
      overview: "",
      popularity: 2266.389,
      poster_path: "/xCvZ0H1RiWhU6yFtzRJL3PSI2jF.jpg",
      first_air_date: "2024-02-11",
      name: "La Casa de los Famosos Colombia",
      vote_average: 6.4,
      vote_count: 28,
    },
  ]);
  const [errorOnTheAirTVShows, setErrorOnTheAirTVShows] = useState(null);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setOnTheAirTVShows(res.data.results);
        setLoadingOnTheAirTVShows(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingOnTheAirTVShows(false);
        setErrorOnTheAirTVShows(err.message);
      });
  }, []);

  return (
    <>
      <h2>On the Air TV Shows</h2>
      {loadingOnTheAirTVShows && <p>Loading...</p>}
      {onTheAirTVShows.length > 0 &&
        onTheAirTVShows.map((tvShow) => {
          return <li key={tvShow.id}>{tvShow.name}</li>;
        })}
      {errorOnTheAirTVShows && <p>{errorOnTheAirTVShows}</p>}
    </>
  );
}
