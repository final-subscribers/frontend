import { ColumnDef } from '@tanstack/react-table';
import { operatorId } from '../../lib/dropdownItems';
import Dropdown from '../common/Dropdown';
import { Button } from '@/components/ui/button';

export interface ConsultingPending {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt: string;
  consultant: string;
  contents: string;
}

export const columnsOnWait: ColumnDef<ConsultingPending>[] = [
  {
    accessorKey: 'name',
    header: '고객명',
  },
  {
    accessorKey: 'phoneNumber',
    header: '전화번호',
  },
  {
    accessorKey: 'createdAt',
    header: '상담신청일자',
  },
  {
    accessorKey: 'preferredAt',
    header: '희망상담일자',
  },
  {
    accessorKey: 'consultant',
    header: '상담사',
    cell: ({ row }) => {
      // @ts-ignore: Unreachable code error
      const operatorData = row.original;
      const handleSelect = (value: string) => {
        console.log('Selected value:', value);
      };
      return (
        <Dropdown items={operatorId} defaultLabel="a1-1" onSelect={handleSelect} buttonWidth="w-[99px]" />
      );
    },
  },
  {
    accessorKey: 'contents',
    header: '문의내역',
    cell: ({ row }) => {
      // @ts-ignore: Unreachable code error
      const contentsData = row.original;
      return (
        <Button variant="outline" size="sm">
          보기
        </Button>
      );
    },
  },
];
