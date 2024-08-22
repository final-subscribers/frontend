import { Link } from 'react-router-dom';
import buildingImg from '../../assets/buildings.svg';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  email: string;
  password: string;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!data.email && !data.password) {
      setError('root', {
        message: '이메일과 비밀번호를 입력해주세요.',
      });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (err) {
      setError('root', {
        message: `아이디 또는 비밀번호가 잘못되었습니다.\n아이디와 비밀번호를 정확히 입력해주세요.`,
      });
    }
  };

  return (
    <main className="flex w-full h-[1080px] items-center justify-center">
      <section className="flex max-w-[1536px] py-[80px] justify-center items-center gap-[64px]">
        <div className="hidden desktop:block">
          <article className="flex-col w-[896px]">
            <h1 className="mb-10 font-pretendard text-static-default font-bold text-heading-base leading-[150%]">
              미분양 플랫폼 <br />
              클리어 분양에 오신 것을 환영합니다
            </h1>
            <p className="mb-20 font-pretendard text-static-default font-normal text-body-lg leading-[150%]">
              고객과 분양 대행사 /건설사와의 보다 쉬운 연결을 추구합니다 <br />
              담당자에게 미분양 매물의 상세한 안내를 받아보세요 <br />
              미분양 매물을 고객에게 홍보해보세요 <br />
              성공적인 분양을 이끌어 낼 수 있습니다
            </p>
            <img className="mx-auto place-content-center" src={buildingImg} alt="buildings"></img>
          </article>
        </div>
        <div className="flex justify-center w-full mobile:text-heading-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-16 mobile:p-5 w-[576px] mobile:w-full rounded-[32px] shadow-[0_4px_40px_0_rgba(70,69,107,0.15)] mobile:shadow-none">
            <h1 className="mb-8 text-center font-pretendard font-bold text-static-default text-heading-lg mobile:text-heading-sm leading-[150%]">
              로그인
            </h1>
            <label className="font-pretendard font-bold text-title-base mobile:text-title-base-m">
              <span className="inline-block text-static-default py-5">이메일(아이디)</span>
              <input
                className="mb-6 w-full h-[53px] mobile:h-[47px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                {...register('email', { required: '아이디를 입력해주세요' })}
                type="text"
                placeholder="이메일(아이디)을 입력해주세요"
                onFocus={() => clearErrors('root')}
              />
            </label>
            <label className="font-pretendard font-bold text-title-base mobile:text-title-base-m">
              <span className="inline-block text-static-default py-5">비밀번호</span>
              <input
                className="mb-24 w-full h-[53px] mobile:h-[47px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                {...register('password', { required: '비밀번호를 입력해주세요', minLength: 10 })}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onFocus={() => clearErrors('root')}
              />
            </label>
            <div className="relative h-[29px] bottom-14">
              {errors.root ? (
                <pre className="relative bottom-3 h-[29px] text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.root.message}
                </pre>
              ) : errors.email ? (
                <div className="text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.email.message}
                </div>
              ) : errors.password ? (
                <div className="text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.password.message}
                </div>
              ) : null}
            </div>
            {/* <div className="relative h-[29px] bottom-16">
              {errors.email && (
                <div className=" text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.email.message}
                </div>
              )}
              {errors.password && (
                <div className=" text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.password.message}
                </div>
              )}
              {errors.root && (
                <pre className="h-[29px] text-accent-error font-pretendard font-normal text-label-lg">
                  {errors.root.message}
                </pre>
              )}
            </div> */}
            <Button disabled={isSubmitting} type="submit">
              로그인
            </Button>
            <div className="flex mt-[60px] gap-4">
              <Link to="/signup-terms" className="w-1/2">
                <button
                  type="button"
                  className=" w-full px-8 py-5 mobile:px-7 mobile:py-4 border rounded-5 font-pretendard text-static-default font-bold text-label-lg mobile:text-label-lg-m">
                  고객으로 가입하기
                </button>
              </Link>
              <Link to="/signup-terms" className="w-1/2">
                <button
                  type="button"
                  className=" w-full px-8 py-5 mobile:px-7 mobile:py-4 border rounded-5 font-pretendard text-static-default font-bold text-label-lg mobile:text-label-lg-m">
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
