"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { TVShow } from "@/interfaces/tvShows";
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
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<TVShow>[] = [
  {
    accessorKey: "name",
    // header: "Title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (row) => {
      const title = row.getValue() as string;
      return (
        <div className="w-36">
          <Link href={`/tvShows/${row.row.original.id}`}>
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
      const poster_path = row.getValue() as string;
      return (
        <div className="w-36">
          {poster_path && (
            <Link href={`/tvShows/${row.row.original.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt={row.row.original.name}
                height={160}
                width={90}
                layout="responsive"
                className="rounded-xl"
              />
            </Link>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "popularity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Popularity" />
    ),
  },
  {
    accessorKey: "vote_average",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
  },
  {
    accessorKey: "vote_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Votes" />
    ),
  },
  {
    accessorKey: "first_air_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Air Date" />
    ),
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
              Copy tvShow ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/tvShows/${row.original.id}`}>View TVShow Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
