import { Button } from '../ui/button';
import { X } from '@phosphor-icons/react';

export default function NewCustomer() {
  const handleClose = () => {
    window.close();
  };

  return (
    <main className="flex flex-col z-50 items-center py-9 w-[517px] h-[830px]">
      <div className="flex w-full justify-end py-2 px-8 h-[32px]">
        <X size={32} weight="light" className="text-assistive-strong cursor-pointer" onClick={handleClose} />
      </div>
      <section className="w-[424px]">
        <Button variant="primary" size="xl" className="flex mx-auto">
          상담하기
        </Button>
      </section>
    </main>
  );
}
