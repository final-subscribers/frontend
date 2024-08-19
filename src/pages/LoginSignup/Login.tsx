import { Link } from 'react-router-dom';
import buildingImg from '../../assets/buildings.svg';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <main className="flex w-full h-[1080px] items-center justify-center">
      <section className="flex max-w-[1536px] py-[80px] justify-center gap-[64px]">
        <div className="hidden desktop:block">
          <article className="flex-col w-[896px]">
            <h1 className="mb-10 font-pretendard font-bold text-heading-base leading-[150%]">
              미분양 플랫폼 <br />
              클리어 분양에 오신 것을 환영합니다
            </h1>
            <p className="mb-20 font-pretendard font-normal text-body-lg leading-[150%]">
              고객과 분양 대행사 /건설사와의 보다 쉬운 연결을 추구합니다 <br />
              담당자에게 미분양 매물의 상세한 안내를 받아보세요 <br />
              미분양 매물을 고객에게 홍보해보세요 <br />
              성공적인 분양을 이끌어 낼 수 있습니다
            </p>
            <img className="mx-auto place-content-center" src={buildingImg} alt="buildings"></img>
          </article>
        </div>
        <div className="flex justify-center w-full mobile:text-heading-sm">
          <form className="flex flex-col p-16 mobile:p-5 w-[576px] mobile:w-full rounded-[32px] shadow-[0_4px_40px_0_rgba(70,69,107,0.15)] mobile:shadow-none">
            <h1 className="mb-8 text-center font-pretendard font-bold text-heading-lg mobile:text-heading-sm leading-[150%]">
              로그인
            </h1>
            <label className="font-pretendard font-bold text-title-base mobile:text-title-base-m">
              <span className="inline-block py-5">이메일(아이디)</span>
              <input
                className="mb-10 w-full h-[53px] mobile:h-[47px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                type="text"
                placeholder="이메일(아이디)을 입력해주세요"
              />
            </label>
            <label className="font-pretendard font-bold text-title-base mobile:text-title-base-m">
              <span className="inline-block py-5">비밀번호</span>
              <input
                className="mb-16 w-full h-[53px] mobile:h-[47px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </label>
            <Button type="submit">로그인</Button>
            <div className="flex mt-[60px] gap-4">
              <Link to="/signup-terms" className="w-1/2">
                <button
                  type="submit"
                  className=" w-full px-8 py-5 mobile:px-7 mobile:py-4 border rounded-5 font-pretendard font-bold text-label-lg mobile:text-label-lg-m">
                  고객으로 가입하기
                </button>
              </Link>
              <Link to="/signup-terms" className="w-1/2">
                <button
                  type="submit"
                  className=" w-full px-8 py-5 mobile:px-7 mobile:py-4 border rounded-5 font-pretendard font-bold text-label-lg mobile:text-label-lg-m">
                  담당자로 가입하기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
