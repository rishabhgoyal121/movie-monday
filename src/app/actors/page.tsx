"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const actorsUrl =
  "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

const options = {
  method: "GET",
  url: actorsUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([
    {
      adult: false,
      gender: 1,
      id: 1640439,
      known_for_department: "Acting",
      name: "Mikey Madison",
      original_name: "Mikey Madison",
      popularity: 37.859,
      profile_path: "/drny5M0foZpJfaee6Kh0L4Ox8xg.jpg",
      known_for: [
        {
          backdrop_path: "/kEYWal656zP5Q2Tohm91aw6orlT.jpg",
          id: 1064213,
          title: "Anora",
          original_title: "Anora",
          overview:
            "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.",
          poster_path: "/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [18, 35, 10749],
          popularity: 269.054,
          release_date: "2024-10-14",
          video: false,
          vote_average: 7.1,
          vote_count: 1558,
        },
        {
          backdrop_path: "/xwgBHC2FgoIrQitl8jZwXXdsR9u.jpg",
          id: 466272,
          title: "Once Upon a Time... in Hollywood",
          original_title: "Once Upon a Time... in Hollywood",
          overview:
            "Los Angeles, 1969. TV star Rick Dalton, a struggling actor specializing in westerns, and stuntman Cliff Booth, his best friend, try to survive in a constantly changing movie industry. Dalton is the neighbor of the young and promising actress and model Sharon Tate, who has just married the prestigious Polish director Roman Polanski…",
          poster_path: "/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [35, 18, 53],
          popularity: 11.381,
          release_date: "2019-07-24",
          video: false,
          vote_average: 7.4,
          vote_count: 13710,
        },
        {
          backdrop_path: "/ifUfE79O1raUwbaQRIB7XnFz5ZC.jpg",
          id: 646385,
          title: "Scream",
          original_title: "Scream",
          overview:
            "Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask and begins targeting a group of teenagers to resurrect secrets from the town’s deadly past.",
          poster_path: "/1m3W6cpgwuIyjtg5nSnPx7yFkXW.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [27, 9648],
          popularity: 10.127,
          release_date: "2022-01-12",
          video: false,
          vote_average: 6.7,
          vote_count: 3399,
        },
      ],
    },
    {
      adult: false,
      gender: 1,
      id: 109513,
      known_for_department: "Acting",
      name: "Alexandra Daddario",
      original_name: "Alexandra Daddario",
      popularity: 36.361,
      profile_path: "/lh5zibQXYH1MNqkuX8TmxyNYHhK.jpg",
      known_for: [
        {
          backdrop_path: "/zcySy6dnSmyqiichtDgO7AEeZoq.jpg",
          id: 254128,
          title: "San Andreas",
          original_title: "San Andreas",
          overview:
            "In the aftermath of a massive earthquake in California, a rescue-chopper pilot makes a dangerous journey across the state in order to rescue his estranged daughter.",
          poster_path: "/2Gfjn962aaFSD6eST6QU3oLDZTo.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 18, 53],
          popularity: 10.484,
          release_date: "2015-05-27",
          video: false,
          vote_average: 6.245,
          vote_count: 8636,
        },
        {
          backdrop_path: "/ugiV9SpJburMOPeIyjBJyAnO1So.jpg",
          id: 32657,
          title: "Percy Jackson & the Olympians: The Lightning Thief",
          original_title: "Percy Jackson & the Olympians: The Lightning Thief",
          overview:
            "Accident prone teenager, Percy discovers he's actually a demi-God, the son of Poseidon, and he is needed when Zeus' lightning is stolen. Percy must master his new found skills in order to prevent a war between the Gods that could devastate the entire world.",
          poster_path: "/brzpTyZ5bnM7s53C1KSk1TmrMO6.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [12, 14, 10751],
          popularity: 12.049,
          release_date: "2010-02-01",
          video: false,
          vote_average: 6.21,
          vote_count: 7524,
        },
        {
          backdrop_path: "/6QmX2BDVr1hIOIPHqnxvp1C1ZZp.jpg",
          id: 339846,
          title: "Baywatch",
          original_title: "Baywatch",
          overview:
            "Devoted lifeguard Mitch Buchannon butts heads with a brash new recruit. Together, they uncover a local criminal plot that threatens the future of the Bay.",
          poster_path: "/6HE4xd8zloDqmjMZuhUCCw2UcY1.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [35, 28, 80],
          popularity: 8.953,
          release_date: "2017-05-25",
          video: false,
          vote_average: 6.091,
          vote_count: 8129,
        },
      ],
    },
    {
      adult: false,
      gender: 2,
      id: 1190668,
      known_for_department: "Acting",
      name: "Timothée Chalamet",
      original_name: "Timothée Chalamet",
      popularity: 33.176,
      profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
      known_for: [
        {
          backdrop_path: "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
          id: 438631,
          title: "Dune",
          original_title: "Dune",
          overview:
            "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
          poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [878, 12],
          popularity: 20.906,
          release_date: "2021-09-15",
          video: false,
          vote_average: 7.8,
          vote_count: 13269,
        },
        {
          backdrop_path: "/24Ov8wnusgnzXwjV1eDm0Lzo5da.jpg",
          id: 693134,
          title: "Dune: Part Two",
          original_title: "Dune: Part Two",
          overview:
            "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
          poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [878, 12],
          popularity: 32,
          release_date: "2024-02-27",
          video: false,
          vote_average: 8.1,
          vote_count: 6386,
        },
        {
          backdrop_path: "/zvOJawrnmgK0sL293mOXOdLvTXQ.jpg",
          id: 398818,
          title: "Call Me by Your Name",
          original_title: "Call Me by Your Name",
          overview:
            "In 1980s Italy, a relationship begins between seventeen-year-old teenage Elio and the older adult man hired as his father's research assistant.",
          poster_path: "/gXiE0WveDnT0n5J4sW9TMxXF4oT.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [10749, 18],
          popularity: 13.017,
          release_date: "2017-07-28",
          video: false,
          vote_average: 8.1,
          vote_count: 12221,
        },
      ],
    }
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setActors(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("err", err);
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <h2>Actors</h2>
      {loading && <p>Loading...</p>}
      {actors.length > 0 &&
        actors.map((actor) => {
          return <li key={actor.id}>{actor.name}</li>;
        })}
      {error && <p>{error}</p>}
    </>
  );
}
