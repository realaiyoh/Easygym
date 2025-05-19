import { ReactNode, FormEventHandler } from 'react';
import { cn } from '@/lib/utils';

const FormWrapper = ({
  children,
  onSubmit,
  className,
}: {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  className?: string;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('w-full flex flex-col gap-4 items-start', className)}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
