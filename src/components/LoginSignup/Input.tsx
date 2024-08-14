interface InputProps {
  title: string;
  placeholder: string;
}

export default function Input({ title, placeholder }: InputProps) {
  return (
    <label className="flex-col font-pretendard font-bold text-title-base">
      <span className="inline-block my-5">{title}</span>
      <input
        className="w-full h-[53px] px-4 py-3 border rounded-5 font-pretendard font-normal text-label-lg"
        type="text"
        placeholder={placeholder}
      />
    </label>
  );
}
