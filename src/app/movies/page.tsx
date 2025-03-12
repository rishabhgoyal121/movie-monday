"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

const upcomingMoviesUrl =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const options = {
  method: "GET",
  url: upcomingMoviesUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState([
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
      vote_average: 6.1,
      vote_count: 414,
    },
    {
      adult: false,
      backdrop_path: "/sc1abgWNXc29wSBaerrjGBih06l.jpg",
      genre_ids: [27, 878, 53],
      id: 1084199,
      original_language: "en",
      title: "Companion",
      overview:
        "During a weekend getaway at a secluded lakeside estate, a group of friends finds themselves entangled in a web of secrets, deception, and advanced technology. As tensions rise and loyalties are tested, they uncover unsettling truths about themselves and the world around them.",
      popularity: 128.04,
      poster_path: "/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
      release_date: "2025-01-22",
      original_title: "Companion",
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
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    vote_average: 0,
  });

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setUpcomingMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("err", err);
        setLoading(false);
        setError(err.message);
      });
  });

  return (
    <>
      <h2>Upcoming Movies</h2>
      {loading && <p>Loading...</p>}
      <div className="flex">
        <div className="w-[20vw] border">
          Filters
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Rating?</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <Slider
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    className="p-2"
                    onValueCommit={(value) => {
                      setFilters((f) => {
                        return { ...f, vote_average: value[0] };
                      });
                    }}
                  />
                  <span className="mx-auto text-lg">
                    {filters.vote_average}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-[80vw] flex flex-wrap">
          {upcomingMovies.length > 0 &&
            upcomingMovies.map((movie) => {
              return (
                <div className="flex px-2 py-8 w-44" key={movie.id}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 ">
                      <Link href={`/movies/${movie.id}`}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                          height={160}
                          width={90}
                          layout="responsive"
                          className="rounded-xl"
                        />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
