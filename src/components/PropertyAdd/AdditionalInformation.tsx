import PropertyInputValidation from '../common/PropertyInputValidation';

const AdditionalInformation = () => {
  return (
    <div>
      <div className="flex flex-col w-[720px] h-full m-auto">
        <div className="flex flex-col w-full gap-8">
          {/* 백엔드에 보낼 때 하이픈 제거하기 */}
          <PropertyInputValidation
            name="phoneNumber"
            label="분양 문의 번호"
            placeholder="ex) 010-0000-0000 / 0000-0000"
          />
          {/* 앞에 있던 file들이랑 같은 fields 사용해야함 */}
          <PropertyInputValidation
            name="marketting"
            label="마케팅 자료"
            optional={true}
            placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
            buttonType="button"
            buttonVariant="outline"
            buttonSize="lg"
            buttonClassName="ml-4"
            buttonTitle="파일 첨부"
          />
          <PropertyInputValidation
            name="homepage"
            label="홈페이지 링크"
            optional={true}
            placeholder="홈페이지 링크를 입력해주세요"
          />
          <PropertyInputValidation
            name="contactChannel"
            label="카카오톡 채널 링크"
            optional={true}
            placeholder="카카오톡 채널 링크를 입력해주세요"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
