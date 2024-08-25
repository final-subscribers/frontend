import PropertyKeyword from '@/components/Property/PropertyKeyword';

const data = {
  infra: [
    {
      name: 'SUBWAY',
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
      input: 100,
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
      is_searchable: true,
    },
    {
      name: 'CASH_PAYMENT',
      type: 'benefit',
      input: 100,
      is_searchable: false,
    },
  ],
};

const TestMS = () => {
  return (
    <>
      <PropertyKeyword type="infra" data={data.infra} />
      <PropertyKeyword type="benefit" data={data.benefit} />
    </>
  );
};

export default TestMS;
