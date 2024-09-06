import { myProperty } from '@/lib/tableItems';
import { MyProperty } from '@/components/Table/MyProperty';
import { columnsMyProperty } from '@/components/ui/columnsMyProperyt';
import SampleImg from '../../../public/Imagesample.png';
import Breadcrumb from '@/components/common/Breadcrumb';
// import { Button } from '@/components/ui/button';

// table에 사용하는 데이터
const myPropertyData = myProperty.map((property) => ({
  id: property.id,
  name: property.name,
  total_number: property.total_number,
  pending: property.pending,
  status: property.status,
  created_at: property.created_at,
  end_date: property.end_date,
}));

export default function PropertyManagement() {
  return (
    <main className="flex">
      <section className="container mx-auto py-10 ">
        <Breadcrumb links={['마이페이지', '매물관리']} />
        <article className="flex flex-col mb-10">
          <p className="ml-3 text-body-lg font-normal text-assistive-strong">아파트 민간분양</p>
          <h1 className="ml-3 text-title-2xl font-bold">계양 학마을 서원</h1>
          <div className="flex">
            <img src={SampleImg} className="object-cover w-[320px] h-[180px]" />
          </div>
        </article>
        <MyProperty columns={columnsMyProperty} data={myPropertyData} />
      </section>
    </main>
  );
}
