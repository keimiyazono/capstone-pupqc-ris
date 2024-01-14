'use client';

import { cn } from '@/lib/utils';
import _ from 'lodash';
import { useEffect, useId, useState } from 'react';

export const APPROVE_LIST = ['Approve', 'Approved'];

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

  const [pendingIndex, setPendingIndex] = useState<number>(0);

  useEffect(() => {
    for (let i = 0; i < steps.length; i++) {
      const status = steps[0]?.status ?? '';

      if (!APPROVE_LIST.includes(status)) {
        setPendingIndex(i);

        break;
      }
    }
  }, [steps]);

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map(({ name, status }, idx) => {
        const notAvailableStep = pendingIndex <= idx && idx > 0;

        return (
          <button
            key={stepperId + idx}
            disabled={notAvailableStep}
            className={cn(
              'stepper-shape h-10 w-36',
              'flex items-center justify-center',
              'text-white',
              'transition-all',
              'bg-[#d4af37] hover:bg-[#d4af37]/80',

              notAvailableStep &&
                'bg-gray-500 hover:bg-gray-500/80 cursor-not-allowed',

              !notAvailableStep &&
                APPROVE_LIST.includes(status ?? '') &&
                'bg-green-500 hover:bg-green-500/80',

              !notAvailableStep &&
                status === 'Rejected' &&
                'bg-red-500 hover:bg-red-500/80',

              !notAvailableStep &&
                status === 'Pending' &&
                'bg-[#d4af37] hover:bg-[#d4af37]/80',

              !notAvailableStep &&
                status === 'Revise' &&
                'bg-blue-500 hover:bg-blue-500/80',

              !notAvailableStep &&
                status === 'Revised' &&
                'bg-purple-500 hover:bg-purple-500/80',

              !notAvailableStep &&
                idx === currentStep &&
                'scale-110 animate-pulse hover:animate-none',

              stepClassName
            )}
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
        );
      })}
    </div>
  );
}
