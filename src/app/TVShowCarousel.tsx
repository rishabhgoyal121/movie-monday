import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { TVShow } from "@/interfaces/tvShows";
import TMBDImage from "@/components/TMBDImage";

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
      className="w-full max-w-[95vw] mt-4"
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
                        <TMBDImage src={tvShow.poster_path} alt={tvShow.name} />
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
