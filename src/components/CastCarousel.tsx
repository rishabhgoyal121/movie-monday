import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import TMBDImage from "@/components/TMBDImage";
import type { TVShowCredit } from "@/interfaces/tvShows";

interface CastCarouselProps {
  cast: TVShowCredit[];
  loading: boolean;
  error?: string | null;
}

export default function CastCarousel({
  cast,
  loading,
  error,
}: CastCarouselProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/30 p-6 rounded-xl text-white mt-8 backdrop-blur-sm">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!cast || cast.length === 0) {
    return (
      <div className="bg-white/10 p-8 rounded-xl text-white backdrop-blur-sm">
        <p className="text-lg text-center">No cast information available.</p>
      </div>
    );
  }

  return (
    <div className="h-fit">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full mx-4"
      >
        <CarouselContent className="-ml-2 md:mx-8 overflow-x-hidden">
          {cast.map((actor) => (
            <CarouselItem
              key={actor.credit_id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="p-1">
                <Card className="bg-white/10 border-none backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                  <CardContent className="p-0 relative overflow-hidden">
                    <Link
                      href={`/actors/${actor.id}`}
                      className="block aspect-[2/3] w-full"
                    >
                      <TMBDImage
                        src={actor.profile_path}
                        alt={actor.name}
                        className="rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-lg mb-1 truncate">
                            {actor.name}
                          </h3>
                          <p className="text-gray-300 text-sm truncate">
                            {actor.character}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 transition-colors duration-300 -left-4" />
        <CarouselNext className="text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 transition-colors duration-300 -right-4" />
      </Carousel>
    </div>
  );
}
