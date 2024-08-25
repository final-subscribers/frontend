import React, { useEffect } from 'react';
import { Bell } from '@phosphor-icons/react';
import useResponsive from '@/hooks/useResponsive';

interface ToastProps {
  setIsToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toast = ({ setIsToast }: ToastProps) => {
  const { isDesktop } = useResponsive();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsToast]);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 ${isDesktop ? 'w-[1200px] top-[54px]' : 'w-[720px] max-w-[calc(100%-32px)] bottom-8'} mobile:bottom-[87px] z-[100]`}>
      <div
        className={`flex items-center gap-5 px-5 py-4 rounded-6 shadow-[0_0_20px_0_rgba(0,0,0,0.25)] backdrop-blur-[20px] w-full bg-effect-elevated text-white 
        ${isDesktop ? 'text-links-lg animate-slideDown' : 'text-links-base animate-slideUp'} opacity-100 transition-opacity duration-300`}>
        <div className="p-2 bg-highlight-normal rounded-full">
          <Bell size={32} weight="fill" color="white" />
        </div>
        <div>
          <p className="font-bold">상담신청 접수완료</p>
          <p>신청현황은 마이페이지를 통해 확인하실 수 있습니다</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
