import { cn } from '@/lib/utils';
import _ from 'lodash';
import { useId } from 'react';

export interface StepperProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
  stepClassName?: string;
  onChange: (value: number) => void;
  isCompleted?: boolean;
}

export interface Step {
  name: string;
  status?: StepStatus;
}

export type StepStatus =
  | 'Approve'
  | 'Rejected'
  | 'Pending'
  | 'Revise'
  | 'Revised'
  | 'Approved'
  | '';

export function Stepper({
  steps,
  currentStep = 0,
  className,
  stepClassName,
  onChange,
  isCompleted = false,
}: StepperProps) {
  const stepperId = useId();

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map(({ name, status }, idx) => (
        <button
          key={stepperId + idx}
          className={cn(
            'stepper-shape h-10 w-36',
            'flex items-center justify-center',
            'text-white',
            'transition-all',

            !Boolean(status) && 'bg-gray-500 hover:bg-gray-500/80 cursor-not-allowed',

            status === 'Approve' && 'bg-green-500 hover:bg-green-500/80',
            status === 'Rejected' && 'bg-red-500 hover:bg-red-500/80',
            status === 'Pending' && 'bg-[#d4af37] hover:bg-[#d4af37]/80',
            status === 'Revise' && 'bg-blue-500 hover:bg-blue-500/80',
            status === 'Revised' && 'bg-purple-500 hover:bg-purple-500/80',

            idx === currentStep && 'scale-110 animate-pulse hover:animate-none',

            stepClassName
          )}

          // disabled={!Boolean(status)}

          onClick={() => onChange(idx)}
        >
          <span
            className={cn(
              'max-w-[56px] text-xs tracking-wide',
              idx === currentStep && 'font-medium'
            )}
          >
            {_.truncate(name, { length: 18 })}
          </span>
        </button>
      ))}
    </div>
  );
}
