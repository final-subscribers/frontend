// import { useConsultPendingSummaries } from '@/api/consulting';
import { ComponentType } from 'react';
import { ConsultingPending } from '@/components/Table/ConsultingPending';
import { CustomerData } from '@/types/types';
import { ConsultingCompleted } from '@/components/Table/ConsultingCompleted';
import { columnsPending } from '@/components/ui/columnsPending';
import { columnsCompleted } from '@/components/ui/columnsCompleted';
import { consultingCompleted } from '@/lib/tableItems';
import { consultingPending } from '@/lib/tableItems';
import CustomerInquiry from '@/components/CustomerService/CustomerInquiry';
import ReactDOM from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerInquiryProps } from '@/components/CustomerService/CustomerInquiry';
import { ListDashes, Plus } from '@phosphor-icons/react';
import AccordionMenu from '@/components/CustomerService/AccordionMenu';
import SampleImg from '../../../public/Imagesample.png';
import { Button } from '@/components/ui/button';
import NewCustomer from '@/components/CustomerService/NewCustomer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

// table에 사용하는 데이터

const consultingPendingData = consultingPending.map((consulting) => ({
  name: consulting.name,
  phoneNumber: consulting.phoneNumber,
  createdAt: consulting.createdAt,
  preferredAt: consulting.preferredAt,
  consultant: consulting.consultant,
  addConsultation: consulting.addConsultation,
}));

const consultingCompletedData = consultingCompleted.map((consulting) => ({
  name: consulting.name,
  tier: consulting.tier,
  phoneNumber: consulting.phoneNumber,
  createdAt: consulting.createdAt,
  completedAt: consulting.completedAt,
  consultant: consulting.consultant,
  contents: consulting.contents,
}));

const sections = [
  {
    title: '모집중',
    items: ['계양 학마을 서원', '반포 더숲 자이', '화곡 보눔하우스'],
  },
  {
    title: '모집 완료',
    items: ['발산 엘크루', '산곡 포레스트 푸르지오', '양평 리버사이드'],
  },
];

export default function CustomerService() {
  // const { data: consultPendingData = [], isLoading, error } = useConsultPendingSummaries();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;

  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const addNewCustomer = (newCustomer: CustomerData) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  // popup 윈도우
  const openPopupWindow = <P extends {}>(
    Component: ComponentType<P>,
    props: P,
    title: string = 'Popup',
    width: number = 420,
    height: number = 665,
  ) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);

    if (popupWindow) {
      popupWindow.document.write(`
		<html>
			<head>
				<title>${title}</title>
				<link href="/src/index.css" rel="stylesheet">
			</head>
			<body>
				<div id="popup-root"></div>
			</body>
		</html>
	`);
      popupWindow.document.close();

      popupWindow.onload = () => {
        const popupRoot = popupWindow.document.getElementById('popup-root');
        if (popupRoot) {
          const root = ReactDOM.createRoot(popupRoot);
          root.render(
            <QueryClientProvider client={queryClient}>
              <Component {...props} />;
            </QueryClientProvider>,
          );
        } else {
          console.error('에러가 발생했습니다');
        }
      };
    }
  };

  const handleViewClick = (props: CustomerInquiryProps) => {
    openPopupWindow(CustomerInquiry, props, 'Inquiry');
  };
  const handleNewCustomer = (addCustomer: (customerData: any) => void) => {
    openPopupWindow(NewCustomer, { addCustomer }, 'New Customer');
  };

  // const handleNewCustomer = () => {
  //   openPopupWindow(NewCustomer, {}, 'New Customer');
  // };

  return (
    <main className="flex">
      <aside className="flex flex-col w-[264px] mt-7 ml-7">
        <div className="flex py-6 px-6 gap-6 border-b-[1px] border-assistive-alternative">
          <ListDashes size={24} weight="light" />
          <h1 className="text-label-lg font-bold text-static-default ">매물 전체보기</h1>
        </div>
        <AccordionMenu sections={sections} />
      </aside>

      <section className="container mx-auto py-10 ">
        <article className="flex flex-col mb-10">
          <p className="ml-3 text-body-lg font-normal text-assistive-strong">아파트 민간분양</p>
          <h1 className="ml-3 text-title-2xl font-bold">계양 학마을 서원</h1>
          <div className="flex">
            <img src={SampleImg} className="object-cover w-[320px] h-[180px]" />
            <div className="flex flex-col self-center ml-10 w-[64px] gap-3 text-detail-base text-assistive-strong">
              <p>시행사</p>
              <p>시공사</p>
              <p>세대수</p>
              <p>모집기간</p>
            </div>
            <div className="flex flex-col self-center ml-4 w-[542px] gap-3 text-detail-base text-static-default">
              <p>(주)선우</p>
              <p>(주)효성중공업</p>
              <p>342</p>
              <p>2024.02.06-2024.04.24</p>
            </div>
            <div className="self-end">
              <Button variant="primary" size="lg" className="gap-4" onClick={handleNewCustomer}>
                고객추가
                <Plus size={24} weight="bold" />
              </Button>
            </div>
          </div>
        </article>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="flex">
            <TabsTrigger value="pending">상담대기</TabsTrigger>
            <TabsTrigger value="completed">상담완료</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <ConsultingPending columns={columnsPending(handleViewClick)} data={consultingPendingData} />
          </TabsContent>
          <TabsContent value="completed">
            <ConsultingCompleted columns={columnsCompleted(handleViewClick)} data={consultingCompletedData} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
