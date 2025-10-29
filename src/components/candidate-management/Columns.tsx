import type { Candidate } from "@/types/candidateTypes";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Candidate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 10,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Nama lengkap</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Email</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    id: "phone_number",
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Phone Number</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "date_of_birth",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Date of birth</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "domicile",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Domicile</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Gender</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "linkedin",
    header: ({ column }) => {
      return (
        <div className="flex">
          <p>Linkedin</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
];
