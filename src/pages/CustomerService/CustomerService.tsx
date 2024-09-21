import { ComponentType } from 'react';
import { ConsultingPending } from '@/components/Table/ConsultingPending';
import { CustomerData } from '@/types/types';
import { ConsultingCompleted } from '@/components/Table/ConsultingCompleted';
import { columnsPending } from '@/components/ui/columnsPending';
import { columnsCompleted } from '@/components/ui/columnsCompleted';
import CustomerInquiry from '@/components/CustomerService/CustomerInquiry';
import CustomerConsulting from '@/components/CustomerService/CustomerConsulting';
import CustomerCompleted from '@/components/CustomerService/CustomerCompleted';
import ReactDOM from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerInquiryProps } from '@/components/CustomerService/CustomerInquiry';
import { CustomerCompletedProps } from '@/components/CustomerService/CustomerCompleted';
import { ListDashes, Plus } from '@phosphor-icons/react';
import AccordionMenu from '@/components/CustomerService/AccordionMenu';
import SampleImg from '../../../public/Imagesample.png';
import { Button } from '@/components/ui/button';
import NewCustomer from '@/components/CustomerService/NewCustomer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from '@/components/ui/dialogNewCustomer';
import NoProperty from '../../components/CustomerService/NoProperty';
import { useQueries } from '@tanstack/react-query';
import {
  fetchSidebarData,
  fetchPendingConsultations,
  fetchCompletedConsultations,
  fetchAddNewCustomer,
} from '@/api/consulting';

