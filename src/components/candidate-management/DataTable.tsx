import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Header,
  type SortingState,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { GripVertical } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnOrder, setColumnOrder] = useState(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns.map((col) => col.id ?? (col as any).accessorKey ?? "")
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { columnOrder, sorting, rowSelection },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 3,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const lockedId = "select"; // id yang tidak boleh digeser
    const lockedIndex = columnOrder.indexOf(lockedId);

    setColumnOrder((oldOrder) => {
      const oldIndex = oldOrder.indexOf(active.id);
      const newIndex = oldOrder.indexOf(over.id);

      if (active.id === lockedId || over.id === lockedId) return oldOrder;

      if (
        (oldIndex < lockedIndex && newIndex >= lockedIndex) || // dari kiri ke kanan melewati select
        (oldIndex > lockedIndex && newIndex <= lockedIndex) // dari kanan ke kiri melewati select
      ) {
        return oldOrder;
      }

      return arrayMove(oldOrder, oldIndex, newIndex);
    });
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={columnOrder.filter((id) => id !== "select")}
          strategy={horizontalListSortingStrategy}>
          <Table className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DraggableHeader key={header.id} header={header} />
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function DraggableHeader<TData, TValue>({
  header,
}: {
  header: Header<TData, TValue>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: header.column.id,
    disabled: header.column.id === "select",
  });

  const style = {
    position: "relative" as const,
    width: header.column.getSize(),
    transform: transform
      ? CSS.Transform.toString({
          x: transform.x,
          y: 0,
          scaleX: isDragging ? 1.1 : 1,
          scaleY: isDragging ? 1.1 : 1,
        })
      : undefined,
    transition,
    userSelect: "none" as const,
    zIndex: isDragging ? 10 : 0,
    background: isDragging ? "#F0F0F0" : "#FAFAFA",
  };

  return (
    <TableHead ref={setNodeRef} style={style} className="border-r">
      <div className="flex items-center justify-between group">
        <div className="flex-1 text-center">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        <div
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {header.column.id !== "select" ? (
            <GripVertical className="h-4 w-4" />
          ) : null}
        </div>
      </div>

      {/* Resize handle tetap jalan */}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-gray-500"
        />
      )}
    </TableHead>
  );
}
