"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Movie } from "@/interfaces/movies";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (row) => {
      const title = row.getValue() as string;
      return (
        <div className="w-36">
          <Link href={`/movies/${row.row.original.id}`}>
            <span>{title}</span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "poster_path",
    header: "Poster",
    cell: (row) => {
      const poster_path = row.getValue();
      return (
        <div className="w-36">
          <Link href={`/movies/${row.row.original.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={row.row.original.title}
              height={160}
              width={90}
              layout="responsive"
              className="rounded-xl"
            />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "popularity",
    header: "Popularity",
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
  },
  {
    accessorKey: "vote_count",
    header: "No. Of Votes",
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
  },
];
