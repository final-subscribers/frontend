import { getPropertyLabel } from '@/lib/utils';
import { ChipIcon, ChipLabel, type ChipIconProps } from '../ui/chip';

interface KeywordChipProps extends ChipIconProps {
  text: string;
}

const KeywordChip = ({ keyword, variant, text }: KeywordChipProps) => {
  const isDefaultVariant = variant === 'default';
  const label = getPropertyLabel(keyword);
  return isDefaultVariant ? (
    <div className="py-4 pl-5 pr-8 flex flex-col gap-4 mobile:gap-2">
      <div className="flex gap-4 items-center mobile:gap-5">
        <ChipIcon keyword={keyword} variant={variant} className="flex-shrink-0" />
        <ChipLabel keyword={keyword} variant={variant}>
          {label}
        </ChipLabel>
      </div>
      <div className="pl-9">
        <div className="text-label-lg text-assistive-detail min-w-0 mobile:text-detail-base-m">{text}</div>
      </div>
    </div>
  ) : (
    <div className="py-4 pl-5 pr-8 flex items-center gap-5 rounded-7 border border-assistive-divider tablet:py-3 tablet:pl-3 tablet:rounded-5">
      <ChipIcon keyword={keyword} variant={variant} className="flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-grow min-w-0 tablet:gap-0">
        <ChipLabel keyword={keyword} variant={variant}>
          {label}
        </ChipLabel>
        <div className="text-label-base text-assistive-detail tablet:text-label-xs mobile:text-detail-base-m min-w-0 truncate">
          {text}
        </div>
      </div>
    </div>
  );
};

export default KeywordChip;
