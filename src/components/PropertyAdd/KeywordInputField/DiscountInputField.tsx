import PropertyInputValidation from '@/components/common/PropertyInputValidation';
import { Label } from '@/components/ui/label';
import { formatAmount } from '@/lib/utils';
import { FormValues } from '@/types/types';
import { X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface DiscountInputFieldProps {
  name: string;
  keyword:
    | {
        name: string;
        value: string;
        placeholder?: string;
      }
    | undefined;
  onClick: () => void;
}

const DiscountInputField = ({ onClick, name }: DiscountInputFieldProps) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [discountSystem, setDiscountSystem] = useState<boolean>(getValues('discountSystem') || false);
  const [discountInfo, setDiscountInfo] = useState<{ percent: number | null; price: number | null }[]>([]);

  useEffect(() => {
    const areas = getValues('areas') || [];

    const initialDiscountInfo = areas.map((_: any, index: number) => ({
      percent: getValues(`areas.${index}.discountPercent`) || null,
      price: getValues(`areas.${index}.discountPrice`) || null,
    }));

    setDiscountInfo(initialDiscountInfo);
  }, [getValues]);

  const { fields: areaFields } = useFieldArray({
    control,
    name: 'areas',
  });

  const toggleDiscountSystem = (system: boolean) => {
    areaFields.forEach((_, index) => {
      setValue(`areas.${index}.discountPrice`, null);
      setValue(`areas.${index}.discountPercent`, null);
    });

    const newDiscountSystem = system;
    setDiscountSystem(newDiscountSystem);
    setDiscountInfo([]);
    setValue('discountSystem', newDiscountSystem);
  };

  const discountSystemConversion = (index: number) => {
    const price = getValues(`areas.${index}.price`);
    let discountPercent = getValues(`areas.${index}.discountPercent`);
    let discountPrice = getValues(`areas.${index}.discountPrice`);

    if (discountSystem) {
      // 할인가
      if (discountPrice === null && discountPercent === null) {
        setValue(`areas.${index}.discountPercent`, null);
        setValue(`areas.${index}.discountPrice`, null);
      } else if (discountPrice !== null) {
        const calculatedPercent = Math.floor(parseFloat(((1 - discountPrice / price) * 100).toFixed(1)));
        setValue(`areas.${index}.discountPercent`, calculatedPercent);
        setValue(`areas.${index}.discountPrice`, discountPrice);
        discountPercent = calculatedPercent;
      }
    } else {
      // 퍼센트
      if (discountPrice === null && discountPercent === null) {
        setValue(`areas.${index}.discountPercent`, null);
        setValue(`areas.${index}.discountPrice`, null);
      } else if (discountPercent !== null) {
        const calculatedPrice = Math.floor(price * (1 - discountPercent / 100));
        setValue(`areas.${index}.discountPrice`, calculatedPrice);
        setValue(`areas.${index}.discountPercent`, discountPercent);
        discountPrice = calculatedPrice;
      }
    }

    // discountInfo 배열 업데이트
    const updatedDiscountInfo = [...discountInfo];
    updatedDiscountInfo[index] = { percent: discountPercent, price: discountPrice };
    setDiscountInfo(updatedDiscountInfo);

    const allPercents = areaFields.map((_, idx) => getValues(`areas.${idx}.discountPercent`) || 0);
    const minPercent = Math.min(...allPercents);
    const maxPercent = Math.max(...allPercents);

    // name을 사용해 keyword.input에 최소값과 최대값 저장
    if (name) {
      (setValue as any)(`${name}.input1`, Number(minPercent));
      (setValue as any)(`${name}.input2`, Number(maxPercent));
    }
  };

  const handleClearDiscount = () => {
    areaFields.forEach((_, index) => {
      setValue(`areas.${index}.discountPrice`, null);
      setValue(`areas.${index}.discountPercent`, null);
    });
    setDiscountInfo([]);
    onClick();
  };

  const displayCalculateInfo = (index: number) => {
    const discountPercent = discountInfo[index]?.percent || null;
    const discountPrice = discountInfo[index]?.price || null;
    return discountSystem
      ? discountPrice !== null && (
          <div className="flex items-center gap-3 text-label-lg text-accent-strong ">
            <span>할인율</span>
            <div className="w-[1px] h-5 bg-assistive-divider"></div>
            <span>{discountPercent}%</span>
          </div>
        )
      : discountPercent !== null && (
          <div className="flex items-center gap-3 text-label-lg text-accent-strong">
            <span>할인 분양가</span>
            <div className="w-[1px] h-5 bg-assistive-divider"></div>
            <span>{formatAmount(discountPrice)}</span>
          </div>
        );
  };

  return (
    <>
      <div className="flex mt-4 mb-7">
        <label className="block my-3 text-title-base font-bold text-static-default mr-[50px]">할인가</label>
        <div className="flex items-center gap-6">
          <div className="flex text-center w-[110px] h-9 text-label-sm font-bold">
            <div
              className={`w-full px-4 py-3 border border-assistive-divider rounded-[8px_0_0_8px] cursor-pointer ${discountSystem ? 'bg-white text-assistive-detail' : 'bg-assistive-divider text-white'}`}
              onClick={() => toggleDiscountSystem(true)}>
              만원
            </div>
            <div
              className={`w-full px-4 py-3 rounded-[0_8px_8px_0] border border-assistive-divider cursor-pointer ${discountSystem ? 'bg-assistive-divider text-white' : 'bg-white text-assistive-detail'}`}
              onClick={() => toggleDiscountSystem(false)}>
              %
            </div>
          </div>
          <div className="size-8" onClick={handleClearDiscount}>
            <X weight="light" className="size-8 cursor-pointer text-assistive-default" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        {areaFields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4 h-[53px]">
            <Label variant="space">{item.squareMeter}평</Label>
            <div className="w-[1px] h-[41px] bg-assistive-divider"></div>
            <PropertyInputValidation
              name={discountSystem ? `areas.${index}.discountPrice` : `areas.${index}.discountPercent`}
              trailingExtra={discountSystem ? '만원' : '%'}
              className="w-[240px] mb-[0px]"
              numberOnly={true}
              errorMessage={errors.areas?.[index]?.discountPrice?.message}
              onBlur={() => discountSystemConversion(index)}
            />
            <span className="text-label-lg">{discountSystem ? '' : '할인'}</span>
            {displayCalculateInfo(index)}
          </div>
        ))}
      </div>
    </>
  );
};

export default DiscountInputField;
