import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/interfaces/movies";

export default function MovieCarousel({ movieList }: { movieList: Movie[]|null|undefined }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[90vw] ml-16 mt-4"
    >
      <CarouselPrevious />
      <CarouselContent className="">
        {movieList &&
          movieList.length > 0 &&
          movieList.map((movie) => {
            return (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/6 lg:basis-1/9"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 ">
                      <Link href={`/movies/${movie.id}`}>
                        {movie.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                            height={160}
                            width={90}
                            layout="responsive"
                            className="rounded-xl"
                          />
                        ) : (
                          <p>{movie.title}</p>
                        )}
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
  );
}
