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
  if (!movieList || movieList.length === 0) {
    return (
      <div className="w-full max-w-[85vw] mx-auto mt-4 text-center p-8">
        <p className="text-gray-500">No movies available to display</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[85vw] mx-auto mt-4"
    >
      <CarouselPrevious />
      <CarouselContent className="w-full">
        {movieList.map((movie) => {
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
