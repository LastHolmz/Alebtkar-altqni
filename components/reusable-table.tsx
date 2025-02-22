"use client";
import useLocalStorageState from "use-local-storage-state";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchInput from "./search";
import { cn } from "@/lib/utils";
import LangRenderer from "@/components/lang";

type ReusableTableProps<T> = {
  data?: T[];
  defaultColumnVisibility?: VisibilityState;
  columns?: ColumnDef<T, any>[];
  filter?: React.ReactNode;
  searchQuery?: string;
  children?: React.ReactNode;
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  tableKey?: string;
};

export default function ReusableTable<T>({
  data = [],
  defaultColumnVisibility = {},
  columns = [],
  filter,
  searchQuery = "query",
  children,
  className,
  showSearch = true,
  searchPlaceholder = "ابحث هنا",
  tableKey = "key",
}: ReusableTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, __] = React.useState<VisibilityState>({
    ...defaultColumnVisibility,
  });
  const [
    columnVisibilityFromLocalStorage,
    setColumnVisibilityFromLocalStorage,
  ] = useLocalStorageState<VisibilityState>(tableKey, {
    defaultValue: columnVisibility,
  });

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibilityFromLocalStorage,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: columnVisibilityFromLocalStorage,
      rowSelection,
    },
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-between items-center py-4">
        {showSearch && (
          <SearchInput
            className="max-w-sm"
            placeholder={searchPlaceholder}
            query={searchQuery}
          />
        )}

        <div className="w-full sm:w-auto gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {/* <LangRenderer ar="" en="columns" />{" "} */}
                الأعمدة
                <ChevronDown className="mx-3 w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                        console.log(column);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <>{filter}</>
          <>{children}</>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-secondary"
                  key={row.id}
                  data-state={
                    row.getIsSelected() && (
                      <LangRenderer ar="مختارة" en="selected" />
                    )
                  }
                >
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
                  className="h-24 text-center"
                >
                  <LangRenderer ar="لا توجد نتائج" en="No Results" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          تم اختيار {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {/* <LangRenderer ar="" en="from" />{" "} */}
          {table.getFilteredRowModel().rows.length}.
          {/* <LangRenderer ar="" en="selected" /> */}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <LangRenderer ar="" en="prev" /> */}
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
            {/* <LangRenderer ar="" en="next" /> */}
          </Button>
        </div>
      </div>
    </div>
  );
}
