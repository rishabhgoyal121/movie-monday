"use client";
import axios from "axios";
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
  const [movieData, setMovieData] = useState({
    adult: false,
    backdrop_path: "/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
    belongs_to_collection: null,
    budget: 0,
    genres: [
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 53,
        name: "Thriller",
      },
    ],
    homepage: "https://tv.apple.com/movie/umc.cmc.26o403koqo2klixc0jtqy6tmc",
    id: 950396,
    imdb_id: "tt13654226",
    origin_country: ["US"],
    original_language: "en",
    original_title: "The Gorge",
    overview:
      "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.",
    popularity: 350.678,
    poster_path: "/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg",
    production_companies: [
      {
        id: 82819,
        logo_path: "/gXfFl9pRPaoaq14jybEn1pHeldr.png",
        name: "Skydance Media",
        origin_country: "US",
      },
      {
        id: 162439,
        logo_path: "/h9hG1svKeylr9KqUOGmO4i3wRP0.png",
        name: "Crooked Highway",
        origin_country: "US",
      },
      {
        id: 194232,
        logo_path: "/oE7H93u8sy5vvW5EH3fpCp68vvB.png",
        name: "Apple Studios",
        origin_country: "US",
      },
    ],
    production_countries: [
      {
        iso_3166_1: "US",
        name: "United States of America",
      },
    ],
    release_date: "2025-02-13",
    revenue: 0,
    runtime: 127,
    spoken_languages: [
      {
        english_name: "English",
        iso_639_1: "en",
        name: "English",
      },
      {
        english_name: "Lithuanian",
        iso_639_1: "lt",
        name: "Lietuvių",
      },
    ],
    status: "Released",
    tagline: "The world's most dangerous secret lies between them.",
    title: "The Gorge",
    video: false,
    vote_average: 7.777,
    vote_count: 1774,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const moviesUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      axios
        .request({ ...options, url: moviesUrl })
        .then((res) => {
          console.log(res.data);
          setMovieData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoading(false);
          setError(err.message);
        });
      return id;
    };
    getProps();
  }, [params]);

  return (
    <>
      <h2>Movie</h2>
      {loading && <p>Loading...</p>}
      {!loading && <p>{movieData.title}</p>}
      {!loading && <p>{movieData.tagline}</p>}
      {!loading && <p>{movieData.overview}</p>}
      {error && <p>{error}</p>}
    </>
  );
}
