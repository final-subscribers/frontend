import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { z, ZodError } from 'zod';
import { Input, InputProps } from '../ui/input';

export interface InputWithValidationProps extends InputProps {
  validationSchema: z.ZodSchema<any>;
  errorMessage?: string;
  success: string;
  children?: React.ReactNode;
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>(
  ({ className, validationSchema, success, children, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const [isValid, setIsValid] = React.useState<boolean | null>(null);
    const [isMessage, setIsMessage] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      e.preventDefault();

      try {
        validationSchema.parse(e.target.value);
        setIsValid(true);
        setIsMessage(success);
      } catch (error) {
        if (error instanceof ZodError) {
          setIsValid(false);
          setIsMessage(error.errors[0].message);
        } else {
          console.error(error);
        }
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
        {value && isMessage && (
          <p
            className={`absolute left-0 top-full mt-3 text-detail-lg mobile:text-detail-lg-m ${!isValid ? 'text-accent-error' : 'text-primary-default'}`}>
            {isMessage}
          </p>
        )}
      </div>
    );
  },
);
InputWithValidation.displayName = 'InputWithValidation';

export { InputWithValidation };
