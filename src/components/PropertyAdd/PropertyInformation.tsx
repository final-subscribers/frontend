import { useFormContext, useFieldArray } from 'react-hook-form';
import PropertyInputValidation from '../common/PropertyInputValidation';
import { CalendarDots, FilePlus, Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { FormValues } from '@/types/types';

// 파일 첨부 내용 추가할 것, 코드분할
export const PropertyInformation = ({ onNext }: { onNext: () => void }) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [discountSale, setDiscountSale] = useState<boolean>(getValues('discountSale') || false); // 할인 분양 여부
  const [discountSystem, setDiscountSystem] = useState<boolean>(getValues('discountSystem') || false); // 가격 or 퍼센트
  const [propertyType, setPropertyType] = useState<string>('APARTMENT'); // 분양 유형
  const [salesType, SetSalesType] = useState<string>('PRIVATE_SALE'); //분양 형태
  setValue('propertyType', 'APARTMENT');
  setValue('salesType', 'PRIVATE_SALE');

  // Daum 주소 API
  const postcodeUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const postcodeOpen = useDaumPostcodePopup(postcodeUrl);

  const handlePostcodeComplete = (data: any, inputType: 'propertyAreaAddr' | 'propertyModelhouseAddr') => {
    if (inputType === 'propertyAreaAddr') {
      setValue('propertyAreaAddr', data.address);
      setValue('addrDo', data.sido);
      setValue('addrGu', data.sigungu);
      setValue('addrDong', data.bname);
      setValue('buildingName', data.buildingName);
    } else if (inputType === 'propertyModelhouseAddr') {
      setValue('propertyModelhouseAddr', data.address);
    }
  };

  const handlePostcodeClick = (inputType: 'propertyAreaAddr' | 'propertyModelhouseAddr') => {
    postcodeOpen({
      onComplete: (data) => handlePostcodeComplete(data, inputType),
    });
  };

  // 분양 유형/형태
  const handlePropertyTypeSelect = (value: string) => {
    setPropertyType(value);
    setValue('propertyType', value);
  };
  const handleSalesTypeSelect = (value: string) => {
    SetSalesType(value);
    setValue('salesType', value);
  };

  // 할인 분양 상태 관리
  const toggleDiscountSale = () => {
    const newDiscountSale = !discountSale;
    setDiscountSale(newDiscountSale);
    setValue('discountSale', newDiscountSale);

    // 할인분양 false
    if (!newDiscountSale) {
      areaFields.forEach((_, index) => {
        const price = getValues(`areas.${index}.price`);
        setValue(`areas.${index}.discountPrice`, price);
        setValue(`areas.${index}.discountPercent`, 0);
      });
    }
  };
  // 가격/퍼센트 시스템 상태 관리
  const toggleDiscountSystem = (system: boolean) => {
    areaFields.forEach((_, index) => {
      setValue(`areas.${index}.discountPrice`, 0);
      setValue(`areas.${index}.discountPercent`, 0);
    });

    const newDiscountSystem = system;
    setDiscountSystem(newDiscountSystem);
    setValue('discountSystem', newDiscountSystem);
  };

  const {
    fields: areaFields,
    append: appendArea,
    remove: removeArea,
  } = useFieldArray({
    control,
    name: 'areas',
  });
  // const {
  //   fields: fileFields,
  //   append: appendFile,
  //   remove: removeFile,
  // } = useFieldArray({
  //   control,
  //   name: 'files',
  // });

  // 세대면적 추가
  const addArea = () => {
    const householdArea = parseInt(getValues('propertyHouseholdArea'));
    if (householdArea) {
      appendArea({
        squareMeter: householdArea,
        price: 0,
        discountPercent: 0,
        discountPrice: 0,
      });
      setValue('propertyHouseholdArea', '');
    }
  };

  // 파일 관련
  // const addFile = (fileName: string) => {
  //   if (fileName) {
  //     appendFile({
  //       fileName: fileName,
  //       fileUrl: '',
  //       fileType: '',
  //     });
  //   }
  // };

  // 할인가 <-> 퍼센트 계산
  const discountSystemConversion = () => {
    areaFields.forEach((_, index) => {
      const price = getValues(`areas.${index}.price`);
      let discountPercent = getValues(`areas.${index}.discountPercent`);
      let discountPrice = getValues(`areas.${index}.discountPrice`);

      if (discountSystem) {
        // 할인가
        if (discountPrice === 0) {
          setValue(`areas.${index}.discountPercent`, 0);
          setValue(`areas.${index}.discountPrice`, price);
        } else {
          const calculatedPercent = Math.floor(parseFloat(((1 - discountPrice / price) * 100).toFixed(1)));
          setValue(`areas.${index}.discountPercent`, calculatedPercent);
          setValue(`areas.${index}.discountPrice`, discountPrice);
        }
      } else {
        // 퍼센트
        if (discountPercent === 0) {
          setValue(`areas.${index}.discountPercent`, 0);
          setValue(`areas.${index}.discountPrice`, price);
        } else {
          const calculatedPrice = Math.floor(price * (1 - discountPercent / 100));
          setValue(`areas.${index}.discountPrice`, calculatedPrice);
          setValue(`areas.${index}.discountPercent`, discountPercent);
        }
      }
    });
  };

  const handleNext = () => {
    discountSystemConversion();
    onNext();
  };

  return (
    <div className="flex flex-col w-[720px] h-full m-auto">
      <div className="flex flex-col w-full gap-8">
        <div className="">
          <label className="inline-block my-5 text-static-default text-title-base font-bold">
            대표이미지
          </label>
          <div className="flex flex-col items-center justify-center w-[464px] h-[261px] py-10 bg-assistive-base text-assistive-strong border border-assistive-default rounded-6 text-detail-base">
            <FilePlus size={80} weight="light" className="mb-3" />
            <p className="text-label-lg font-bold">대표 이미지 등록하기</p>
            <p>10MB 이하의 jpg, jpeg, png 파일만 등록할 수 있어요.</p>
            <p>사진 크기는 0000*000 픽셀로 노출됩니다</p>
          </div>
        </div>
        <PropertyInputValidation name="propertyName" label="매물명" placeholder="매물명을 입력해주세요" />
        <div className="flex w-full gap-9">
          <PropertyInputValidation
            name="propertyConstructor"
            label="시공사"
            placeholder="ex) 대방건설(주)"
            className="w-full"
          />
          <PropertyInputValidation
            name="propertyCompanyName"
            label="시행사"
            placeholder="ex) 삼익건설개발(주)"
            className="w-full"
          />
        </div>
        <PropertyInputValidation
          name="propertyTotalNumber"
          label="세대수"
          placeholder="총"
          className="w-[340px]"
          trailingExtra="세대"
          numberOnly={true}
        />
        {/* 캘린더 이후 추가예정 */}
        <PropertyInputValidation
          name="propertyRecruitmentDate"
          label="모집기간"
          placeholder="모집시작일 - 모집마감일"
          className="w-[340px]"
          inputClassName="text-center"
          trailingExtra={<CalendarDots size={24} weight="light" />}
        />
      </div>

      <div className="w-full h-[1px] my-10 bg-assistive-divider"></div>

      <div className="flex flex-col w-full gap-8">
        <div>
          <PropertyInputValidation
            name="propertyHouseholdArea"
            label="세대면적"
            placeholder="ex)24, 32"
            trailingExtra="평"
            className="w-[481px] mb-8"
            errorMessage={errors.areas?.message}
            numberOnly={true}
            buttonTitle={
              <>
                <span className="mr-4">추가</span>
                <Plus size={24} strokeWidth={2} />
              </>
            }
            buttonSize="lg"
            buttonVariant="outline"
            buttonClassName="ml-4"
            buttonType="button"
            onButtonClick={addArea}
          />

          {areaFields.length !== 0 && (
            <div className="flex flex-col gap-7">
              <label className="block my-3 text-title-base font-bold text-static-default">평형별 가격</label>
              {areaFields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 h-[53px] w-[396px]">
                  <Label variant="space">{item.squareMeter}평</Label>
                  <div className="w-[1px] h-[41px] bg-assistive-divider"></div>
                  <PropertyInputValidation
                    name={`areas.${index}.price`}
                    trailingExtra="만원"
                    className="w-[340px] mb-[0px]"
                    numberOnly={true}
                  />
                  <X
                    size={32}
                    weight="light"
                    className="cursor-pointer text-assistive-default ml-4"
                    onClick={() => removeArea(index)}
                  />
                </div>
              ))}
              <div className="flex items-center mt-8 h-[53px]">
                <div className="flex items-center cursor-pointer mr-5" onClick={toggleDiscountSale}>
                  {discountSale ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none">
                      <path
                        d="M16 0.5C7.168 0.5 0 7.668 0 16.5C0 25.332 7.168 32.5 16 32.5C24.832 32.5 32 25.332 32 16.5C32 7.668 24.832 0.5 16 0.5ZM11.664 23.364L5.92 17.62C5.296 16.996 5.296 15.988 5.92 15.364C6.544 14.74 7.552 14.74 8.176 15.364L12.8 19.972L23.808 8.964C24.432 8.34 25.44 8.34 26.064 8.964C26.688 9.588 26.688 10.596 26.064 11.22L13.92 23.364C13.312 23.988 12.288 23.988 11.664 23.364Z"
                        fill="#204AE5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none">
                      <path
                        d="M1 16.5C1 8.22028 7.72028 1.5 16 1.5C24.2797 1.5 31 8.22028 31 16.5C31 24.7797 24.2797 31.5 16 31.5C7.72028 31.5 1 24.7797 1 16.5Z"
                        stroke="#B2B6BE"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                  <span className="ml-4">할인 분양</span>
                </div>
                <p className="text-assistive-strong text-detail-lg">* 해당하는 평형대만 입력해주세요</p>
              </div>
              {discountSale && (
                <div>
                  <div className="flex mt-4 mb-7">
                    <label className="block my-3 text-title-base font-bold text-static-default mr-[50px]">
                      할인가
                    </label>
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
                  </div>
                  <div className="flex flex-col gap-7">
                    {areaFields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-4 h-[53px] w-[385px]">
                        <Label variant="space">{item.squareMeter}평</Label>
                        <div className="w-[1px] h-[41px] bg-assistive-divider"></div>
                        <PropertyInputValidation
                          name={
                            discountSystem ? `areas.${index}.discountPrice` : `areas.${index}.discountPercent`
                          }
                          trailingExtra={discountSystem ? '만원' : '%'}
                          className="w-[240px] mb-[0px]"
                          numberOnly={true}
                          errorMessage={errors.areas?.[index]?.discountPrice?.message}
                        />
                        <span className="w-[33px] text-label-lg">할인</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <PropertyInputValidation
          name="propertySupplyInformation"
          label="공급안내표"
          placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
          className="w-full mb-[0px]"
          buttonTitle="파일 첨부"
          buttonSize="lg"
          buttonVariant="outline"
          buttonClassName="ml-4"
          buttonType="button"
        />
      </div>
      <div className="w-full h-[1px] my-10 bg-assistive-divider"></div>

      <div className="flex flex-col gap-8">
        <div>
          <label className="block my-3 text-title-base font-bold text-static-default">분양유형</label>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-label-lg font-bold">
            {[
              { name: '아파트', value: 'APARTMENT' },
              { name: '오피스텔', value: 'OFFICETEL' },
              { name: '빌라', value: 'VILLA' },
              { name: '도시형 생활 주택', value: 'URBAN_HOUSING' },
              { name: '생활 숙박 시설', value: 'LIVING_ACCOMMODATION' },
              { name: '상가/업무', value: 'DOWNTOWN' },
            ].map((type) => (
              // 버튼 컴포넌트 이후 변경
              <button
                key={type.value}
                type="button"
                onClick={() => handlePropertyTypeSelect(type.value)}
                className={`px-9 py-6 border rounded-5 ${
                  propertyType === type.value
                    ? 'bg-primary-base  text-primary-default border-2 border-primary-default'
                    : 'bg-white text-assistive-strong border-2 border-assistive-default'
                }`}>
                {type.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block my-3 text-title-base font-bold text-static-default">분양형태</label>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-label-lg font-bold">
            {[
              { name: '민간분양', value: 'PRIVATE_SALE' },
              { name: '공공분양', value: 'PUBLIC_SALE' },
              { name: '임대분양', value: 'LEASE_SALE' },
            ].map((type) => (
              // 버튼 컴포넌트 이후 변경
              <button
                key={type.value}
                type="button"
                onClick={() => handleSalesTypeSelect(type.value)}
                className={`px-8 py-5 border rounded-5 ${
                  salesType === type.value
                    ? 'bg-primary-base  text-primary-default border-2 border-primary-default'
                    : 'bg-white text-assistive-strong border-2 border-assistive-default'
                }`}>
                {type.name}
              </button>
            ))}
          </div>
        </div>
        <PropertyInputValidation
          name="propertyAreaAddr"
          label="대지위치"
          placeholder="주소를 입력해주세요"
          className="w-full mb-[0px]"
          buttonTitle="우편번호 검색"
          buttonSize="lg"
          buttonVariant="outline"
          buttonClassName="ml-4"
          buttonType="button"
          onButtonClick={() => handlePostcodeClick('propertyAreaAddr')}
        />
        <PropertyInputValidation
          name="propertyModelhouseAddr"
          label="모델하우스 주소"
          placeholder="주소를 입력해주세요"
          className="w-full mb-[0px]"
          buttonTitle="우편번호 검색"
          buttonSize="lg"
          buttonVariant="outline"
          buttonClassName="ml-4"
          buttonType="button"
          onButtonClick={() => handlePostcodeClick('propertyModelhouseAddr')}
        />
      </div>

      <Button type="button" onClick={handleNext} className="mt-11">
        다음
      </Button>
    </div>
  );
};
