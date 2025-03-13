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
  const [loadingOnTheAirTVShows, setLoadingOnTheAirTVShows] = useState(true);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState<
    TVShow[] | null | undefined
  >(null);
  const [errorOnTheAirTVShows, setErrorOnTheAirTVShows] = useState<
    string | undefined | null
  >(null);

  useEffect(() => {
    async function loadData() {
      setLoadingOnTheAirTVShows(true);
      const { data, error, message } = await fetchTVShows("on_the_air", 1);
      setLoadingOnTheAirTVShows(false);
      if (error) {
        setErrorOnTheAirTVShows(message);
      } else {
        setOnTheAirTVShows(data?.results);
      }
    }
    loadData();
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
          {onTheAirTVShows &&
            onTheAirTVShows.length > 0 &&
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
