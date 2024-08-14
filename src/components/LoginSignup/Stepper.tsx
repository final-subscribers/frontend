interface StepperProps {
  img: string;
  text: string;
}
export default function Stepper({ img, text }: StepperProps) {
  return (
    <div className="flex-col h-[71px] w-[100px]">
      <img className="mx-auto place-content-center" src={img} alt="terms"></img>
      <p className="mt-4 text-center font-pretendard font-bold text-title-xs">{text}</p>
    </div>
  );
}
