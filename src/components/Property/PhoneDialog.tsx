import { formatPhoneNumber } from '@/lib/utils';
import { Phone } from '@phosphor-icons/react';
import { Button } from '../ui/button';
import useResponsive from '@/hooks/useResponsive';

const PhoneDialog = ({ data, setIsPhoneDialog }: { data: any; setIsPhoneDialog: any }) => {
  const { isMobile } = useResponsive();
  return (
    <div className="flex flex-col items-center justify-center gap-6 mobile:gap-4">
      <Phone size={80} weight="light" />
      <div>
        <p className="text-title-2xl mobile:text-title-2xl-m font-bold mb-4">
          {formatPhoneNumber(data?.phoneNumber)}
        </p>
        <div className="text-body-lg mobile:text-body-lg-m text-center">
          <p>해당 번호로 전화주시면</p>
          <p>빠른 상담 도와드릴게요</p>
        </div>
      </div>
      <div className="w-full px-8 py-6">
        {isMobile ? (
          <Button
            size="md"
            className="w-full"
            onClick={() => {
              document.location.href = `tel:${data?.phoneNumber}`;
            }}>
            바로 전화 연결
          </Button>
        ) : (
          <Button variant="assistive" className="w-full" onClick={() => setIsPhoneDialog(false)}>
            돌아가기
          </Button>
        )}
      </div>
    </div>
  );
};
export default PhoneDialog;
