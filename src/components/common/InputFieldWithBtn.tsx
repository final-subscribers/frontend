import * as React from 'react';
import { InputWithValidation, InputWithValidationProps } from './InputWithValidation';
import { Button } from '../ui/button';

export interface InputFieldWithBtnProps extends InputWithValidationProps {
  label: string;
  btnLabel: string;
}

const InputFieldWithBtn = React.forwardRef<HTMLInputElement, InputFieldWithBtnProps>(
  ({ label, btnLabel, className, ...props }, ref) => {
    return (
      <div className="flex flex-col mb-10">
        <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
        <div className="flex items-center gap-4">
          <InputWithValidation ref={ref} {...props} />
          <Button variant="outline" size="lg">
            {btnLabel}
          </Button>
        </div>
      </div>
    );
  },
);

InputFieldWithBtn.displayName = 'InputValidWithLabel';

export { InputFieldWithBtn };
