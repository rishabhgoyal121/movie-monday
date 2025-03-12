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
      original_name: "Meet the Press",
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
      original_name: "Volta por Cima",
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
      original_name: "La Casa de los Famosos Colombia",
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
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {onTheAirTVShows.length > 0 &&
            onTheAirTVShows.map((tvShow) => {
              return (
                <CarouselItem
                  key={tvShow.id}
                  className="md:basis-1/6 lg:basis-1/9"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        <Link href={`/tvShows/${tvShow.id}`}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                            alt={tvShow.name}
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
      {errorOnTheAirTVShows && <p>{errorOnTheAirTVShows}</p>}
    </>
  );
}
