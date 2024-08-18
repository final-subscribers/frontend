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
import { Link } from 'react-router-dom';
import Stepper from '../../components/LoginSignup/Stepper';

export default function SignupTerms() {
  return (
    <main className="flex w-full justify-center">
      <section className="flex flex-col max-w-[1536px] py-[80px] justify-center gap-y-16">
        <article className="flex justify-center">
          <h1 className="font-pretendard font-bold text-heading-lg mobile:text-heading-sm">약관동의</h1>
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
        <article className="flex flex-col w-[720px] mobile:w-full mobile:p-5 gap-y-9">
          <label className="flex flex-col font-pretendard font-bold text-title-base mobile:text-title-base-m">
            <span className="inline-block py-5">이용약관</span>
            <input
              className="mb-4 w-full h-[140px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
              type="text"
              placeholder="이용약관"
            />
            <div className="flex items-center">
              <input type="radio" className="w-8 h-8 mobile:w-7 mobile:h-7" />
              <span className="ml-4 font-pretendard font-normal text-label-lg mobile:text-label-lg-m">
                동의합니다
              </span>
              <span className="ml-2 font-pretendard font-normal text-label-lg mobile:text-label-lg-m text-primary-50">
                [필수]
              </span>
            </div>
          </label>

          <label className="flex flex-col font-pretendard font-bold text-title-base mobile:text-title-base-m">
            <span className="inline-block py-5">개인정보 처리방침</span>
            <input
              className="mb-4 w-full h-[140px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
              type="text"
              placeholder="개인정보 처리방침"
            />
            <div className="flex items-center">
              <input type="radio" className="w-8 h-8 mobile:w-7 mobile:h-7" />
              <span className="ml-4 font-pretendard font-normal text-label-lg mobile:text-label-lg-m">
                동의합니다
              </span>
              <span className="ml-2 font-pretendard font-normal text-label-lg mobile:text-label-lg-m text-primary-50">
                [필수]
              </span>
            </div>
          </label>
        </article>
        <article className="flex w-[720px] mx-auto justify-center gap-6">
          <Link to="/login" className="w-[190px]">
            <button className="w-full px-8 py-5 border rounded-5 font-pretendard font-bold">이전</button>
          </Link>
          <Link to="/admin-verify" className="w-[190px]">
            <button className="w-full px-8 py-5 border rounded-5 font-pretendard font-bold text-white bg-primary-50">
              다음
            </button>
          </Link>
        </article>
      </section>
    </main>
  );
}
