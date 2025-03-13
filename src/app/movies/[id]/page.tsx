"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieDetails } from "@/interfaces/movies";
import { fetchMovieDetails } from "@/api/movies/movies.api";

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
  const [movieData, setMovieData] = useState<MovieDetails | undefined | null>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [movieCreditsData, setMovieCreditsData] = useState([
    {
      adult: false,
      gender: 2,
      id: 53650,
      known_for_department: "Acting",
      name: "Anthony Mackie",
      original_name: "Anthony Mackie",
      popularity: 15.695,
      profile_path: "/eZSIDrtTzhvabyjrmIITQLsjx8h.jpg",
      cast_id: 3,
      character: "Sam Wilson / Captain America",
      credit_id: "60833265126ec3003f25d17b",
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 3,
      known_for_department: "Acting",
      name: "Harrison Ford",
      original_name: "Harrison Ford",
      popularity: 13.432,
      profile_path: "/zVnHagUvXkR2StdOtquEwsiwSVt.jpg",
      cast_id: 18,
      character: "President Thaddeus Ross",
      credit_id: "634d8699c175b2007a5adc21",
      order: 1,
    }
  ]);
  const [errorCredits, setErrorCredits] = useState(null);

  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const moviesCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
      const loadMovieDetails = async () => {
        setLoading(true); // Ensure loading starts

        const { data, error, message } = await fetchMovieDetails(id); // Await the async function

        setMovieData(data);

        if (error && message) {
          setError(message);
        }

        setLoading(false); // End loading
      };
      loadMovieDetails();
      axios
        .request({ ...options, url: moviesCreditsUrl })
        .then((res) => {
          console.log(res.data);
          setMovieCreditsData(res.data.cast);
          setLoadingCredits(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoadingCredits(false);
          setErrorCredits(err.message);
        });
      return id;
    };
    getProps();
  }, [params]);

  return (
    <>
      <h2>Movie</h2>
      {loading && <p>Loading...</p>}
      {!loading && <p>{movieData && movieData.title}</p>}
      {!loading && <p>{movieData && movieData.tagline}</p>}
      {!loading && <p>{movieData&&movieData.overview}</p>}
      {error && <p>{error}</p>}
      <h2>Credits</h2>
      {loadingCredits && <p>Loading...</p>}
      {!loadingCredits && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[90vw] ml-16 mt-4"
        >
          <CarouselPrevious />
          <CarouselContent className="">
            {movieCreditsData.length > 0 &&
              movieCreditsData.map((actor) => {
                return (
                  <CarouselItem
                    key={actor.credit_id}
                    className="md:basis-1/6 lg:basis-1/9"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0 ">
                          <Link href={`/actors/${actor.id}`}>
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                              alt={actor.name}
                              height={160}
                              width={90}
                              layout="responsive"
                              className="rounded-xl"
                            />
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      )}
      {errorCredits && <p>{errorCredits}</p>}
    </>
  );
}
