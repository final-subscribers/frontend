// src/constants/dataMap.ts

// 데이터 타입 정의
type DataKey =
  // 혜택
  | 'DISCOUNT_SALE'
  | 'BALANCE_DEFERRAL'
  | 'CASH_PAYMENT'
  | 'GUARANTEED_PAYMENT'
  | 'SUPPORT_PAYMENT'
  | 'OPTION_PAYMENT'
  // 인프라
  | 'SUBWAY'
  | 'HOSPITAL'
  | 'PARK'
  | 'SHOPPING'
  | 'SCHOOL'
  | 'LIBRARY'
  | 'PUBLIC_FACILITIES'
  | 'GOVERNMENT'
  // 분양 형태
  | 'APARTMENT'
  | 'OFFICETEL'
  | 'VILLA'
  | 'URBAN_HOUSING'
  | 'LIVING_ACCOMMODATION'
  | 'DOWNTOWN'
  // 분양 유형
  | 'PRIVATE_SALE'
  | 'PUBLIC_SALE'
  | 'LEASE_SALE';

// 데이터 값 정의
type PropertyDataMap = {
  [key in DataKey]: string;
};

// 데이터 객체
const propertyDataMap: PropertyDataMap = {
  // 혜택
  DISCOUNT_SALE: '할인 분양',
  BALANCE_DEFERRAL: '잔금 유예',
  CASH_PAYMENT: '현금 지급',
  GUARANTEED_PAYMENT: '계약금 안심 보장',
  SUPPORT_PAYMENT: '중도금 지원',
  OPTION_PAYMENT: '옵션 지급',
  // 인프라
  SUBWAY: '지하철역',
  HOSPITAL: '병원',
  PARK: '숲공원',
  SHOPPING: '쇼핑',
  SCHOOL: '학교',
  LIBRARY: '도서관',
  PUBLIC_FACILITIES: '공공시설',
  GOVERNMENT: '관공서',
  // 분양 형태
  APARTMENT: '아파트',
  OFFICETEL: '오피스텔',
  VILLA: '빌라',
  URBAN_HOUSING: '도시형 생활 주택',
  LIVING_ACCOMMODATION: '생활 숙박 시설',
  DOWNTOWN: '상가/업무',
  // 분양 유형
  PRIVATE_SALE: '민간분양',
  PUBLIC_SALE: '공공분양',
  LEASE_SALE: '임대 분양',
};

export default propertyDataMap;
