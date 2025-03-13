"use client";
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
import { fetchTVShows } from "@/api/tvShows/tvShows.api";
import { TVShow } from "@/interfaces/tvShows";

export default function Page() {
  const [loadingTopRatedTVShows, setLoadingTopRatedTVShows] = useState(true);
  const [topRatedTVShows, setTopRatedTVShows] = useState<
    TVShow[] | null | undefined
  >(null);
  const [errorTopRatedTVShows, setErrorTopRatedTVShows] = useState<
    string | undefined | null
  >(null);

  useEffect(() => {
    async function loadData() {
      setLoadingTopRatedTVShows(true);
      const { data, error, message } = await fetchTVShows("top_rated", 1);
      setLoadingTopRatedTVShows(false);
      if (error) {
        setErrorTopRatedTVShows(message);
      } else {
        setTopRatedTVShows(data?.results);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <h2>Top Rated TV Shows</h2>
      {loadingTopRatedTVShows && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {topRatedTVShows &&
            topRatedTVShows.length > 0 &&
            topRatedTVShows.map((tvShow) => {
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
      {errorTopRatedTVShows && <p>{errorTopRatedTVShows}</p>}
    </>
  );
}
