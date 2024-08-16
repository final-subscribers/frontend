import './App.css';
import { z } from 'zod';
import { InputField } from './components/common/InputField';
import { Button } from './components/ui/button';
import { InputFieldWithBtn } from './components/common/InputFieldWithBtn';

const nameSchema = z.string().min(2, '이름은 2글자 이상이어야 합니다.');
const emailSchema = z.string().email('유효하지 않은 이메일 형식입니다.');
const passwordSchema = z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.');
function App() {
  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default App;
