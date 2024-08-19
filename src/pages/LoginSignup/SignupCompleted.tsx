import bigcheckImg from '../../assets/bigcheck.svg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SignupCompleted() {
  return (
    <main className="flex w-full min-h-[900px] items-center justify-center">
      <section className="flex flex-col max-w-[1536px] justify-center gap-y-9">
        <img className="mx-auto" src={bigcheckImg} alt="bigcheck" />
        <h1 className="text-center font-pretendard font-bold text-heading-base">
          홍수철님, 환영합니다!
          <br />
          회원가입이 완료되었어요
        </h1>
        <p className="text-center font-pretendard font-normal text-body-lg">
          회원가입 완료는 <strong>최대 5일</strong> 정도 소요될 수 있습니다.
        </p>
        <article className="flex w-[720px] mt-[80px] mx-auto justify-center gap-6">
          <Link to="/" className="w-[190px]">
            <Button className="w-full" variant="assistive">
              홈으로 이동
            </Button>
          </Link>
          <Link to="/login" className="w-[190px]">
            <Button className="w-full">로그인</Button>
          </Link>
        </article>
      </section>
    </main>
  );
}
