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
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    // header: "Title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (row) => {
      const title = row.getValue() as string;
      return (
        <div className="w-36">
          <Link href={`/movies/${row.row.original.id}`} className="hover:text-blue-400 transition-colors">
            <span className="font-medium">{title}</span>
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
            <Link href={`/movies/${row.row.original.id}`} className="block hover:opacity-90 transition-opacity">
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt={row.row.original.title}
                height={160}
                width={90}
                layout="responsive"
                className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
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
    cell: ({ row }) => {
      const popularity = row.getValue("popularity") as number;
      return <div className="font-medium">{popularity.toFixed(1)}</div>;
    },
  },
  {
    accessorKey: "vote_average",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("vote_average") as number;
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-yellow-400">★</span>
        </div>
      );
    },
  },
  {
    accessorKey: "vote_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Votes" />
    ),
    cell: ({ row }) => {
      const votes = row.getValue("vote_count") as number;
      return <div className="font-medium">{votes.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("release_date") as string;
      return <div className="font-medium">{new Date(date).toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${row.original.id}`)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Copy movie ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
              <Link href={`/movies/${row.original.id}`} className="w-full">View Movie Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
