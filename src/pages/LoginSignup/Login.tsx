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
          <article>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </article>
        </section>
      </main>
    </>
  );
}
