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
  const [loadingMostPopularTVShows, setLoadingMostPopularTVShows] =
    useState(true);
  const [mostPopularTVShows, setMostPopularTVShows] = useState<
    TVShow[] | null | undefined
  >(null);
  const [errorMostPopularTVShows, setErrorMostPopularTVShows] = useState<
    string | null | undefined
  >(null);

  useEffect(() => {
    async function loadData() {
      setLoadingMostPopularTVShows(true);
      const { message, data, error } = await fetchTVShows("popular", 1);
      setLoadingMostPopularTVShows(false);
      if (error) {
        setErrorMostPopularTVShows(message);
      } else {
        setMostPopularTVShows(data?.results);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <h2>Most Popular TV Shows</h2>
      {loadingMostPopularTVShows && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {mostPopularTVShows &&
            mostPopularTVShows.length > 0 &&
            mostPopularTVShows.map((tvShow) => {
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
      {errorMostPopularTVShows && <p>{errorMostPopularTVShows}</p>}
    </>
  );
}
