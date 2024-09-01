// import { consultingPending } from '@/lib/tableItems';
import { Button } from '../ui/button';
import { X } from '@phosphor-icons/react';

export interface CustomerInquiryProps {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt?: string;
  completedAt?: string;
}

export default function CustomerInquiry({ name, phoneNumber, createdAt, preferredAt }: CustomerInquiryProps) {
  const handleClose = () => {
    window.close();
  };

  return (
    <main className="flex flex-col items-center py-9 w-[517px] h-[830px]">
      <div className="flex w-full justify-end py-2 px-8 h-[32px]">
        <X size={32} weight="light" className="text-assistive-strong cursor-pointer" onClick={handleClose} />
      </div>
      <section className="w-[424px]">
        <h1 className="py-6 text-title-2xl font-bold text-static-default">{name} 님</h1>
        <article className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">연락처</span>
            <span className="text-body-lg font-normal text-assistive-detail">관심 매물</span>
            <span className="text-body-lg font-normal text-assistive-detail">상담신청 일자</span>
            <span className="text-body-lg font-bold text-primary-default">희망상담 일자</span>
          </div>
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">{phoneNumber}</span>
            <span className="text-body-lg font-normal text-assistive-detail">관심 매물</span>
            <span className="text-body-lg font-normal text-assistive-detail">{createdAt}</span>
            <span className="text-body-lg font-bold text-primary-default">{preferredAt}</span>
          </div>
        </article>
        <div className="h-[1px] bg-assistive-divider w-full my-10"></div>
        <p className="py-5 text-title-base font-bold text-static-default">문의사항</p>
        <textarea className="w-[424px] h-[214px] p-6 border rounded-6 mb-6"></textarea>
        <Button variant="primary" size="xl" className="flex mx-auto">
          상담하기
        </Button>
      </section>
    </main>
  );
}
