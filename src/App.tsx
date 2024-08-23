import './App.css';
import { z } from 'zod';
import { InputField } from './components/common/InputField';
import { Button } from './components/ui/button';
import { InputFieldWithBtn } from './components/common/InputFieldWithBtn';
import ItemCard from './components/common/ItemCard';
import { Label } from './components/ui/label';
import Dropdown from './components/common/Dropdown';
import { paymentSupport, optionSupport, transportation, time, customerRating } from './lib/dropdownItems';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { scroller, Element } from 'react-scroll';
import { columns } from './components/ui/columns';
import { DataTable } from './components/common/DataTable';
import { consultingList } from './lib/tableItems';

const nameSchema = z.string().min(2, '이름은 2글자 이상이어야 합니다.');
const emailSchema = z.string().email('유효하지 않은 이메일 형식입니다.');
const passwordSchema = z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.');

// table에 사용하는 데이터
const data = consultingList.map((consulting) => ({
  id: consulting.id,
  customerName: consulting.customerName,
  phoneNumber: consulting.phoneNumber,
  contactDate: consulting.contactDate,
  appointmentDate: consulting.appointmentDate,
  operatorId: consulting.operatorId,
  contents: consulting.contents,
}));

function App() {
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
      <div className="h-[5000px]">
        <InputField
          type="text"
          label="이름"
          validationSchema={nameSchema}
          success="유효한 이름입니다."
          placeholder="이름을 입력해주세요."
        />
        <InputFieldWithBtn
          type="text"
          label="이메일(아이디)"
          btnLabel="이메일 인증"
          validationSchema={emailSchema}
          success="유효한 이메일형식입니다."
          placeholder="이메일을 입력해주세요."
        />
        <InputField
          type="password"
          label="비밀번호"
          validationSchema={passwordSchema}
          success="유효하지 않은 비밀번호입니다."
          placeholder="비밀번호를 입력해주세요."
        />
        <InputField
          type="password"
          label="비밀번호 확인"
          validationSchema={nameSchema}
          success="비밀번호가 일치하지 않습니다."
          placeholder="비밀번호를 입력해주세요."
        />

        <div className="flex gap-4">
          <Button>확인</Button>
          <Button variant="outline">확인</Button>
          <Button variant="assistive" size="sm">
            확인
          </Button>
        </div>
        <Button variant="assistive" size="sm">
          확인
        </Button>
        <div className="flex gap-4 bg-slate-200 h-[500px] justify-center items-center">
          <ItemCard
            size="l"
            imageUrl="https://placehold.co/320x180"
            title="계양 학마을서원"
            address="인천시 계양구"
            propertyType="아파트"
            salesType="민간분양"
            totalNumber={100}
            keywords={['할인분양', '지하철역', '병원']}
            price={29800}
            discountPrice={22000}
            like={true}
            rank={1}></ItemCard>
          <ItemCard
            size="s"
            imageUrl="https://placehold.co/320x180"
            title="계양 어떤서원"
            address="인천시 계양구 용종로"
            propertyType="아파트"
            salesType="민간분양"
            totalNumber={100}
            keywords={['할인분양', '쇼핑복합시설', '현금지급']}
            price={29800}
            discountPrice={22000}
            like={false}
            rank={1}></ItemCard>
          <ItemCard
            size="default"
            imageUrl="https://placehold.co/320x180"
            title="계양 어떤서원 말줄임표확인용"
            address="인천시 계양구 용종로"
            status="모집중"></ItemCard>
        </div>
        <div className="font-pretendard">
          <Label size="s" variant="elevated">
            모집중
          </Label>
          <Label size="m" variant="primary">
            모집중
          </Label>
          <Label size="l" variant="secondary">
            모집중
          </Label>
          <Label size="l" variant="space">
            00평
          </Label>
        </div>

        {/* dropdown 에시 */}
        <Dropdown
          items={paymentSupport}
          defaultLabel="중도금 무이자"
          onSelect={handleSelect}
          buttonWidth="w-[176px]"
        />
        <Dropdown
          items={optionSupport}
          defaultLabel="무상제공"
          onSelect={handleSelect}
          buttonWidth="w-[138px]"
        />
        <Dropdown
          items={transportation}
          defaultLabel="도보"
          onSelect={handleSelect}
          buttonWidth="w-[105px]"
        />
        <Dropdown items={time} defaultLabel="00분" onSelect={handleSelect} buttonWidth="w-[112px]" />
        <Dropdown
          items={customerRating}
          defaultLabel="고객등급"
          onSelect={handleSelect}
          buttonWidth="w-[138px]"
        />

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

        {/* table */}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
