import buildingImg from '../../assets/buildings.svg';

export default function Login() {
  return (
    <>
      <main className="flex min-w-[1280px] h-[1080px] items-center justify-center">
        <section className="flex max-w-[1536px] py-[80px] items-center gap-[64px]">
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
          <form className="flex-col p-16 max-w-[576px] rounded-[32px] shadow-[0_4px_40px_0_rgba(70,69,107,0.15)]">
            <h1 className="mb-8 text-center font-pretendard font-bold text-heading-lg leading-[150%]">
              로그인
            </h1>
            <label className="font-pretendard font-bold text-title-base">
              이메일(아이디)
              <input
                className="mt-3 mb-6 w-full h-[53px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                type="text"
                placeholder="이메일(아이디)을 입력해주세요"
              />
            </label>
            <label className="font-pretendard font-bold text-title-base">
              비밀번호
              <input
                className="mt-3 mb-9 w-full h-[53px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </label>
            <button
              type="submit"
              className="w-full h-[61px] px-4 py-3 bg-primary-50 text-white border rounded-5 font-pretendard font-bold text-label-lg">
              로그인
            </button>
            <div className="flex mt-[60px] gap-4">
              <button
                type="submit"
                className=" w-1/2 h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold text-label-lg">
                고객으로 가입하기
              </button>
              <button
                type="submit"
                className=" w-1/2 h-[61px] px-4 py-3 border rounded-5 font-pretendard font-bold text-label-lg">
                담당자로 가입하기
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
