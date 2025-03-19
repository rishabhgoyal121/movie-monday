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
// import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<Actor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    //TODO - fix column header error
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} name="Name" />
    // ),
    cell: (row) => {
      const name = row.getValue() as string;
      return (
        <div className="w-36">
          <Link href={`/actors/${row.row.original.id}`}>
            <span>{name}</span>
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
            <Link href={`/actors/${row.row.original.id}`}>
              <TMBDImage
                src={profile_path}
                alt={row.row.original.name}
              />
            </Link>
          )}
        </div>
      );
    },
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
              Copy actor ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/actors/${row.original.id}`}>View Actor Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
