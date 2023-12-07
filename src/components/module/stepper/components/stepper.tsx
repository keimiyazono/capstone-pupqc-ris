import { cn } from '@/lib/utils';
import _ from 'lodash';
import { useId } from 'react';

export interface StepperProps {
  steps: string[];
  currentStep?: number;
  className?: string;
  stepClassName?: string;
}

export function Stepper({
  steps,
  currentStep = 0,
  className,
  stepClassName,
}: StepperProps) {
  const stepperId = useId();

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, idx) => (
        <button
          key={stepperId + idx}
          className={cn(
            'stepper-shape h-10 w-36 flex items-center justify-center transition-colors text-white',
            idx > 0 && '-ml-3',
            idx < currentStep && 'bg-green-500 hover:bg-green-500/80',
            idx === currentStep && 'bg-yellow-500 hover:bg-yellow-500/80',
            idx > currentStep && 'bg-gray-500 hover:bg-gray-500/80',
            stepClassName
          )}
        >
          <span className="max-w-[56px] text-xs tracking-wide">
            {_.truncate(step, { length: 18 })}
          </span>
        </button>
      ))}
    </div>
  );
}
