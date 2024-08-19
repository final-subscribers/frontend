import termsGray from '../../assets/stepper-terms-gray.svg';
import termsBlue from '../../assets/stepper-terms-blue.svg';
import termsMobileBlue from '../../assets/stepper-one-blue.svg';
import termsMobileGray from '../../assets/stepper-one-gray.svg';
import signupGray from '../../assets/stepper-signup-gray.svg';
import signupBlue from '../../assets/stepper-signup-blue.svg';
import signupMobileBlue from '../../assets/stepper-two-blue.svg';
import signupMobileGray from '../../assets/stepper-two-gray.svg';
import verifyGray from '../../assets/stepper-verify-gray.svg';
import verifyBlue from '../../assets/stepper-verify-blue.svg';
import verifyMobileBlue from '../../assets/stepper-three-blue.svg';
import verifyMobileGray from '../../assets/stepper-three-gray.svg';
import completedGray from '../../assets/stepper-completed-gray.svg';
import completedBlue from '../../assets/stepper-completed-blue.svg';
import completedMobileBlue from '../../assets/stepper-four-blue.svg';
import completedMobileGray from '../../assets/stepper-four-gray.svg';
import Stepper from '../../components/LoginSignup/Stepper';
import Input from '@/components/LoginSignup/Input';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      <section className="flex flex-col max-w-[1536px] py-[80px] justify-center gap-y-16">
        <article className="flex justify-center">
          <h1 className="font-pretendard font-bold text-heading-lg mobile:text-heading-sm">담당자 인증</h1>
        </article>
        <article className="flex justify-center items-center">
          <Stepper
            stepPath="/signup-terms"
            blueIcon={termsBlue}
            grayIcon={termsGray}
            mobileBlueIcon={termsMobileBlue}
            mobileGrayIcon={termsMobileGray}
            text="약관동의"
          />
          <div className="h-[1px] m-[10px] mobile:m-2 w-8 mobile:w-4 bg-neutral-400"></div>
          <Stepper
            stepPath="/signup"
            blueIcon={signupBlue}
            grayIcon={signupGray}
            mobileBlueIcon={signupMobileBlue}
            mobileGrayIcon={signupMobileGray}
            text="회원가입"
          />
          <div className="h-[1px] m-[10px] mobile:m-2 w-8 mobile:w-4 bg-neutral-400"></div>
          <Stepper
            stepPath="/admin-verify"
            blueIcon={verifyBlue}
            grayIcon={verifyGray}
            mobileBlueIcon={verifyMobileBlue}
            mobileGrayIcon={verifyMobileGray}
            text="담당자 인증"
          />
          <div className="h-[1px] m-[10px] mobile:m-2 w-8 mobile:w-4 bg-neutral-400"></div>
          <Stepper
            stepPath="/signup-completed"
            blueIcon={completedBlue}
            grayIcon={completedGray}
            mobileBlueIcon={completedMobileBlue}
            mobileGrayIcon={completedMobileGray}
            text="가입완료"
          />
        </article>
        <article className="flex flex-col w-[720px] gap-y-9">
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
          <Link to="/signup-terms" className="w-[190px]">
            <Button className="w-full" variant="assistive">
              이전
            </Button>
          </Link>
          <Link to="/signup-completed" className="w-[190px]">
            <Button className="w-full">다음</Button>
          </Link>
        </article>
      </section>
    </main>
  );
}
