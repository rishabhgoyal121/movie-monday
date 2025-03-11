"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [actorData, setActorData] = useState({
    adult: false,
    also_known_as: [" Mikaela Madison Rosberg", "미키 매디슨", "مایکی مدیسون"],
    biography:
      "Mikaela Madison Rosberg (born March 25, 1999), known professionally as Mikey Madison, is an American actress. She began her career acting in short films and received recognition for her role as a sullen teenager in the FX comedy series Better Things (2016–2022). Madison then played Susan Atkins in Quentin Tarantino's Once Upon a Time in Hollywood (2019) and Amber Freeman in Scream (2022).\n\nFor her breakthrough role as a sex worker in Sean Baker's film Anora (2024), Madison earned several accolades, including the BAFTA and Academy Award for Best Actress.\n\nDescription above from the Wikipedia article Mikey Madison, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
    birthday: "1999-03-25",
    deathday: null,
    gender: 1,
    homepage: null,
    id: 1640439,
    imdb_id: "nm5700898",
    known_for_department: "Acting",
    name: "Mikey Madison",
    place_of_birth: "Los Angeles, California, USA",
    popularity: 37.859,
    profile_path: "/drny5M0foZpJfaee6Kh0L4Ox8xg.jpg",
  });
  const [error, setError] = useState(null);
  const [loadingMovieCredits, setLoadingMovieCredits] = useState(true);
  const [movieCredits, setMovieCredits] = useState([
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [35],
      id: 1076132,
      original_language: "en",
      original_title: "Pitch",
      overview:
        'Two NYU film grads, hot off the success of their smash hit student film, prepare to pitch their big action movie to a film studio in hopes of making the leap to "the next level."',
      popularity: 0.461,
      poster_path: "/wreG0gU1ik37fCkQw7PJ9gV27UT.jpg",
      release_date: "2006-05-17",
      title: "Pitch",
      video: false,
      vote_average: 2,
      vote_count: 1,
      character: "Alex",
      credit_id: "63c8e02e7a97ab007b62fa26",
      order: 3,
    },
    {
      adult: false,
      backdrop_path: "/ugiV9SpJburMOPeIyjBJyAnO1So.jpg",
      genre_ids: [12, 14, 10751],
      id: 32657,
      original_language: "en",
      original_title: "Percy Jackson & the Olympians: The Lightning Thief",
      overview:
        "Accident prone teenager, Percy discovers he's actually a demi-God, the son of Poseidon, and he is needed when Zeus' lightning is stolen. Percy must master his new found skills in order to prevent a war between the Gods that could devastate the entire world.",
      popularity: 12.049,
      poster_path: "/brzpTyZ5bnM7s53C1KSk1TmrMO6.jpg",
      release_date: "2010-02-01",
      title: "Percy Jackson & the Olympians: The Lightning Thief",
      video: false,
      vote_average: 6.21,
      vote_count: 7524,
      character: "Annabeth Chase",
      credit_id: "52fe44e29251416c910201d7",
      order: 2,
    }
  ]);
  const [errorMovieCredits, setErrorMovieCredits] = useState(null);
  const [loadingTVShowCredits, setLoadingTVShowCredits] = useState(true);
  const [TVShowCredits, setTVShowCredits] = useState([
    {
      adult: false,
      backdrop_path: "/lNpkvX2s8LGB0mjGODMT4o6Up7j.jpg",
      genre_ids: [18],
      id: 1398,
      origin_country: ["US"],
      original_language: "en",
      original_name: "The Sopranos",
      overview:
        "The story of New Jersey-based Italian-American mobster Tony Soprano and the difficulties he faces as he tries to balance the conflicting requirements of his home life and the criminal organization he heads. Those difficulties are often highlighted through his ongoing professional relationship with psychiatrist Jennifer Melfi. The show features Tony's family members and Mafia associates in prominent roles and story arcs, most notably his wife Carmela and his cousin and protégé Christopher Moltisanti.",
      popularity: 47.815,
      poster_path: "/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
      first_air_date: "1999-01-10",
      name: "The Sopranos",
      vote_average: 8.7,
      vote_count: 2875,
      character: "Another Woman",
      credit_id: "5256c87119c2956ff6044dcb",
      episode_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/4uWvmON2pqDJtpPAsHMggdDFFrn.jpg",
      genre_ids: [80, 18],
      id: 549,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Law & Order",
      overview:
        "In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
      popularity: 102.442,
      poster_path: "/6vFL8S6Cci8s7SHWXz60xOisGBC.jpg",
      first_air_date: "1990-09-13",
      name: "Law & Order",
      vote_average: 7.4,
      vote_count: 603,
      character: "Felicia",
      credit_id: "5253842719c29579401fb271",
      episode_count: 1,
    }
  ]);
  const [errorTVShowCredits, setErrorTVShowCredits] = useState(null);
  
  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const actorsUrl = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
      const movieCreditsUrl = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
      const TVShowCreditsUrl = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`;
      axios
        .request({ ...options, url: actorsUrl })
        .then((res) => {
          console.log(res.data);
          setActorData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoading(false);
          setError(err.message);
        });
      axios
        .request({ ...options, url: movieCreditsUrl })
        .then((res) => {
          console.log(res.data);
          setMovieCredits(res.data.cast);
          setLoadingMovieCredits(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoadingMovieCredits(false);
          setErrorMovieCredits(err.message);
        });
      axios
        .request({ ...options, url: TVShowCreditsUrl })
        .then((res) => {
          console.log(res.data);
          setTVShowCredits(res.data.cast);
          setLoadingTVShowCredits(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoadingTVShowCredits(false);
          setErrorTVShowCredits(err.message);
        });
      return id;

    }
    getProps();
  }, [params]);

  return (
    <>
      <h2>Actor</h2>
      {loading && <p>Loading...</p>}
      {!loading && <p>{actorData.name}</p>}
      {!loading && <p>{actorData.biography}</p>}
      {error && <p>{error}</p>}
      <h2>Movie Credits</h2>
      {loadingMovieCredits && <p>Loading...</p>}
      {!loadingMovieCredits &&
        movieCredits.map((movie) => {
          return (
            <li key={movie.credit_id}>
              <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      {errorMovieCredits && <p>{errorMovieCredits}</p>}
      <h2>TV Show Credits</h2>
      {loadingTVShowCredits && <p>Loading...</p>}
      {!loadingTVShowCredits &&
        TVShowCredits.map((TVShow) => {
          return (
            <li key={TVShow.credit_id}>
              <Link href={`/tvShows/${TVShow.id}`}>{TVShow.name}</Link>
            </li>
          );
        })}
      {errorTVShowCredits && <p>{errorTVShowCredits}</p>}
    </>
  );
}
