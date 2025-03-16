"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Movie } from "@/interfaces/movies";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#0060d199]">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(`${row.original.id}`)
              }
            >
              Copy movie ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/movies/${row.original.id}`}>View Movie Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
