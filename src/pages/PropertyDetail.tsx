import Breadcrumb from '@/components/common/Breadcrumb';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import TabsNavigation from '@/components/Property/TabsNavigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getPropertyInfo } from '@/constants/getPropertyInfo';
import useResponsive from '@/hooks/useResponsive';
import { formatAmount, getPropertyLabel } from '@/lib/utils';
import { Area, SalesInformation } from '@/types/types';
import { ArrowLineDown, CaretDown, CaretUp, Heart } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PropertyDetail = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [lowestPriceArea, setLowestPriceArea] = useState<Area | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchSalesInformation = async (): Promise<SalesInformation> => {
    const res = await axios.get<SalesInformation>(`/api/properties`);
    return res.data;
  };

  const { data, refetch } = useQuery<SalesInformation>({
    queryKey: ['salesInformation'],
    queryFn: fetchSalesInformation,
    staleTime: 0, // 데이터가 오래된 것으로 간주되는 시간을 0으로 설정 (즉, 매번 새로고침)
    refetchOnWindowFocus: true, // 포커스가 다시 되었을 때 데이터를 새로고침
    refetchOnMount: true, // 컴포넌트가 처음 마운트될 때마다 데이터를 가져옴
  });

  // 최저가
  useEffect(() => {
    if (data?.areas) {
      const lowestPrice = Math.min(...data?.areas.map((area) => area.discountPrice));
      const lowestPriceAreaIndex = data?.areas.findIndex((area) => area.discountPrice === lowestPrice);
      setLowestPriceArea(data?.areas[lowestPriceAreaIndex]);
    }
  }, [data]);

  useEffect(() => {
    refetch(); // 페이지가 로드되면 refetch를 통해 강제로 데이터를 가져옴
  }, []);

  const propertyInfo = getPropertyInfo(data);
  const supplyInformationFile = data?.files?.find((file) => file.type === 'supply_information');

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`w-[1200px] tablet:w-[720px] mobile:w-[328px] h-full m-auto text-static-default`}>
      {isDesktop && <Breadcrumb links={['미분양 정보', data?.buildingName || '']} />}
      <div>
        <div
          className={`flex ${isMobile ? 'flex-col mb-9' : 'items-center mb-11'} w-full h-[576px] tablet:h-[384px] mobile:h-[723px] gap-6`}>
          <div className="w-[576px] tablet:w-[352px] mobile:w-[328px]">
            <img
              className="w-full h-full object-cover rounded-7"
              src={data?.imageUrl}
              alt={data?.buildingName}
            />
          </div>
          <div className="flex flex-col gap-7 tablet:gap-2 mobile:gap-4 grow justify-center">
            <div className="flex gap-4 tablet:mb-2 mobile:gap-3">
              {data?.benefit?.map((benefit, index) => (
                <Label
                  key={index}
                  keyword={getPropertyLabel(benefit.name)}
                  size={isDesktop ? 'l' : 'm'}
                  className="mobile:text-label-base-m">
                  {getPropertyLabel(benefit.name)}
                </Label>
              ))}
            </div>
            <div className="flex flex-col gap-0 desktop:gap-4 ">
              <div className="flex items-center gap-2 text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail">
                <p>{getPropertyLabel(data?.propertyType || '')}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>{getPropertyLabel(data?.salesType || '')}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>총 {data?.totalNumber}세대</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-heading-base tablet:text-title-2xl mobile:text-title-2xl-m font-bold">
                  {data?.buildingName}
                </div>
                {/* like api 추가하기 */}
                <div className="p-3 border border-assistive-default rounded-10 cursor-pointer">
                  {data?.likes ? (
                    <Heart size={isDesktop ? 32 : 24} weight="fill" className="text-accent-strong" />
                  ) : (
                    <Heart size={isDesktop ? 32 : 24} weight="thin" className="text-assistive-strong" />
                  )}
                </div>
              </div>
              <div className="text-assistive-detail text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
                {data?.areaAddr}
              </div>
            </div>
            <div>
              {lowestPriceArea && (
                <div>
                  <span className="line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                    {formatAmount(lowestPriceArea.price)}
                  </span>
                  <div className="flex mt-1">
                    <span className="text-accent-strong text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold mr-3">
                      {lowestPriceArea.discountPercent}%
                    </span>
                    <span className="text-static-default text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold">
                      {formatAmount(lowestPriceArea.discountPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="text-assistive-strong text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
                편의시설
              </span>
              <div className="flex gap-4 mt-4 tablet:my-2">
                {data?.infra?.map((infra, index) => (
                  <Label
                    key={index}
                    keyword={getPropertyLabel(infra.name)}
                    size={isDesktop ? 'l' : 'm'}
                    className="mobile:text-label-base-m">
                    {getPropertyLabel(infra.name)}
                  </Label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <Button variant="assistive" size={isDesktop ? 'xl' : 'sm'} className="w-full">
                  전화문의
                </Button>
                <Button variant="assistive" size={isDesktop ? 'xl' : 'sm'} className="w-full">
                  카카오톡 채널문의
                </Button>
              </div>
              <Button className="w-full mt-3" size={isDesktop ? 'xl' : 'sm'}>
                상담신청
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-16 mobile:gap-9">
          <TabsNavigation />
          <div id="areasTab">
            <div className="flex items-center justify-between mb-6">
              <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold">
                평형별 매물가격
              </p>
              <a href={supplyInformationFile?.url} download={supplyInformationFile?.name}>
                <Button variant="outline" size={isDesktop ? 'lg' : 'xs'}>
                  공급안내표
                  <ArrowLineDown size={isDesktop ? 24 : 16} weight="bold" className="ml-4" />
                </Button>
              </a>
            </div>

            <div>
              {data?.areas?.map((area, index) => {
                const isPrevIndex =
                  index ===
                  data.areas.findIndex((i) => i.discountPrice === lowestPriceArea?.discountPrice) - 1;
                const isLastIndex = index === data.areas.length - 1;
                return (
                  <>
                    {area.discountPrice === lowestPriceArea?.discountPrice ? (
                      <div
                        key={index}
                        className={`flex ${isDesktop ? 'px-8 py-9' : 'px-5 py-6'} w-full border border-assistive-divider rounded-6`}>
                        <div className="w-full">
                          <p className="text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mb-3">
                            {area.squareMeter}평
                          </p>
                          <p className="text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                            {Math.round(area.squareMeter * 3.3)}㎡
                          </p>
                        </div>
                        <div className="flex flex-col items-end w-full">
                          <Label size={isDesktop ? 'm' : 's'} variant="accent">
                            최저가
                          </Label>
                          <p className="mt-5 line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                            {formatAmount(area.price)}
                          </p>
                          <div className="flex">
                            <span className="text-accent-strong text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mr-3">
                              {area.discountPercent}%
                            </span>
                            <span className="text-static-default text-title-xl tablet:text-title-base mobile:text-title-base-m  font-bold">
                              {formatAmount(area.discountPrice)}~
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="px-5 desktop:px-8">
                        <div
                          className={`flex items-center py-5 desktop:py-8 w-full ${isPrevIndex || isLastIndex ? '' : 'border-b border-assistive-divider'}`}>
                          <div className="w-full">
                            <span className="mobile:block mr-5 text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold">
                              {area.squareMeter}평
                            </span>
                            <span className="mobile:block text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                              {Math.round(area.squareMeter * 3.3)}㎡
                            </span>
                          </div>
                          <div
                            className={`${isDesktop ? 'flex items-center justify-end' : 'flex flex-col items-end'} w-full`}>
                            <span className="line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default mr-5">
                              {formatAmount(area.price)}
                            </span>
                            <div className="flex">
                              <span className="text-accent-strong text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mr-3">
                                {area.discountPercent}%
                              </span>
                              <span className="text-static-default text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold">
                                {formatAmount(area.discountPrice)}~
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div id="benefitTab">
            {data?.benefit && <PropertyKeyword type="benefit" data={data?.benefit} />}
          </div>
          <div id="infraTab">{data?.infra && <PropertyKeyword type="infra" data={data?.infra} />}</div>
          <div id="propertyTab">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-5 mobile:mb-8">
              매물정보
            </p>
            {propertyInfo.map((property, index) => (
              <div
                key={index}
                className={clsx(
                  'flex flex-col border border-assistive-divider rounded-6 gap-5',
                  isDesktop && 'p-10 mb-5',
                  isTablet && 'p-7 mb-4',
                  isMobile && 'p-7 mb-3',
                )}>
                {property.map((item, itemIndex) => (
                  <div key={`${item.label}-${itemIndex}`} className="flex">
                    <p className="w-[99px] text-body-lg tablet:text-detail-lg mobile:text-detail-lg-m font-bold">
                      {item.label}
                    </p>
                    <p className="text-body-lg tablet:text-detail-lg mobile:text-detail-lg-m">{item.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div id="detailsTab" className="">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-3 mobile:mb-8">
              상세정보
            </p>
            {data?.files
              ?.filter((file) => file.type === 'marketing')
              .map((file, index) => (
                <div key={index}>
                  <div className="relative">
                    <Document file={file.url} onLoadError={console.error}>
                      <Page
                        pageNumber={1}
                        width={isDesktop ? 1200 : isTablet ? 720 : 328}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className={`${isExpanded ? 'max-h-full' : isDesktop ? 'max-h-[300px]' : isTablet ? 'max-h-[194px]' : 'max-h-[88px]'} overflow-hidden`}
                      />
                    </Document>
                    {!isExpanded && (
                      <div className="absolute top-0 left-0 w-full h-full white-gradient-overlay"></div>
                    )}
                  </div>
                </div>
              ))}
            <Button
              variant="assistive"
              size={isDesktop ? 'xl' : 'sm'}
              onClick={toggleExpansion}
              className="w-full">
              {isExpanded ? '상세정보 닫기' : '상세정보 더보기'}
              {isExpanded ? (
                <CaretUp size={isMobile ? 16 : 24} weight="bold" className="ml-4 text-assistive-strong" />
              ) : (
                <CaretDown size={isMobile ? 16 : 24} weight="bold" className="ml-4 text-assistive-strong" />
              )}
            </Button>
          </div>
          <div id="locationTab" className="mb-20">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-2">위치</p>
            <p className="text-detail-lg tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail mb-8">
              {data?.areaAddr}
            </p>
            {/* 지도 활성화하기 */}
            {/* <NaverMap address={data?.areaAddr || ''} buildingName={data?.buildingName || ''} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
