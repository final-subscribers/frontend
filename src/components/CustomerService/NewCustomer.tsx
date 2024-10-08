import { useState } from 'react';
import { Button } from '../ui/button';
import { X } from '@phosphor-icons/react';
import { Input } from '../ui/input';
import Dropdown from '../common/Dropdown';
import { operatorId, consultingStatus } from '../../lib/dropdownItems';
import { ToggleSmall } from '../ui/toggleSmall';
import { CustomerData } from '@/types/types';
import { DialogClose, DialogTitle } from '@/components/ui/dialogNewCustomer';
import SingleDatePicker from '../common/SingleDatePicker';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { getAuthHeaders } from '@/utils/auth';

interface NewCustomerProps {
  onAddCustomer: (customerData: CustomerData) => void;
  propertyId: number;
}

export default function NewCustomer({ onAddCustomer, propertyId }: NewCustomerProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState<string>('a1-1');
  const [selectedConsultingStatus, setSelectedConsultingStatus] = useState<string>('상담대기');
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [consultingMessage, setConsultingMessage] = useState('');
  const [preferredAt, setPreferredAt] = useState('');

  const handleSelect = (value: string, type: 'consultant' | 'status') => {
    if (type === 'consultant') {
      setSelectedConsultant(value);
    } else if (type === 'status') {
      setSelectedConsultingStatus(value);
    }
  };

  const handleToggle = (item: string) => {
    setSelectedRating((prevItem) => (prevItem === item ? null : item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const customerData: CustomerData = {
      name,
      phoneNumber,
      status: selectedConsultingStatus === '상담대기' ? 'PENDING' : 'COMPLETED',
      consultant: selectedConsultant,
      consultingMessage,
      preferredAt,
      tier: selectedRating || '',
      medium: 'PHONE',
    };
    try {
      await axios.post(`${BASE_URL}/api/admin/properties/${propertyId}/consultations`, customerData, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
    } catch (error) {
      console.error('정상적으로 등록되지 않았습니다:', error);
    }
    onAddCustomer(customerData);
  };

  return (
    <main className="flex flex-col z-50 items-center py-9 max-w-[518px] h-[830px]">
      <DialogClose asChild>
        <div className="flex w-full justify-end py-2 px-8 h-[32px]">
          <X size={32} weight="light" className="text-assistive-strong cursor-pointer" />
        </div>
      </DialogClose>
      <form className="flex flex-col w-[424px] relative">
        <DialogTitle>신규 고객 등록</DialogTitle>
        <label className="py-3">성함</label>
        <Input
          type="text"
          placeholder="성함을 입력해주세요"
          className="py-4 px-5 rounded-5"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label className="py-3 mt-6">연락처</label>
        <Input
          type="text"
          placeholder="연락처를 입력해주세요"
          className="py-4 px-5 rounded-5"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label className="py-3 mt-6">상담사</label>
            <Dropdown
              items={operatorId}
              defaultLabel="a1-1"
              buttonWidth="w-[115px]"
              onSelect={(event) => handleSelect(event, 'consultant')}
            />
          </div>
          <div className="flex flex-col">
            <label className="py-3 mt-6">신청 상태</label>
            <Dropdown
              items={consultingStatus}
              defaultLabel="상담대기"
              buttonWidth="w-[138px]"
              onSelect={(event) => handleSelect(event, 'status')}
            />
          </div>
        </div>
        {selectedConsultingStatus === '상담대기' ? (
          <>
            <label className="py-3 mt-6">희망 상담 일자</label>
            <SingleDatePicker
              defaultLabel="상담날짜 선택"
              onChange={(date) => {
                if (date) {
                  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split('T')[0];
                  // .replace(/-/g, '.');
                  setPreferredAt(localDate);
                } else {
                  setPreferredAt('');
                }
              }}
            />
          </>
        ) : (
          <>
            <label className="py-3 mt-6">고객등급</label>
            <div className="flex gap-3">
              {['S', 'A', 'B', 'C', 'D'].map((item) => (
                <ToggleSmall
                  key={item}
                  variant={selectedRating === item ? 'fill' : 'default'}
                  onClick={() => handleToggle(item)}>
                  {item}
                </ToggleSmall>
              ))}
            </div>
          </>
        )}
        <label className="py-3 mt-6">상담원 상담 메모</label>
        <textarea
          className="p-6 h-[214px] border rounded-6"
          placeholder="상담 내용을 입력해주세요"
          value={consultingMessage}
          onChange={(event) => setConsultingMessage(event.target.value)}></textarea>
        <DialogClose asChild>
          <div className="bg-static-white sticky bottom-0 w-full py-8 px-8">
            <Button onClick={handleSubmit} variant="primary" size="xl" className="flex mx-auto">
              등록하기
            </Button>
          </div>
        </DialogClose>
      </form>
    </main>
  );
}

// request
// {
// 	"name": "valid test", //고객 이름, not null
// 	"phoneNumber": "01043613859", //고객 번호 not null
// 	"status":"pending",  // 상태 not null
// 	"consultant":"a-45", //상담사 not null
// 	"consultingMessage":"ㅇㅇ", //상담사 메세지
// 	"preferredAt": "2024-09-02", //상담 희망 날짜 not null
// 	"tier" : "", // 등급
// 	"medium" : "LMS" // 매체 //not null
// }
