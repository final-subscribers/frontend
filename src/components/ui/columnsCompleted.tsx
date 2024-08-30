import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface ConsultingCompleted {
  name: string;
  tier: string;
  phoneNumber: string;
  createdAt: string;
  completedAt: string;
  consultant: string;
  contents: string;
}

export const columnsCompleted = (
  handleViewClick: (contents: string) => void,
): ColumnDef<ConsultingCompleted>[] => [
  {
    accessorKey: 'name',
    header: '고객명',
  },
  {
    accessorKey: 'tier',
    header: '고객등급',
    cell: ({ row }) => {
      const contentsData = row.original;
      return (
        <Label size="m" variant="highlight">
          S등급
        </Label>
      );
    },
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
    accessorKey: 'completedAt',
    header: '처리일자',
  },
  {
    accessorKey: 'consultant',
    header: '상담사',
    cell: ({ row }) => {
      const operatorData = row.original;
      return <div>{operatorData.consultant}</div>;
    },
  },
  {
    accessorKey: 'contents',
    header: '문의내역',
    cell: ({ row }) => {
      const contentsData = row.original;
      return (
        <Button variant="outline" size="sm" onClick={() => handleViewClick(row.original.contents)}>
          보기
        </Button>
      );
    },
  },
];
