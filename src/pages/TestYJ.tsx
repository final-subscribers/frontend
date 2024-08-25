import ItemCard from '@/components/common/ItemCard';
import { Label } from '@/components/ui/label';

const TestYJ = () => {
  return (
    <>
      <div className="flex gap-4 bg-slate-200 h-[500px] justify-center items-center">
        <ItemCard
          size="l"
          imageUrl="https://placehold.co/320x180"
          title="계양 학마을서원"
          address="인천시 계양구"
          propertyType="아파트"
          salesType="민간분양"
          totalNumber={100}
          keywords={['할인분양', '지하철역', '병원']}
          price={29800}
          discountPrice={22000}
          like={true}
          rank={1}></ItemCard>
        <ItemCard
          size="s"
          imageUrl="https://placehold.co/320x180"
          title="계양 어떤서원"
          address="인천시 계양구 용종로"
          propertyType="아파트"
          salesType="민간분양"
          totalNumber={100}
          keywords={['할인분양', '쇼핑복합시설', '현금지급']}
          price={29800}
          discountPrice={22000}
          like={false}
          rank={1}></ItemCard>
        <ItemCard
          size="default"
          imageUrl="https://placehold.co/320x180"
          title="계양 어떤서원 말줄임표확인용"
          address="인천시 계양구 용종로"
          status="모집중"></ItemCard>
      </div>
      <div className="font-pretendard">
        <Label size="s" variant="elevated">
          모집중
        </Label>
        <Label size="m" variant="primary">
          모집중
        </Label>
        <Label size="l" variant="secondary">
          모집중
        </Label>
        <Label size="l" variant="space">
          00평
        </Label>
      </div>
    </>
  );
};

export default TestYJ;
