import { formatBenefitText, formatInfraText } from '@/lib/utils';
import { CaretRight } from '@phosphor-icons/react';
import KeywordChip from '../common/KeywordChip';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import useResponsive from '@/hooks/useResponsive';
import { useState } from 'react';

interface PropertyKeywordProps {
  type: 'infra' | 'benefit';
  data: { name: string; input: any }[];
}

const PropertyKeyword = ({ type, data }: PropertyKeywordProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();
  const headerText = type === 'infra' ? '주변 핵심 체크' : '혜택 줍줍';
  const formatText = type === 'infra' ? formatInfraText : formatBenefitText;
  return (
    <>
      {isMobile ? (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <article className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-title-2xl text-static-default font-bold tablet:text-title-lg mobile:text-title-lg-m">
                {headerText}
              </h3>
              <div className="flex items-center gap-2 text-assistive-detail cursor-pointer hover:text-assistive-strong">
                <DrawerTrigger asChild>
                  <div className="text-label-lg tablet:text-label-xs mobile:text-label-sm-m">자세히 보기</div>
                </DrawerTrigger>
                <CaretRight className="size-5 desktop:size-6 p-1" />
              </div>
            </div>
            <div className="grid grid-cols-3 mobile:grid-cols-1 gap-3">
              {data?.map((item, index) => (
                <KeywordChip key={index} keyword={item.name} text={formatText(item.input)} />
              ))}
            </div>
          </article>
          <DrawerContent className="h-full">
            <DrawerHeader className="relative flex justify-center border-b-[1px] border-assistive-divider">
              <DrawerTitle>{headerText}</DrawerTitle>
            </DrawerHeader>
            <div className="px-7 py-8 ">
              <div className="flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
                {data?.map((item, index) => (
                  <KeywordChip
                    key={index}
                    keyword={item.name}
                    text={formatText(item.input)}
                    variant="default"
                  />
                ))}
              </div>
            </div>
            <DrawerDescription />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <article className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-title-2xl text-static-default font-bold tablet:text-title-lg mobile:text-title-lg-m">
                {headerText}
              </h3>
              <div className="flex items-center gap-2 text-assistive-detail cursor-pointer hover:text-assistive-strong">
                <DialogTrigger>
                  <div className="text-label-lg tablet:text-label-xs mobile:text-label-sm-m">자세히 보기</div>
                </DialogTrigger>
                <CaretRight className="size-5 desktop:size-6 p-1" />
              </div>
            </div>
            <div className="grid grid-cols-3 mobile:grid-cols-1 gap-3">
              {data?.map((item, index) => (
                <KeywordChip key={index} keyword={item.name} text={formatText(item.input)} />
              ))}
            </div>
          </article>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{headerText}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-scroll" aria-describedby={undefined}>
              {data?.map((item, index) => (
                <KeywordChip
                  key={index}
                  keyword={item.name}
                  text={formatText(item.input)}
                  variant="default"
                />
              ))}
            </div>
            <DialogDescription />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="assistive" className="w-full">
                  확인
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PropertyKeyword;
