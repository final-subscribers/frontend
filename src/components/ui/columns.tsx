import { ColumnDef } from '@tanstack/react-table';
import { operatorId } from '../../lib/dropdownItems';
import Dropdown from '../common/Dropdown';
import { Button } from '@/components/ui/button';

export interface Consulting {
  id: string;
  customerName: string;
  phoneNumber: string;
  contactDate: string;
  appointmentDate: string;
  operatorId: string;
  contents: string;
}

export const columns: ColumnDef<Consulting>[] = [
  {
    accessorKey: 'customerName',
    header: '고객명',
  },
  {
    accessorKey: 'phoneNumber',
    header: '전화번호',
  },
  {
    accessorKey: 'contactDate',
    header: '상담신청일자',
  },
  {
    accessorKey: 'appointmentDate',
    header: '희망상담일자',
  },
  {
    accessorKey: 'operatorId',
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
