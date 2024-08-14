import * as React from 'react';
import { InputWithValidation, InputWithValidationProps } from './InputWithValidation';
import { PwInputWithValidation } from './PasswordInputWithValidation';

export interface InputFieldProps extends InputWithValidationProps {
  label: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type, label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col mb-10">
        <label className="my-5 text-title-base font-bold mobile:text-title-base-m">{label}</label>
        {type === 'password' ? (
          <PwInputWithValidation ref={ref} className={className} {...props} />
        ) : (
          <InputWithValidation ref={ref} className={className} {...props} />
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputValidWithLabel';

export { InputField };
