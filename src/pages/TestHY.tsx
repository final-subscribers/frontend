import Dropdown from '@/components/common/Dropdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customerRating, optionSupport, paymentSupport, time, transportation } from '@/lib/dropdownItems';
import { scroller, Element } from 'react-scroll';

const TestHY = () => {
  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };
  // 원하는 Element로 이동하는 tab
  function scrollToElement(name: string) {
    scroller.scrollTo(name, {
      duration: 1500,
      delay: 0,
      spy: true,
      offset: -145,
      smooth: 'easeInOutQuart',
    });
  }
  return (
    <>
      {/* dropdown 에시 */}
      {/* @ts-ignore: Unreachable code error */}
      <Dropdown items={paymentSupport} defaultLabel="중도금 무이자" onSelect={handleSelect} />
      {/* @ts-ignore: Unreachable code error */}
      <Dropdown items={optionSupport} defaultLabel="무상제공" onSelect={handleSelect} />
      {/* @ts-ignore: Unreachable code error */}
      <Dropdown items={transportation} defaultLabel="도보" onSelect={handleSelect} />
      {/* @ts-ignore: Unreachable code error */}
      <Dropdown items={time} defaultLabel="00분" onSelect={handleSelect} />
      {/* @ts-ignore: Unreachable code error */}
      <Dropdown items={customerRating} defaultLabel="고객등급" onSelect={handleSelect} />

      {/* 화면이 바뀌는 tab */}
      <div className="max-w-[1000px]">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="flex">
            <TabsTrigger value="caseOpen">상담대기</TabsTrigger>
            <TabsTrigger value="caseClosed">상담완료</TabsTrigger>
            <TabsTrigger value="caseClosed2">상담완료</TabsTrigger>
          </TabsList>
          <TabsContent value="caseOpen">상담대기 내역 표시</TabsContent>
          <TabsContent value="caseClosed">상담완료 내역 표시</TabsContent>
        </Tabs>

        {/* 스크롤 기능 tab */}
        <div className="sticky top-[92px] bg-static-white mt-4 z-50">
          <Tabs defaultValue="account" className="w-full bg-static-white">
            <TabsList className="flex">
              <TabsTrigger value="caseOpen" onClick={() => scrollToElement('category2')}>
                상담대기
              </TabsTrigger>
              <TabsTrigger value="caseClosed" onClick={() => scrollToElement('category3')}>
                상담완료
              </TabsTrigger>
              <TabsTrigger value="caseClosed2">상담완료</TabsTrigger>
              <TabsTrigger value="caseClosed3">상담완료</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 스크롤 컴포넌트 지정 */}
        <Element name="category0" className="flex h-[200px] bg-highlight-base">
          category0
        </Element>
        <Element name="category2" className="flex h-[200px] bg-secondary-base">
          category1
        </Element>
        <Element name="category3" className="flex h-[200px] bg-accent-normal">
          category2
        </Element>
      </div>
    </>
  );
};

export default TestHY;
