import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretDown, CaretUp, List, MagnifyingGlass } from '@phosphor-icons/react';

const GNB = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // tablet 이하 display - Menu 외부 감지
  const toggleButtonRef = useRef<HTMLDivElement>(null); // tablet 이하 display - 햄버거 버튼, 검색 버튼 외부 처리 X

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSideMenuOpen(false);
  };
  const handleLnbMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsSideMenuOpen(false);
  };

  useEffect(() => {
    // 외부감지
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        closeMenus();
      }
    };

    // 사이즈감지
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        closeMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="h-[93px] pl-9 pr-7 desktop1:pr-6 bg-white border-b border-neutral-20 font-pretendard">
        <nav className="flex justify-between items-center w-full h-full">
          <div className="flex gap-8">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3 mr-8">
              <Link to="/">
                <img src="/logo_size_l.png" alt="logo_l" className="hidden desktop1:block" />
                <img src="/logo_size_m.png" alt="logo_m" className="hidden tablet:block desktop1:hidden" />
                <img src="/logo_size_s.png" alt="logo_s" className="tablet:hidden" />
              </Link>
            </div>

            {/* Desktop1 (1616px ~ 1280px), Desktop2 (1920px ~ 1617px) */}
            <div className="hidden desktop1:flex items-center w-[771px]">
              <ul className="flex text-neutral-70 text-links-lg font-bold h-full w-full">
                <Link to="/" className="w-[193px] px-5 py-8 text-center">
                  홈
                </Link>
                <Link to="/" className="w-[193px] px-5 py-8 text-center">
                  미분양정보
                </Link>
                <Link to="/" className="w-[193px] px-5 py-8 text-center">
                  서비스 소개
                </Link>

                <li className=" w-[193px] px-5 py-8 text-center cursor-pointer relative group">
                  마이페이지
                  <div className="absolute left-0 top-[93px] w-full bg-white shadow-lg hidden group-hover:flex flex-col items-start font-normal">
                    <ul className="w-full">
                      <li className="px-9 py-7 cursor-pointer hover:bg-primary-50 hover:text-white hover:font-bold">
                        관심 매물
                      </li>
                      <li className="px-9 py-7 cursor-pointer hover:bg-primary-50 hover:text-white hover:font-bold">
                        상담신청 현황
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden desktop1:flex items-center justify-between desktop2:w-[533px] desktop1:w-[196px]">
            <div className="border desktop2:flex desktop1:hidden border-neutral-30 px-7 py-4 rounded-10 w-[348px]">
              {/* 이후 input component로 대체 */}
              <input type="text" placeholder="아파트명, 지역명으로 검색" className="w-[256px] mr-6" />
              <MagnifyingGlass size={24} weight="thin" className="text-primary-50" />
            </div>
            <MagnifyingGlass
              size={32}
              weight="bold"
              className="text-neutral-30 desktop1:block desktop2:hidden"
            />
            {/* 이후 button component로 대체 */}
            {/* 로그인 후 내용 변경 이후 추가 */}
            <button className="bg-white text-neutral-80 px-7 py-4 border border-neutral-30 rounded-4 text-label-sm font-bold">
              로그인/회원가입
            </button>
          </div>

          {/* Tablet (1279px ~ 768px), Mobile (767px ~ 360px) */}
          <div ref={toggleButtonRef} className="flex desktop1:hidden items-center">
            <div className="flex items-center justify-between gap-7 mx-6  ">
              <MagnifyingGlass size={32} weight="thin" className="text-neutral-80 cursor-pointer" />
              <List size={32} weight="thin" className="text-neutral-80 cursor-pointer" onClick={handleMenu} />
            </div>
          </div>
        </nav>
      </header>

      {/* Menu - gnb에서만 사용할 것 같아서 여기에 만들어 두기 */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="flex flex-col items-start bg-white w-full fixed z-50 shadow-lg text-links-base font-normal font-pretendard text-neutral-80">
          <ul className="w-full">
            <li className="p-5 ">
              <Link to="/">홈</Link>
            </li>
            <li className="p-5 ">
              <Link to="/">미분양 정보</Link>
            </li>
            <li className="p-5 ">
              <Link to="/">서비스 소개</Link>
            </li>
            {/* 마이페이지 리스트 - 어드민이 로그인 시 내용 변경 이후 추가 */}
            <li
              className={`p-5 flex justify-between cursor-pointer ${
                isSideMenuOpen ? 'bg-primary-50 text-white' : ''
              }`}
              onClick={handleLnbMenu}>
              마이페이지
              {isSideMenuOpen ? (
                <CaretDown size={24} weight="thin" className="text-white" />
              ) : (
                <CaretUp size={24} weight="thin" className="text-neutral-80" />
              )}
            </li>
            {isSideMenuOpen && (
              <div className="flex flex-col items-start bg-white w-full fixed z-50 shadow-lg text-links-sm text-neutral-70">
                <ul className="w-full">
                  <li className="px-7 py-5 cursor-pointer">관심 매물</li>
                  <li className="px-7 py-5 cursor-pointer">상담신청 현황</li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default GNB;
