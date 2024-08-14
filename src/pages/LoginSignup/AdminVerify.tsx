import termsBlue from '../../assets/stepper-terms-blue.svg';
import signupGray from '../../assets/stepper-signup-gray.svg';
import verifyGray from '../../assets/stepper-verify-gray.svg';
import completedGray from '../../assets/stepper-completed-gray.svg';
import Stepper from '../../components/LoginSignup/Stepper';
import Input from '@/components/LoginSignup/Input';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const inputFields = [
  { title: '소속 회사', placeholder: '소속 회사를 입력해주세요' },
  { title: '담당 업무', placeholder: '담당 업무를 입력해주세요' },
  { title: '회사 메일', placeholder: '회사 메일을 입력해주세요' },
];

export default function AdminVerify() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="flex w-full justify-center">
      <section className="flex-col max-w-[1536px] py-[80px] justify-center">
        <article className="mb-16 flex justify-center">
          <h1 className="font-pretendard font-bold text-heading-lg">담당자 인증</h1>
        </article>
        <article className="mb-16 flex justify-center items-center">
          <Stepper img={termsBlue} text="약관동의" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={signupGray} text="회원가입" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={verifyGray} text="담당자 인증" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={completedGray} text="가입완료" />
        </article>
        <article className="flex mb-16 flex-col w-[720px] gap-y-9">
          {inputFields.map((field, index) => (
            <Input key={index} title={field.title} placeholder={field.placeholder} />
          ))}
          <div className="flex">
            <label className="flex-col font-pretendard font-bold text-title-base">
              <span className="inline-block my-5">매물 증명</span>
              <div className="flex gap-4">
                <input className="hidden" type="file" ref={fileInputRef} />
                <div className="w-[589px] h-[53px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg text-neutral-40">
                  매물 증명을 위한 파일을 첨부해주세요
                </div>
                <button
                  className="w-[119px] h-[53px] px-4 py-3 border rounded-5 font-pretendard font-bold text-primary-50"
                  onClick={handleFileBtnClick}>
                  파일 첨부
                </button>
              </div>
            </label>
          </div>
        </article>
        <article className="flex w-[720px] mx-auto justify-center gap-6">
          <button className="w-[190px] h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold">
            이전
          </button>
          <Link to="/signup-completed">
            <button className="w-[190px] h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold text-white bg-primary-50">
              다음
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
