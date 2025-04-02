import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/interfaces/movies";
import TMBDImage from "@/components/TMBDImage";

export default function MovieCarousel({
  movieList,
}: {
  movieList: Movie[] | null | undefined;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[85vw] mx-auto mt-4"
    >
      <CarouselPrevious />
      <CarouselContent className="w-full">
        {movieList &&
          movieList.length > 0 &&
          movieList.map((movie) => {
            return (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/6 lg:basis-1/9 w-full"
              >
                <div className="p-1">
                  <Card className=" w-full">
                    <Link href={`/movies/${movie.id}`} className=" w-full">
                      <CardContent className="flex aspect-square items-center justify-center p-0 w-full">
                        <TMBDImage src={movie.poster_path} alt={movie.title} />
                      </CardContent>
                    </Link>
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
