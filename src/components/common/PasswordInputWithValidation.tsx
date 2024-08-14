import * as React from 'react';
import { cn } from '@/lib/utils';
import { InputWithValidation, InputWithValidationProps } from './InputWithValidation';
import { EyeClosed, Eye } from '@phosphor-icons/react';

interface PwInputWithValidationProps extends InputWithValidationProps {}

const PwInputWithValidation = React.forwardRef<HTMLInputElement, PwInputWithValidationProps>(
  ({ className, validationSchema, errorMessage, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <>
        <InputWithValidation
          ref={ref}
          type={isPasswordVisible ? 'text' : 'password'}
          validationSchema={validationSchema}
          className={cn('', className)}
          errorMessage={errorMessage}
          {...props}>
          <div className="cursor-pointer" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Eye size={24} className="text-assistive-default" />
            ) : (
              <EyeClosed size={24} className="text-assistive-default" />
            )}
          </div>
        </InputWithValidation>
      </>
    );
  },
);
PwInputWithValidation.displayName = 'PwInputWithValidation';

export { PwInputWithValidation };
