'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TopBarProps {
  /** Additional className */
  className?: string;
  /** Main title */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Top Bar Component
 * Exactly replicates the Figma "Top Bar" design
 *
 * Specifications from Figma:
 * - Width: 1187px
 * - Padding: 24px (all sides)
 * - Border Radius: 24px
 * - Background: rgba(255, 255, 255, 0.35) with backdrop blur
 * - Three dropdowns: Region, Time Frame, Material
 */
export const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  (
    {
      className,
      title = 'Overview Dashboard',
      subtitle = 'Company-wide performance metrics and supply chain optimization impact',
    },
    ref
  ) => {
    // Dropdown states
    const [regionOpen, setRegionOpen] = useState(false);
    const [timeFrameOpen, setTimeFrameOpen] = useState(false);
    const [materialOpen, setMaterialOpen] = useState(false);

    // Selected values
    const [selectedRegion, setSelectedRegion] = useState('Midwest');
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('Next 3 Months');
    const [selectedMaterial, setSelectedMaterial] = useState('KTS');

    // Dropdown options
    const regionOptions: DropdownOption[] = [
      { value: 'Midwest', label: 'Midwest' },
      { value: 'Northeast', label: 'Northeast' },
      { value: 'Southeast', label: 'Southeast' },
      { value: 'Southwest', label: 'Southwest' },
      { value: 'West', label: 'West' },
    ];

    const timeFrameOptions: DropdownOption[] = [
      { value: 'Next 3 Months', label: 'Next 3 Months' },
      { value: 'Next 6 Months', label: 'Next 6 Months' },
      { value: 'Next Year', label: 'Next Year' },
      { value: 'Last 3 Months', label: 'Last 3 Months' },
      { value: 'Last 6 Months', label: 'Last 6 Months' },
    ];

    const materialOptions: DropdownOption[] = [
      { value: 'KTS', label: 'KTS' },
      { value: 'Steel', label: 'Steel' },
      { value: 'Aluminum', label: 'Aluminum' },
      { value: 'Plastic', label: 'Plastic' },
      { value: 'Composite', label: 'Composite' },
    ];

    // Refs for click outside detection
    const regionRef = useRef<HTMLDivElement>(null);
    const timeFrameRef = useRef<HTMLDivElement>(null);
    const materialRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
          setRegionOpen(false);
        }
        if (timeFrameRef.current && !timeFrameRef.current.contains(event.target as Node)) {
          setTimeFrameOpen(false);
        }
        if (materialRef.current && !materialRef.current.contains(event.target as Node)) {
          setMaterialOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          // Container - EXACT values from Figma
          'w-full',
          'p-[24px]',
          'rounded-[24px]',
          'bg-white/35', // rgba(255, 255, 255, 0.35)
          'backdrop-blur-md', // Glass effect
          'flex gap-[24px] items-start',
          'mb-[24px]', // Add bottom margin
          className
        )}
      >
        {/* Left Side - Heading */}
        <div className="flex-1 flex flex-col gap-[2px]">
          <h1 className="text-[28px] leading-[40px] font-semibold text-[#17263D]">
            {title}
          </h1>
          <p className="text-[16px] leading-[24px] font-medium text-[#7F8FA4] tracking-[0.2px]">
            {subtitle}
          </p>
        </div>

        {/* Right Side - Dropdowns */}
        <div className="flex flex-wrap gap-[12px] items-center justify-end">
          {/* Region Dropdown */}
          <div ref={regionRef} className="relative w-[160px]">
            <div className="flex flex-col gap-[8px]">
              {/* Label */}
              <div className="flex gap-[4px] items-center">
                {/* MapPin Icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7C6.5 7.82843 7.17157 8.5 8 8.5Z"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14C8 14 12.5 10.5 12.5 7C12.5 4.51472 10.4853 2.5 8 2.5C5.51472 2.5 3.5 4.51472 3.5 7C3.5 10.5 8 14 8 14Z"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="flex-1 text-[14px] leading-[22px] font-normal text-[#17263D]">
                  Region
                </p>
              </div>

              {/* Dropdown Button */}
              <button
                onClick={() => setRegionOpen(!regionOpen)}
                className={cn(
                  'w-full flex gap-[8px] items-center',
                  'px-[12px] py-[8px]',
                  'rounded-[12px]',
                  'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]',
                  'hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]',
                  'transition-all duration-200'
                )}
              >
                <span className="flex-1 text-[14px] leading-[22px] font-normal text-[#F9FAFB] text-left">
                  {selectedRegion}
                </span>
                {/* CaretDown Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={cn('transition-transform', regionOpen && 'rotate-180')}
                >
                  <path
                    d="M12 6L8 10L4 6"
                    stroke="#F9FAFB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {regionOpen && (
              <div className="absolute top-full mt-[4px] w-full bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
                {regionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedRegion(option.value);
                      setRegionOpen(false);
                    }}
                    className={cn(
                      'w-full px-[12px] py-[8px] text-left',
                      'text-[14px] leading-[22px] font-normal',
                      'hover:bg-[#F3F6F9] transition-colors',
                      selectedRegion === option.value
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

          {/* Time Frame Dropdown */}
          <div ref={timeFrameRef} className="relative w-[160px]">
            <div className="flex flex-col gap-[8px]">
              {/* Label */}
              <div className="flex gap-[4px] items-center">
                {/* Calendar Icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="2.5"
                    y="3.5"
                    width="11"
                    height="10"
                    rx="1.5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2.5 6.5H13.5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 2V5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 2V5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="flex-1 text-[14px] leading-[22px] font-normal text-[#17263D]">
                  Time Frame
                </p>
              </div>

              {/* Dropdown Button */}
              <button
                onClick={() => setTimeFrameOpen(!timeFrameOpen)}
                className={cn(
                  'w-full flex gap-[8px] items-center',
                  'px-[12px] py-[8px]',
                  'rounded-[12px]',
                  'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]',
                  'hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]',
                  'transition-all duration-200'
                )}
              >
                <span className="flex-1 text-[14px] leading-[22px] font-normal text-[#F9FAFB] text-left">
                  {selectedTimeFrame}
                </span>
                {/* CaretDown Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={cn('transition-transform', timeFrameOpen && 'rotate-180')}
                >
                  <path
                    d="M12 6L8 10L4 6"
                    stroke="#F9FAFB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {timeFrameOpen && (
              <div className="absolute top-full mt-[4px] w-full bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
                {timeFrameOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedTimeFrame(option.value);
                      setTimeFrameOpen(false);
                    }}
                    className={cn(
                      'w-full px-[12px] py-[8px] text-left',
                      'text-[14px] leading-[22px] font-normal',
                      'hover:bg-[#F3F6F9] transition-colors',
                      selectedTimeFrame === option.value
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

          {/* Material Dropdown */}
          <div ref={materialRef} className="relative w-[160px]">
            <div className="flex flex-col gap-[8px]">
              {/* Label */}
              <div className="flex gap-[4px] items-center">
                {/* Package Icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1.5L2.5 4.5V11.5L8 14.5L13.5 11.5V4.5L8 1.5Z"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 4.5L8 7.5L13.5 4.5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 7.5V14.5"
                    stroke="#17263D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="flex-1 text-[14px] leading-[22px] font-normal text-[#17263D]">
                  Material
                </p>
              </div>

              {/* Dropdown Button */}
              <button
                onClick={() => setMaterialOpen(!materialOpen)}
                className={cn(
                  'w-full flex gap-[8px] items-center',
                  'px-[12px] py-[8px]',
                  'rounded-[12px]',
                  'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]',
                  'hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]',
                  'transition-all duration-200'
                )}
              >
                <span className="flex-1 text-[14px] leading-[22px] font-normal text-[#F9FAFB] text-left">
                  {selectedMaterial}
                </span>
                {/* CaretDown Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={cn('transition-transform', materialOpen && 'rotate-180')}
                >
                  <path
                    d="M12 6L8 10L4 6"
                    stroke="#F9FAFB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {materialOpen && (
              <div className="absolute top-full mt-[4px] w-full bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
                {materialOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedMaterial(option.value);
                      setMaterialOpen(false);
                    }}
                    className={cn(
                      'w-full px-[12px] py-[8px] text-left',
                      'text-[14px] leading-[22px] font-normal',
                      'hover:bg-[#F3F6F9] transition-colors',
                      selectedMaterial === option.value
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
        </div>
      </div>
    );
  }
);

TopBar.displayName = 'TopBar';
