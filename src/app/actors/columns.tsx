"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Actor } from "@/interfaces/actors";
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
import TMBDImage from "@/components/TMBDImage";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<Actor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (row) => {
      const name = row.getValue() as string;
      return (
        <div className="w-36">
          <Link href={`/actors/${row.row.original.id}`} className="hover:text-blue-400 transition-colors">
            <span className="font-medium">{name}</span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "profile_path",
    header: "Profile",
    cell: (row) => {
      const profile_path = row.getValue() as string;
      return (
        <div className="w-36">
          {profile_path && (
            <Link href={`/actors/${row.row.original.id}`} className="block hover:opacity-90 transition-opacity">
              <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <TMBDImage
                  src={profile_path}
                  alt={row.row.original.name}
                />
              </div>
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
              Copy actor ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
              <Link href={`/actors/${row.original.id}`} className="w-full">View Actor Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
