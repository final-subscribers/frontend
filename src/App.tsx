import './App.css';
import { z } from 'zod';
import { InputField } from './components/common/InputField';
import { Button } from './components/ui/button';
import { InputFieldWithBtn } from './components/common/InputFieldWithBtn';
import ItemCard from './components/common/ItemCard';
import { Label } from './components/ui/label';

const nameSchema = z.string().min(2, '이름은 2글자 이상이어야 합니다.');
const emailSchema = z.string().email('유효하지 않은 이메일 형식입니다.');
const passwordSchema = z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.');
function App() {
  return (
    <>
      <div className="h-[1500px]">
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
      </div>
    </>
  );
}

export default App;
