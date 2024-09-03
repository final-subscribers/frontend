import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'absolute flex items-center justify-center size-[28px] left-5 inset-y-0 my-auto font-bold !text-static-white rounded-4 text-label-sm',
  {
    variants: {
      variant: {
        default: 'bg-assistive-strong',
        primary: 'bg-primary-default',
        accent: 'bg-accent-strong',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function KeywordBadge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { KeywordBadge, badgeVariants };
