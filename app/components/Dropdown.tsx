'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** Dropdown label */
  label?: string;
  /** Icon to display next to label */
  icon?: React.ReactNode;
  /** Selected value */
  value: string;
  /** Available options */
  options: DropdownOption[];
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Dropdown style variant */
  variant?: 'primary' | 'secondary';
  /** Width of the dropdown */
  width?: string;
  /** Additional className */
  className?: string;
}

/**
 * Dropdown Component
 * Reusable dropdown matching TopBar dropdown styles
 * Supports primary (gradient) and secondary (white) variants
 */
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      icon,
      value,
      options,
      onChange,
      variant = 'primary',
      width = '160px',
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isPrimary = variant === 'primary';

    return (
      <div ref={dropdownRef} className={cn('relative', className)} style={{ width }}>
        <div className="flex flex-col gap-[8px]">
          {/* Label */}
          {label && (
            <div className="flex gap-[4px] items-center">
              {icon}
              <p className="flex-1 text-[14px] leading-[22px] font-normal text-[#17263D]">
                {label}
              </p>
            </div>
          )}

          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full flex gap-[8px] items-center',
              'px-[12px] py-[8px]',
              'rounded-[12px]',
              'transition-all duration-200',
              isPrimary
                ? 'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B] hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]'
                : 'bg-[#FFFFFF] border border-[#17263D] hover:bg-[#F9FAFB]'
            )}
          >
            <span
              className={cn(
                'flex-1 text-[14px] leading-[22px] font-normal text-left truncate',
                isPrimary ? 'text-[#F9FAFB]' : 'text-[#1339A0]'
              )}
            >
              {value}
            </span>
            {/* CaretDown Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn('transition-transform', isOpen && 'rotate-180')}
            >
              <path
                d="M12 6L8 10L4 6"
                stroke={isPrimary ? '#F9FAFB' : '#1339A0'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-[4px] w-full bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-[12px] py-[8px] text-left',
                  'text-[14px] leading-[22px] font-normal',
                  'hover:bg-[#F3F6F9] transition-colors',
                  value === option.value
                    ? 'bg-[#EAF1FF] text-[#1C58F7]'
                    : 'text-[#17263D]'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
