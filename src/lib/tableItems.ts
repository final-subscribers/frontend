interface ConsultingPending {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt: string;
  consultant: string;
  contents: string;
}
interface ConsultingCompleted {
  name: string;
  tier: string;
  phoneNumber: string;
  createdAt: string;
  completedAt: string;
  consultant: string;
  contents: string;
}
interface MyProperty {
  id: number;
  name: string;
  total_number: number;
  pending: number;
  status: string;
  created_at: string;
  end_date: string;
}

export const consultingPending: ConsultingPending[] = [
  {
    name: '이현숙',
    phoneNumber: '010-9748-5428',
    createdAt: '2024-03-24',
    preferredAt: '2024-09-02',
    consultant: '',
    contents: '',
  },
  {
    name: '이율곡',
    phoneNumber: '010-5543-4847',
    createdAt: '2024-03-24',
    preferredAt: '2024-10-02',
    consultant: '',
    contents: '',
  },
  {
    name: '세종대왕',
    phoneNumber: '010-2354-5634',
    createdAt: '2024-03-24',
    preferredAt: '2024-11-02',
    consultant: '',
    contents: '',
  },
  {
    name: '이순신',
    phoneNumber: '010-8763-5623',
    createdAt: '2024-03-24',
    preferredAt: '2024-09-02',
    consultant: '',
    contents: '',
  },
  {
    name: '이순신',
    phoneNumber: '010-8763-5623',
    createdAt: '2024-03-24',
    preferredAt: '2024-09-02',
    consultant: '',
    contents: '',
  },
  {
    name: '이순신',
    phoneNumber: '010-8763-5623',
    createdAt: '2024-03-24',
    preferredAt: '2024-09-02',
    consultant: '',
    contents: '',
  },
];

export const consultingCompleted: ConsultingCompleted[] = [
  {
    name: '이현숙',
    tier: 'S등급',
    phoneNumber: '010-9748-5428',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
  {
    name: '이율곡',
    tier: 'S등급',
    phoneNumber: '010-5543-4847',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
  {
    name: '세종대왕',
    tier: 'S등급',
    phoneNumber: '010-2354-5634',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
  {
    name: '세종대왕',
    tier: 'S등급',
    phoneNumber: '010-2354-5634',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
  {
    name: '세종대왕',
    tier: 'S등급',
    phoneNumber: '010-2354-5634',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
  {
    name: '이순신',
    tier: 'S등급',
    phoneNumber: '010-8763-5623',
    createdAt: '2024-03-24',
    completedAt: '2024-09-02',
    consultant: 'a1-2',
    contents: '',
  },
];
export const myProperty: MyProperty[] = [
  {
    id: 13,
    name: '다산신도시',
    total_number: 345,
    pending: 5,
    status: '모집중',
    created_at: '2024-07-20',
    end_date: '2024-09-20',
  },
  {
    id: 14,
    name: '양주신도시',
    total_number: 345,
    pending: 5,
    status: '모집중',
    created_at: '2024-07-20',
    end_date: '2024-09-20',
  },
  {
    id: 15,
    name: '계양 학마을서원',
    total_number: 345,
    pending: 5,
    status: '모집중',
    created_at: '2024-07-20',
    end_date: '2024-09-20',
  },
];
