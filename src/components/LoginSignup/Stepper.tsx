import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface StepperComponentProps {
  stepPath: string;
  blueIcon: string;
  grayIcon: string;
  mobileBlueIcon: string;
  mobileGrayIcon: string;
  text: string;
}

export default function StepperComponent({
  stepPath,
  blueIcon,
  grayIcon,
  mobileBlueIcon,
  mobileGrayIcon,
  text,
}: StepperComponentProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCurrentPath = location.pathname === stepPath;
  const img = isMobile
    ? isCurrentPath
      ? mobileBlueIcon
      : mobileGrayIcon
    : isCurrentPath
      ? blueIcon
      : grayIcon;
  const textColor = isCurrentPath ? 'text-[#32373E]' : 'text-[#CBD0D7]';

  return (
    <div className="flex-col w-[100px] mobile:w-[56px]">
      <img className="mx-auto place-content-center" src={img} alt={text}></img>
      <p
        className={`mt-4 mobile:mt-2 text-center ${textColor} font-pretendard font-bold text-title-xs mobile:text-label-sm-m`}>
        {text}
      </p>
    </div>
  );
}
