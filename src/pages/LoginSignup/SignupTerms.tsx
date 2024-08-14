import termsBlue from '../../assets/stepper-terms-blue.svg';
import signupGray from '../../assets/stepper-signup-gray.svg';
import verifyGray from '../../assets/stepper-verify-gray.svg';
import completedGray from '../../assets/stepper-completed-gray.svg';
import Stepper from '../../components/LoginSignup/Stepper';
import { Link } from 'react-router-dom';

export default function SignupTerms() {
  return (
    <main className="flex w-full justify-center">
      <section className="flex flex-col max-w-[1536px] py-[80px] justify-center gap-y-16">
        <article className="flex justify-center">
          <h1 className="font-pretendard font-bold text-heading-lg">약관동의</h1>
        </article>
        <article className="flex justify-center items-center">
          <Stepper img={termsBlue} text="약관동의" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={signupGray} text="회원가입" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={verifyGray} text="담당자 인증" />
          <div className="h-[1px] w-8 bg-neutral-400"></div>
          <Stepper img={completedGray} text="가입완료" />
        </article>
        <article className="flex flex-col w-[720px] gap-y-9">
          <label className="flex-col font-pretendard font-bold text-title-base">
            이용약관
            <input
              className="mt-3 mb-4 w-[720px] h-[140px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
              type="text"
              placeholder="이용약관"
            />
            <div className="flex items-center">
              <input type="radio" className="w-8 h-8" />
              <span className="ml-4 font-pretendard font-normal text-label-lg">동의합니다</span>
              <span className="ml-2 font-pretendard font-normal text-label-lg text-primary-50">[필수]</span>
            </div>
          </label>

          <label className="flex-col font-pretendard font-bold text-title-base">
            개인정보 처리방침
            <input
              className="mt-3 mb-4 w-[720px] h-[140px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
              type="text"
              placeholder="개인정보 처리방침"
            />
            <div className="flex items-center">
              <input type="radio" className="w-8 h-8" />
              <span className="ml-4 font-pretendard font-normal text-label-lg">동의합니다</span>
              <span className="ml-2 font-pretendard font-normal text-label-lg text-primary-50">[필수]</span>
            </div>
          </label>
        </article>
        <article className="flex w-[720px] mx-auto justify-center gap-6">
          <button className="w-[190px] h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold">
            이전
          </button>
          <Link to="/admin-verify">
            <button className="w-[190px] h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold text-white bg-primary-50">
              다음
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