const queryClient = new QueryClient();

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState({
    id: 0,
    name: '',
    companyName: '',
    constructor: '',
    totalNumber: 0,
    startDate: '',
    endDate: '',
    propertyType: '',
  });
  const popupWindowRef = useRef<Window | null>(null);

  const [selectedConsultant, setSelectedConsultant] = useState<string>('a1-1');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>();

  const results = useQueries({
    queries: [
      {
        queryKey: [
          'pendingConsultations',
          {
            propertyId: selectedProperty.id,
            search: '',
            consultant: selectedConsultant,
            preferredAt: date,
            page: currentPage,
          },
        ],
        queryFn: fetchPendingConsultations,
      },
      {
        queryKey: [
          'completedConsultations',
          {
            propertyId: selectedProperty.id,
            search: '',
            tier: '',
            consultant: '',
            preferredAt: undefined,
            page: 0,
          },
        ],
        queryFn: fetchCompletedConsultations,
      },
      {
        queryKey: ['sidebarData', { propertyId: selectedProperty.id }],
        queryFn: fetchSidebarData,
      },
    ],
  });

  const [pendingConsultationsResult, completedConsultationsResult, sidebarDataResult] = results;

  const isLoading =
    pendingConsultationsResult.isLoading ||
    completedConsultationsResult.isLoading ||
    sidebarDataResult.isLoading;
  const error =
    pendingConsultationsResult.error || completedConsultationsResult.error || sidebarDataResult.error;

  const pendingConsultationsData = pendingConsultationsResult.data;
  const completedConsultationsData = completedConsultationsResult.data;
  const sidebarData = sidebarDataResult.data;

  const pendingCustomersData = pendingConsultationsData?.contents?.consultPendingSummaries || [];
  const completedCustomersData = completedConsultationsData?.contents?.consultCompletedSummaries || [];
  console.log(pendingCustomersData); // Debug log

  const addNewCustomer = async (newCustomer: CustomerData) => {
    const customerWithPropertyId = { ...newCustomer, id: selectedProperty.id };

    try {
      const response = await fetchAddNewCustomer(selectedProperty.id, customerWithPropertyId);
      setCustomers((prevCustomers) => {
        const updatedCustomers = prevCustomers.filter(
          (customer) => customer.phoneNumber !== newCustomer.phoneNumber,
        );
        return [...updatedCustomers, response];
      });
    } catch (error) {
      console.error('Failed to add new customer:', error);
    }
  };

  // const pendingCustomers = customers.filter((customer) => customer.status === 'pending');
  // const completedCustomers = customers.filter((customer) => customer.status === 'complete');

  const accordionSections = [
    {
      title: '모집중',
      items: sidebarData?.sideBarPendingResponseList?.map((item: { name: string }) => item.name) || [],
    },
    {
      title: '모집완료',
      items: sidebarData?.sideBarCompletedResponseList?.map((item: { name: string }) => item.name) || [],
    },
  ];

  const handlePropertySelect = (name: string) => {
    const selectedFromPending = sidebarData?.sideBarPendingResponseList.find(
      (property: { name: string }) => property.name === name,
    );
    const selectedFromCompleted = sidebarData?.sideBarCompletedResponseList.find(
      (property: { name: string }) => property.name === name,
    );
    const selected = selectedFromPending || selectedFromCompleted;

    if (selected) {
      const selectedPropertyDetails = sidebarData.sideBarSelectedPropertyResponse;
      console.log('Selected property details:', selectedPropertyDetails); // Debug log
      setSelectedProperty({
        ...selected,
        ...selectedPropertyDetails,
      });
    }
  };

  // const filteredPendingCustomers = pendingCustomers.filter((customer) => customer.id === selectedProperty.id);
  // const filteredCompletedCustomers = completedCustomers.filter(
  //   (customer) => customer.id === selectedProperty.id,
  // );

  const isSidebarDataEmpty =
    !sidebarData ||
    (!sidebarData.sideBarPendingResponseList.length && !sidebarData.sideBarCompletedResponseList.length);

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

    popupWindowRef.current = window.open(
      '',
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    if (popupWindowRef.current) {
      popupWindowRef.current.document.write(`
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
      popupWindowRef.current.document.close();

      popupWindowRef.current.onload = () => {
        const popupRoot = popupWindowRef.current?.document.getElementById('popup-root');
        if (popupRoot) {
          const root = ReactDOM.createRoot(popupRoot);

          // 팝업 내용의 상태를 관리하기 위한 wrapper
          function PopupWrapper() {
            const [showConsulting, setShowConsulting] = useState(false);

            // 컴포넌트간 이동 로직
            const handleConsultingClick = () => {
              setShowConsulting(true);
            };
            const handleBackToInquiry = () => {
              setShowConsulting(false);
            };

            return (
              <QueryClientProvider client={queryClient}>
                {showConsulting ? (
                  <CustomerConsulting
                    {...props}
                    onBackClick={handleBackToInquiry}
                    closePopup={handleClosePopup}
                    // @ts-ignore: Unreachable code error
                    onAddCustomer={addNewCustomer}
                  />
                ) : (
                  <Component
                    {...props}
                    onConsultingClick={handleConsultingClick}
                    closePopup={handleClosePopup}
                  />
                )}
              </QueryClientProvider>
            );
          }

          root.render(<PopupWrapper />);
        } else {
          console.error('Error occurred: Unable to find popup root.');
        }
      };
    }
  };

  const handleClosePopup = () => {
    if (popupWindowRef.current) {
      popupWindowRef.current.close(); // Close the popup window
      popupWindowRef.current = null; // Reset the reference
    }
  };

  const handleInquiryClick = (props: CustomerInquiryProps) => {
    openPopupWindow(CustomerInquiry, props, 'Inquiry');
  };
  const handleCompletedClick = (props: CustomerCompletedProps) => {
    openPopupWindow(CustomerCompleted, props, 'Completed');
    console.log(props);
  };

  return (
    <main className="flex">
      <aside className="flex flex-col w-[264px] mt-7 ml-7">
        <div className="flex py-6 px-6 gap-6 border-b-[1px] border-assistive-alternative">
          <ListDashes size={24} weight="light" />
          <h1 className="text-label-lg font-bold text-static-default ">매물 전체보기</h1>
        </div>
        <AccordionMenu sections={accordionSections} onItemSelect={handlePropertySelect} />
      </aside>

      {isSidebarDataEmpty ? (
        <NoProperty />
      ) : (
        <section className="container mx-auto py-10 ">
          <article className="flex flex-col mb-10">
            <p className="ml-3 text-body-lg font-normal text-assistive-strong">
              {selectedProperty.propertyType}
            </p>
            <h1 className="ml-3 text-title-2xl font-bold">{selectedProperty.name}</h1>
            <div className="flex">
              <img src={SampleImg} className="object-cover w-[320px] h-[180px]" />
              <div className="flex flex-col self-center ml-10 w-[64px] gap-3 text-detail-base text-assistive-strong">
                <p>시행사</p>
                <p>시공사</p>
                <p>세대수</p>
                <p>모집기간</p>
              </div>
              <div className="flex flex-col self-center ml-4 w-[542px] gap-3 text-detail-base text-static-default">
                <p>{selectedProperty.companyName}</p>
                <p>{selectedProperty.constructor}</p>
                <p>{selectedProperty.totalNumber}</p>
                <p>
                  {selectedProperty.startDate}-{selectedProperty.endDate}
                </p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className="self-end">
                  <DialogTrigger>
                    <Button variant="primary" size="lg" className="gap-4">
                      고객추가
                      <Plus size={24} weight="bold" />
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <NewCustomer onAddCustomer={addNewCustomer} />
                  <DialogDescription />
                </DialogContent>
              </Dialog>
            </div>
          </article>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="flex">
              <TabsTrigger value="pending">상담대기</TabsTrigger>
              <TabsTrigger value="completed">상담완료</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <ConsultingPending
                columns={columnsPending(handleInquiryClick)}
                data={pendingCustomersData}
                isLoading={isLoading}
                error={error}
                selectedConsultant={selectedConsultant}
                setSelectedConsultant={setSelectedConsultant}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                date={date}
                setDate={setDate}
              />
            </TabsContent>
            <TabsContent value="completed">
              <ConsultingCompleted
                columns={columnsCompleted(handleCompletedClick)}
                data={completedCustomersData}
                selectedConsultant={selectedConsultant}
                setSelectedConsultant={setSelectedConsultant}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                date={date}
                setDate={setDate}
              />
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}
