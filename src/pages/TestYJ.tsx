import ItemCard from '@/components/common/ItemCard';
import Toast from '@/components/common/Toast';
import SelectedMenu from '@/components/LandList/SelectedMenu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const TestYJ = () => {
  const [isToast, setIsToast] = useState(false);
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);
  const showToast = () => {
    setIsToast(!isToast);
  };
  const showMenu = () => {
    setIsSelectedMenu(!isSelectedMenu);
  };
  const hideMenu = () => {
    setIsSelectedMenu(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button variant="assistive" size="sm" onClick={showToast}>
          Toast
        </Button>
        <Button variant="assistive" size="sm" onClick={showMenu}>
          Menu
        </Button>
        <SelectedMenu isOpen={isSelectedMenu} onClose={hideMenu} />
      </div>
      {isToast && <Toast setIsToast={setIsToast} />}

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
