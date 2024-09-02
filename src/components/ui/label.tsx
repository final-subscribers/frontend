import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva('inline-flex items-center justify-center whitespace-nowrap font-bold', {
  variants: {
    size: {
      s: 'px-2 py-1 rounded-2 text-[15px] font-normal',
      m: 'px-3 py-2 rounded-4 text-[17px]',
      l: 'px-5 py-2 rounded-4 text-[19px]',
    },
    variant: {
      elevated: 'bg-effect-elevated text-highlight-normal',
      assistive: 'bg-assistive-alternative text-effect-elevated',
      accent: 'bg-accent-base text-accent-strong',
      highlight: 'bg-highlight-base text-highlight-strong',
      primary: 'bg-primary-base text-primary-default',
      secondary: 'bg-secondary-base text-secondary-default',
      space: 'pl-6 pr-5 py-3 bg-assistive-base text-effect-elevated font-normal rounded-full !text-label-lg', // size L만 사용
    },
  },
  defaultVariants: {
    size: 'l',
    variant: 'elevated',
  },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  keyword?: string;
}

type VariantType = 'elevated' | 'assistive' | 'accent' | 'highlight' | 'primary' | 'secondary' | 'space';

const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, size, variant, keyword, ...props }, ref) => {
    const computedVariant: VariantType = keyword ? getVariantByKeyword(keyword) : variant || 'elevated';
    return (
      <span
        className={cn(labelVariants({ size, variant: computedVariant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Label.displayName = 'Label';

export { Label, labelVariants };

// 키워드에 따른 스타일 변경
const getVariantByKeyword = (keyword: string): VariantType => {
  const accentKeywords = ['할인분양', '잔금유예', '현금지급', '계약금 안심보장', '중도금 지원', '옵션제공'];
  const primaryKeywords = [
    '지하철역',
    '병원',
    '숲 · 공원',
    '쇼핑복합시설',
    '학교',
    '도서관',
    '공공시설',
    '관공서',
  ];

  if (accentKeywords.includes(keyword)) {
    return 'accent';
  }

  if (primaryKeywords.includes(keyword)) {
    return 'primary';
  }

  return 'elevated';
};
