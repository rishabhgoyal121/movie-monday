"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([
      {
        backdrop_path: "/32iRX9xqNH3ErJN6FowxdtgYmiY.jpg",
        id: 30801,
        name: "2 Days and 1 Night",
        original_name: "1박 2일",
        overview:
          '2 Days & 1 Night is a South Korean reality-variety show with the motto "real wild road variety." Its main concept is to recommend various places of interest that viewers can visit in South Korea.',
        poster_path: "/qezeCEkIKHQM5iwyVeYBuXmYA2h.jpg",
        media_type: "tv",
        adult: false,
        original_language: "ko",
        genre_ids: [35, 10764],
        popularity: 544.819,
        first_air_date: "2007-08-05",
        vote_average: 7.4,
        vote_count: 24,
        origin_country: ["KR"],
      },
      {
        backdrop_path: "/3EGjqKhVHGsvNHvBIbxmqS17Aal.jpg",
        id: 224,
        name: "Match of the Day",
        original_name: "Match of the Day",
        overview:
          'BBC\'s football highlights and analysis.\n\n"The longest-running football television programme in the world" as recognised by Guinness World Records in 2015.',
        poster_path: "/paRFRd11WlFOxVbGnzjjCBym7FW.jpg",
        media_type: "tv",
        adult: false,
        original_language: "en",
        genre_ids: [10767, 10763],
        popularity: 338.191,
        first_air_date: "1964-08-22",
        vote_average: 7.4,
        vote_count: 43,
        origin_country: ["GB"],
      }
    ]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    useEffect(() => {
      axios
        .request({
          ...options,
          url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        })
        .then((res) => {
          console.log(res.data);
          setSearchResults(res.data.results);
        })
        .catch((err) => console.error(err));
    }, [query]);
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setIsSearchFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsSearchFocused(false), 100);
          }}
          {...props}
        />
        {isSearchFocused && (
          <div className="bg-[#3f638361] rounded-b-xl">
            {searchResults &&
              searchResults.map((result) => {
                return (
                  <Link
                    href={`/${
                      result.media_type === "movie"
                        ? "movies"
                        : result.media_type === "tv"
                        ? "tvShows"
                        : "actors"
                    }/${result.id}`}
                    key={result.id}
                  >
                    <li className="hover:bg-[#315677b8]">
                      {result.media_type === "movie"
                        ? (result as { title?: string }).title
                        : result.name}
                    </li>
                  </Link>
                );
              })}
          </div>
        )}
      </>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
