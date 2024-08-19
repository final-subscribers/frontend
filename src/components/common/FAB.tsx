import { CaretUp } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const FAB = () => {
  const [isShowFab, setisShowFab] = useState(false);
  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowFab = () => {
      if (window.scrollY > 50) {
        setisShowFab(true);
      } else {
        setisShowFab(false);
      }
    };

    window.addEventListener('scroll', handleShowFab);
    return () => {
      window.removeEventListener('scroll', handleShowFab);
    };
  }, []);

  return (
    isShowFab && (
      <div
        className="fixed bottom-16 right-14 z-10 hidden desktop:flex items-center justify-center w-20 h-20 p-5 bg-white border border-assistive-default shadow-[0_0_15px_0] shadow-effect-shadow rounded-10 cursor-pointer"
        onClick={scrollTop}>
        <CaretUp size={48} weight="bold" className="text-assistive-strong" />
      </div>
    )
  );
};

export default FAB;
