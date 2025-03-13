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
import { fetchTVShowDetails, fetchTVShowCredits } from "@/api/tvShows/tvShows.api";
import { TVShowDetails, TVShowCredit } from "@/interfaces/tvShows";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [tvShowData, setTvShowData] = useState<
    TVShowDetails | null | undefined
  >(null);
  const [error, setError] = useState<string|null|undefined>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [tvShowCreditsData, setTvShowCreditsData] = useState<TVShowCredit[] | null | undefined>(null);
  const [errorCredits, setErrorCredits] = useState<string | null | undefined>(null);

  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const loadTVShowDetails = async () => {
        setLoading(true); // Ensure loading starts

        const { data, error, message } = await fetchTVShowDetails(id); // Await the async function

        setTvShowData(data);

        if (error && message) {
          setError(message);
        }

        setLoading(false); // End loading
      };
      loadTVShowDetails();
      const loadTVShowCredits = async () => {
        setLoadingCredits(true); // Ensure loading starts

        const { data, error, message } = await fetchTVShowCredits(id); // Await the async function

        setTvShowCreditsData(data?.cast);
        if (error && message) {
          setErrorCredits(message);
        }
        setLoadingCredits(false); // End loading
      };
      loadTVShowCredits();
      return id;
    };
    getProps();
  }, [params]);

  return (
    <>
      <h2>TV Show</h2>
      {loading && <p>Loading...</p>}
      {!loading && <p>{tvShowData && tvShowData.name}</p>}
      {!loading && <p>{tvShowData && tvShowData.tagline}</p>}
      {!loading && <p>{tvShowData && tvShowData.overview}</p>}
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
            {tvShowCreditsData&&tvShowCreditsData.length > 0 &&
              tvShowCreditsData.map((actor) => {
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
