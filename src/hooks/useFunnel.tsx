import { ReactElement, ReactNode, useCallback, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  // 스탭 관리
  const [step, setStep] = useState(defaultStep);

  // 각 스탭의 컨텐츠
  const Step = useCallback((props: StepProps): ReactElement => {
    return <>{props.children}</>;
  }, []);

  // Step 중 현재 step을 find를 통해 찾아 렌더링
  const Funnel = useCallback(
    ({ children }: FunnelProps): JSX.Element => {
      const targetStep = children.find((childStep) => childStep.props.name === step);
      return <>{targetStep}</>;
    },
    [step], // step이 변경될 때만 다시 계산
  );

  return { Funnel, Step, setStep, currentStep: step } as const;
};
