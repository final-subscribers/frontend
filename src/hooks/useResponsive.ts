import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet: boolean = useMediaQuery({ query: '(min-width:768px) and (max-width:1279px)' });
  const isDesktop: boolean = useMediaQuery({ query: '(min-width:1280px)' });

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
