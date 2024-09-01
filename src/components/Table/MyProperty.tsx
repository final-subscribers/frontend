import React from 'react';
import { TrashSimple } from '@phosphor-icons/react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface Identifiable {
  id: number;
}

export function MyProperty<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = React.useState<TData[]>(data);

  const handleDelete = (id: number) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };

  const columnsWithDelete = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'customColumn2') {
        return {
          ...column,
          cell: ({ row }: any) => (
            <div className="flex relative w-[150px] items-center">
              <TrashSimple
                size={24}
                weight="light"
                className="absolute left-0 cursor-pointer"
                onClick={() => handleDelete(row.original.id)}
              />
            </div>
          ),
        };
      }
      return column;
    });
  }, [columns, handleDelete]);

  const table = useReactTable({
    data: tableData,
    columns: columnsWithDelete,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex">
        <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">매물 목록</h1>
        <span className="py-[10px] text-title-sm font-bold text-primary-default">
          {table.getCoreRowModel().rows.length}
        </span>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
