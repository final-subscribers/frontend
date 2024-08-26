import KeywordToggleList from '@/components/KeywordToggleList';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import createToggleIcons from '@/constants/keywordIconMap';
import { useState } from 'react';

const data = {
  infra: [
    {
      name: 'SUBWAY',
      type: 'infra',
      input: [
        {
          input1: '2호선 강남역',
          input2: '차량',
          input3: '15m',
        },
        {
          input1: '잠실역',
          input2: '도보',
          input3: '20m',
        },
      ],
      is_searchable: false,
    },
    {
      name: 'HOSPITAL',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'PARK',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'SHOPPING',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'SCHOOL',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'LIBRARY',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'PUBLIC_FACILITIES',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'GOVERNMENT',
      type: 'infra',
      input: [
        {
          input1: '강남 성심 병원',
          input2: '차량',
          input3: '20m',
        },
      ],
      is_searchable: true,
    },
  ],
  benefit: [
    // 혜택 키워드들
    {
      name: 'DISCOUNT_SALE',
      type: 'benefit',
      input: [
        {
          input1: '20',
          input2: '30',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'BALANCE_DEFERRAL',
      type: 'benefit',
      input: [
        {
          input1: '60',
          input2: '6',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'CASH_PAYMENT',
      type: 'benefit',
      input: 100,
      is_searchable: false,
    },
    {
      name: 'GUARANTEED_PAYMENT',
      type: 'benefit',
      input: 100,
      is_searchable: true,
    },
    {
      name: 'SUPPORT_PAYMENT',
      type: 'benefit',
      input: [
        {
          input1: '무이자',
          input2: '60',
        },
      ],
      is_searchable: true,
    },
    {
      name: 'OPTION_PAYMENT',
      type: 'benefit',
      input: [
        {
          input1: '무상제공',
          input2: '냉장고',
        },
        {
          input1: '사은품',
          input2: '냄비',
        },
      ],
      is_searchable: false,
    },
  ],
};

const TestMS = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const handleToggle = (title: string) => {
    setActiveItems((prevState) =>
      prevState.includes(title) ? prevState.filter((item) => item !== title) : [...prevState, title],
    );
  };
  const { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 } = createToggleIcons();
  return (
    <>
      <div className="max-w-[1200px]">
        <p className="text-title-2xl">혜택</p>
        <KeywordToggleList list={toggleIcon1} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">인프라</p>
        <KeywordToggleList list={toggleIcon2} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">분양 형태</p>
        <KeywordToggleList list={toggleIcon3} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">분양 유형</p>
        <KeywordToggleList list={toggleIcon4} onToggle={handleToggle} activeItems={activeItems} />
      </div>

      <PropertyKeyword type="infra" data={data.infra} />
      <PropertyKeyword type="benefit" data={data.benefit} />
    </>
  );
};

export default TestMS;
