import { ColumnDef } from '@tanstack/react-table';
import { Label } from '@/components/ui/label';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';

export interface MyProperty {
  id: number;
  name: string;
  total_number: number;
  pending: number;
  status: string;
  created_at: string;
  end_date: string;
}

export const columnsMyProperty: ColumnDef<MyProperty>[] = [
  {
    accessorKey: 'name',
    header: '매물명',
  },
  {
    accessorKey: 'total_number',
    header: '세대수',
  },
  {
    accessorKey: 'pending',
    header: '상담대기',
  },
  {
    accessorKey: 'status',
    header: '모집상태',
    cell: ({ row }) => {
      const contentsData = row.original;
      return (
        <Label size="m" variant="highlight">
          모집중
        </Label>
      );
    },
  },
  {
    accessorKey: 'end_date',
    header: '마감기한',
  },
  {
    accessorKey: 'created_at',
    header: '등록일',
  },
  {
    id: 'customColumn1',
    header: '', // No header for this column
    cell: () => {
      return (
        <div className="flex relative w-[150px] items-center">
          <PencilSimple size={24} weight="light" className="absolute right-0 cursor-pointer" />
        </div>
      );
    },
  },
  {
    id: 'customColumn2',
    header: '', // No header for this column
    cell: () => {
      return (
        <div className="flex relative w-[150px] items-center">
          <TrashSimple size={24} weight="light" className="absolute left-0 cursor-pointer " />
        </div>
      );
    },
  },
];
