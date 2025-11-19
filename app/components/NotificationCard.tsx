'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { warning } from '../../lib/design-tokens/colors';

export type NotificationSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface NotificationCardProps {
  /** Severity level of the notification */
  severity?: NotificationSeverity;
  /** Title text */
  title: string;
  /** Description/body text */
  description: string;
  /** Date text (optional) */
  date?: string;
  /** Primary action button text */
  primaryAction?: string;
  /** Secondary action button text */
  secondaryAction?: string;
  /** Callback for primary action */
  onPrimaryAction?: () => void;
  /** Callback for secondary action */
  onSecondaryAction?: () => void;
  /** Callback for close button */
  onClose?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * Notification Card Component
 * Exactly replicates the Figma "Notification Card" design
 *
 * Specifications from Figma:
 * - Width: 540px
 * - Padding: 16px
 * - Border Radius: 16px
 * - Background: #F3F6F9 (Color/Neutral/100)
 */
export const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  (
    {
      severity = 'critical',
      title,
      description,
      date,
      primaryAction = 'Review',
      secondaryAction = 'Dismiss',
      onPrimaryAction,
      onSecondaryAction,
      onClose,
      className,
    },
    ref
  ) => {
    // Severity-specific styles - EXACT colors from Figma tokens
    const severityStyles = {
      critical: {
        pillBg: 'bg-[#FFD6DB]', // Color/Semantic/Error/100
        badgeColor: 'bg-[#FF3B30]', // Color/Semantic/Error/500
        label: 'Critical',
      },
      warning: {
        pillBg: 'bg-[#FFF5CC]', // Color/Semantic/Warning/100 (from tokens)
        badgeColor: `bg-[${warning[500]}]`, // Color/Semantic/Warning/500
        label: 'Warning',
      },
      info: {
        pillBg: 'bg-[#D6EDFF]', // Color/Semantic/Info/100
        badgeColor: 'bg-[#007AFF]', // Color/Semantic/Info/500
        label: 'Info',
      },
      success: {
        pillBg: 'bg-[#D6F5E1]', // Color/Semantic/Success/100
        badgeColor: 'bg-[#34C759]', // Color/Semantic/Success/500
        label: 'Success',
      },
    };

    const currentSeverity = severityStyles[severity];

    return (
      <div
        ref={ref}
        className={cn(
          // Card container - EXACT values from Figma
          'w-fit max-w-[540px]', // Hug contents with max width from Figma
          'bg-[#F3F6F9]', // Color/Neutral/100
          'rounded-[16px]',
          'p-[16px]',
          'flex flex-col',
          className
        )}
      >
        {/* Body Section */}
        <div className="flex flex-col gap-[4px] pb-[12px] w-full">
          {/* Header */}
          <div className="flex gap-[24px] items-center w-full">
            {/* Leading (Status Pill + Title) */}
            <div className="flex flex-1 gap-[8px] items-center min-w-0">
              {/* Status Pill */}
              <div
                className={cn(
                  'flex gap-[4px] items-center justify-center',
                  'px-[12px] py-[2px]',
                  'rounded-[9999px]',
                  currentSeverity.pillBg
                )}
              >
                {/* Notification Badge */}
                <div
                  className={cn(
                    'w-[8px] h-[8px] rounded-full',
                    currentSeverity.badgeColor
                  )}
                />
                <p className="text-[14px] leading-[22px] font-normal text-[#17263D]">
                  {currentSeverity.label}
                </p>
              </div>

              {/* Title */}
              <p className="text-[16px] leading-[24px] font-semibold text-[#17263D] truncate">
                {title}
              </p>
            </div>

            {/* Trailing (Date + Dropdown) */}
            <div className="flex gap-[8px] items-center flex-shrink-0">
              {date && (
                <p className="text-[12px] leading-[20px] font-normal text-[#7F8FA4]">
                  {date}
                </p>
              )}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#7F8FA4]">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-[12px] leading-[20px] font-normal text-[#7F8FA4]">
              {description}
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex gap-[12px] items-center justify-end w-full border-t-[0.5px] border-[#C3CDD9] pt-[12px]">
          {/* Primary Action Button */}
          {primaryAction && (
            <button
              onClick={onPrimaryAction}
              className={cn(
                'flex gap-[4px] items-center justify-center',
                'px-[8px] py-[4px]',
                'rounded-[8px]',
                'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]',
                'hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]',
                'transition-all duration-200',
                'w-fit'
              )}
            >
              <p className="text-[12px] leading-[20px] font-normal text-[#F9FAFB] text-center">
                {primaryAction}
              </p>
            </button>
          )}

          {/* Secondary Action Button */}
          {secondaryAction && (
            <button
              onClick={onSecondaryAction}
              className={cn(
                'flex gap-[4px] items-center justify-center',
                'px-[2px] py-[4px]',
                'rounded-[12px]',
                'transition-all duration-200',
                'hover:bg-[#F9FAFB]',
                'w-fit'
              )}
            >
              <p className="text-[12px] leading-[20px] font-normal text-[#1339A0] text-center">
                {secondaryAction}
              </p>
            </button>
          )}
        </div>
      </div>
    );
  }
);

NotificationCard.displayName = 'NotificationCard';
