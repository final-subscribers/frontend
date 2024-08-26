import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  Bank,
  CalendarBlank,
  FirstAid,
  GraduationCap,
  Heart,
  Money,
  Park,
  PencilSimple,
  SealPercent,
  ShieldCheck,
  ShoppingBag,
  SquaresFour,
  TrainSimple,
} from '@phosphor-icons/react';
import PublicIcon from '@/assets/PublicIcon';

const withIconStyles = (icon: React.ReactNode): React.ReactNode => {
  return React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement, { className: 'size-full', weight: 'bold' })
    : icon;
};

const iconMap: Record<string, React.ReactNode> = {
  // 혜택 (Benefits)
  DISCOUNT_SALE: withIconStyles(<SealPercent />), // 할인분양
  BALANCE_DEFERRAL: withIconStyles(<CalendarBlank />), // 잔금유예
  CASH_PAYMENT: withIconStyles(<Money />), // 현금지급
  GUARANTEED_PAYMENT: withIconStyles(<ShieldCheck />), // 계약금 안심보장
  SUPPORT_PAYMENT: withIconStyles(<Heart />), // 중도금 지원
  OPTION_PAYMENT: withIconStyles(<SquaresFour />), // 옵션제공

  // 인프라 (Infrastructure)
  SUBWAY: withIconStyles(<TrainSimple />), // 지하철역
  SCHOOL: withIconStyles(<GraduationCap />), // 학교
  PARK: withIconStyles(<Park />), // 숲공원
  SHOPPING: withIconStyles(<ShoppingBag />), // 쇼핑복합시설
  HOSPITAL: withIconStyles(<FirstAid />), // 병원
  LIBRARY: withIconStyles(<PencilSimple />), // 도서관
  PUBLIC_FACILITIES: withIconStyles(<PublicIcon />), // 공공시설
  GOVERNMENT: withIconStyles(<Bank />), // 관공서
};

// 키워드에 따른 스타일 변경
const getVariantByKeyword = (keyword: string): VariantType => {
  const accentKeywords = [
    'DISCOUNT_SALE', // 할인분양
    'BALANCE_DEFERRAL', // 잔금유예
    'CASH_PAYMENT', // 현금지급
    'GUARANTEED_PAYMENT', // 계약금 안심보장
    'SUPPORT_PAYMENT', // 중도금 지원
    'OPTION_PAYMENT', // 옵션제공
  ];

  const primaryKeywords = [
    'SUBWAY', // 지하철역
    'HOSPITAL', // 병원
    'PARK', // 숲공원
    'SHOPPING', // 쇼핑복합시설
    'SCHOOL', // 학교
    'LIBRARY', // 도서관
    'PUBLIC_FACILITIES', // 공공시설
    'GOVERNMENT', // 관공서
  ];

  if (accentKeywords.includes(keyword)) {
    return 'accent';
  }

  if (primaryKeywords.includes(keyword)) {
    return 'primary';
  }

  return 'default';
};

const tabletStyle = 'tablet:size-8 tablet:p-3 tablet:rounded-4';

const chipIconVariants = cva('size-11 p-[18px] flex items-center justify-center rounded-6', {
  variants: {
    variant: {
      default: 'size-[28px] p-0 text-assistive-detail mobile:size-7',
      primary: `bg-primary-base text-primary-default ${tabletStyle}`,
      accent: `bg-accent-base text-accent-strong ${tabletStyle}`,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const chipLabelVariants = cva('font-bold !text-label-lg', {
  variants: {
    variant: {
      default: 'text-static-default !text-title-xl mobile:!text-title-base-m ',
      primary: 'text-primary-default tablet:!text-label-xs',
      accent: 'text-accent-strong tablet:!text-label-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type VariantType = 'default' | 'primary' | 'accent';

export interface ChipIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipIconVariants> {
  keyword: string;
}

const ChipIcon = ({ className, variant, keyword, ...props }: ChipIconProps) => {
  const computedVariant: VariantType = variant ? variant : getVariantByKeyword(keyword);
  const icon = iconMap[keyword];

  return (
    <div className={cn(chipIconVariants({ variant: computedVariant, className }))} {...props}>
      {icon}
    </div>
  );
};
export interface ChipLabelProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof chipLabelVariants> {
  keyword: string;
}
const ChipLabel = ({ className, variant, keyword, ...props }: ChipLabelProps) => {
  const computedVariant: VariantType = variant ? variant : getVariantByKeyword(keyword);

  return <h3 className={cn(chipLabelVariants({ variant: computedVariant, className }))} {...props} />;
};
ChipLabel.displayName = 'ChipLabel';
ChipIcon.displayName = 'ChipIcon';

export { ChipIcon, ChipLabel, chipIconVariants, chipLabelVariants };
