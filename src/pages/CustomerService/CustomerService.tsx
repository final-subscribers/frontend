import { ConsultingPending } from '@/components/Table/ConsultingPending';
import { ConsultingCompleted } from '@/components/Table/ConsultingCompleted';
import { columnsPending } from '@/components/ui/columnsPending';
import { columnsCompleted } from '@/components/ui/columnsCompleted';
import { consultingPending, consultingCompleted, myProperty } from '@/lib/tableItems';
// import { MyProperty } from '@/components/Table/MyProperty';
// import { columnsMyProperty } from '@/components/ui/columnsMyProperyt';
import CustomerInquiry from '@/components/CustomerConsulting/CustomerInquiry';
import ReactDOM from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerInquiryProps } from '@/components/CustomerConsulting/CustomerInquiry';

// table에 사용하는 데이터
const consultingPendingData = consultingPending.map((consulting) => ({
  name: consulting.name,
  phoneNumber: consulting.phoneNumber,
  createdAt: consulting.createdAt,
  preferredAt: consulting.preferredAt,
  consultant: consulting.consultant,
  contents: consulting.contents,
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

// const myPropertyData = myProperty.map((property) => ({
//   id: property.id,
//   name: property.name,
//   total_number: property.total_number,
//   pending: property.pending,
//   status: property.status,
//   created_at: property.created_at,
//   end_date: property.end_date,
// }));

const handleViewClick = (props: CustomerInquiryProps) => {
  const width = 420;
  const height = 665;

  // popup 윈도우
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);

  if (popupWindow) {
    popupWindow.document.write(`
		<html>
			<head>
				<title>Inquiry</title>
				<link href="/src/index.css" rel="stylesheet">
			</head>
			</head>
			<body>
				<div id="inquiry-root"></div>
			</body>
		</html>
	`);
    popupWindow.document.close();

    popupWindow.onload = () => {
      const inquiryRoot = popupWindow.document.getElementById('inquiry-root');
      if (inquiryRoot) {
        const root = ReactDOM.createRoot(inquiryRoot);
        root.render(<CustomerInquiry {...props} />);
      } else {
        console.error('에러가 발생했습니다');
      }
    };
  }
};

export default function CustomerService() {
  return (
    <>
      <div className="container mx-auto py-10 ">
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

        {/* <MyProperty columns={columnsMyProperty} data={myPropertyData} /> */}
      </div>
    </>
  );
}
