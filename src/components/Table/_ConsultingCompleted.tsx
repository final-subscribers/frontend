import React from 'react';
import Dropdown from '../common/Dropdown';
import { MagnifyingGlass } from '@phosphor-icons/react';

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
import { Input } from '../ui/input';
import { operatorId, customerRating } from '../../lib/dropdownItems';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ConsultingCompleted<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <>
      <div className="flex mb-8 mt-8 relative">
        <MagnifyingGlass size={24} className={'text-assistive-divider absolute left-7 top-5'} />
        <Input
          type="text"
          placeholder="이름, 전화번호를 입력해주세요"
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[435px] pl-14 mr-7"
        />
        <div className="space-x-3">
          <Dropdown
            items={customerRating}
            defaultLabel="고객등급"
            buttonWidth="w-[138px]"
            onSelect={handleSelect}
          />
          <Dropdown
            items={operatorId}
            defaultLabel="상담사"
            onSelect={handleSelect}
            buttonWidth="w-[122px]"
          />
        </div>
      </div>
      <div className="flex">
        <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">총 상담완료</h1>
        <span className="py-[10px] text-title-sm font-bold text-primary-default">14</span>
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
