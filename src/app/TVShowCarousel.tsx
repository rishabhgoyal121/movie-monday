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
import { TVShow } from "@/interfaces/tvShows";

export default function TVShowCarousel({
  tvShowList,
}: {
  tvShowList: TVShow[] | null | undefined;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[90vw] ml-16 mt-4"
    >
      <CarouselPrevious />
      <CarouselContent className="">
        {tvShowList &&
          tvShowList.length > 0 &&
          tvShowList.map((tvShow) => {
            return (
              <CarouselItem
                key={tvShow.id}
                className="md:basis-1/6 lg:basis-1/9"
              >
                <div className="p-1">
                  <Card>
                    <Link href={`/tvShows/${tvShow.id}`}>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        {tvShow.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                            alt={tvShow.name}
                            height={160}
                            width={90}
                            layout="responsive"
                            className="rounded-xl"
                          />
                        ) : (
                          <p className="text-center font-semibold">
                            {tvShow.name}
                          </p>
                        )}
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
