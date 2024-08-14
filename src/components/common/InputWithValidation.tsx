import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { z } from 'zod';
import { Input, InputProps } from '../ui/input';

export interface InputWithValidationProps extends InputProps {
  validationSchema: z.ZodSchema<any>;
  errorMessage?: string;
  children?: React.ReactNode;
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>(
  ({ className, validationSchema, errorMessage, children, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      try {
        validationSchema.parse(e.target.value);
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    };

    return (
      <div className="relative flex-grow">
        <Input
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(
            '',
            {
              'focus:shadow-focus': value && isValid === true,
              'shadow-focus': value && isValid === true,
              'focus:shadow-error': value && isValid === false,
              'shadow-error': value && isValid === false,
            },
            className,
          )}
          {...props}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center gap-3 mr-5">
          {children}
          {value && isValid !== null && (
            <div className="right-0 flex items-center pointer-events-none">
              {isValid ? (
                <CheckCircle size={24} className="text-primary-default" />
              ) : (
                <WarningCircle size={24} className="text-accent-error" />
              )}
            </div>
          )}
        </div>
        {!isValid && value && errorMessage && (
          <p className="absolute left-0 top-full mt-3 text-detail-lg mobile:text-detail-lg-m text-accent-error">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
InputWithValidation.displayName = 'InputWithValidation';

export { InputWithValidation };
