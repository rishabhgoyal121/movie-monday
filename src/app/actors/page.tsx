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
import type { Actor } from "@/interfaces/actors";
import { fetchActors } from "@/api/actors/actors.api";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<Actor[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActors = async () => {
      setLoading(true); // Ensure loading starts

      const { data, error, message } = await fetchActors(1); // Await the async function

      if (data && data.results.length > 0) {
        setActors(data.results);
      }

      if (error && message) {
        setError(message);
      }

      setLoading(false); // End loading
    };
    loadActors();
  }, []);

  return (
    <>
      <h2>Actors</h2>
      {loading && <p>Loading...</p>}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[90vw] ml-16 mt-4"
      >
        <CarouselPrevious />
        <CarouselContent className="">
          {actors &&
            actors.length > 0 &&
            actors.map((actor) => {
              return (
                <CarouselItem
                  key={actor.id}
                  className="md:basis-1/6 lg:basis-1/9"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        <Link href={`/actors/${actor.id}`}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
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
      {error && <p>{error}</p>}
    </>
  );
}
