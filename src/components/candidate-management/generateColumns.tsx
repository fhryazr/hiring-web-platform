import type { ColumnDef } from "@tanstack/react-table";
import type { Candidate } from "@/types/candidateTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export function generateCandidateColumns(
  candidates: Candidate[]
): ColumnDef<Candidate>[] {
  // Ambil semua attribute yang mungkin ada dari kandidat pertama
  const allAttributes = candidates[0]?.attributes ?? [];

  // Susun kolom awal: checkbox select
  const baseColumns: ColumnDef<Candidate>[] = [
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
      enableSorting: false,
      enableResizing: false,
      enableHiding: false,
      size: 10,
    },
  ];

  const dynamicColumns: ColumnDef<Candidate>[] = allAttributes
    .filter((attr) => attr.key !== "photo_profile") // abaikan kolom photo_profile
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((attr) => ({
      id: attr.key,
      header: ({ column }) => (
        <div className="flex items-center">
          <p>{attr.label}</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4 hover:cursor-pointer text-neutral-50 hover:text-neutral-90"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      accessorFn: (row) =>
        row.attributes.find((a) => a.key === attr.key)?.value ?? "-",
    }));

  return [...baseColumns, ...dynamicColumns];
}
