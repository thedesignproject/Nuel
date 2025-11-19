'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GearSix } from '@phosphor-icons/react';
import { warning, success, error, info } from '../../lib/design-tokens/colors';

export type ProgressBarSize = 'xl' | 'lg';
export type ProgressBarStatus = 'critical' | 'warning' | 'good' | 'excellent';

export interface ProgressBarProps {
  /** Size variant */
  size: ProgressBarSize;
  /** Material/item name */
  name: string;
  /** Material icon (for xl size) */
  icon?: React.ReactNode;
  /** Current value */
  current: number;
  /** Target value */
  target: number;
  /** Total capacity */
  capacity: number;
  /** Percentage (calculated if not provided) */
  percentage?: number;
  /** Status for color */
  status: ProgressBarStatus;
  /** Show settings icon */
  showSettings?: boolean;
  /** Settings click handler */
  onSettingsClick?: () => void;
  /** Warning message (e.g., "No data available") */
  warningMessage?: string;
  /** Additional className */
  className?: string;
}

/**
 * ProgressBar Component
 * Two variants: XL (with icon) and LG (compact)
 * Displays current, target, and capacity with visual progress bar
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      size,
      name,
      icon,
      current,
      target,
      capacity,
      percentage: providedPercentage,
      status,
      showSettings = true,
      onSettingsClick,
      warningMessage,
      className,
    },
    ref
  ) => {
    const percentage = providedPercentage ?? Math.round((current / target) * 100);
    const fillPercentage = (current / capacity) * 100;
    const targetPercentage = (target / capacity) * 100;

    const isXL = size === 'xl';

    const getStatusColor = (): string => {
      switch (status) {
        case 'critical':
          return error[500];
        case 'warning':
          return warning[500];
        case 'good':
          return success[500];
        case 'excellent':
          return info[500];
      }
    };

    const getStatusBadgeStyle = () => {
      switch (status) {
        case 'critical':
          return { backgroundColor: error[100], color: error[500] };
        case 'warning':
          return { backgroundColor: warning[100], color: warning[500] };
        case 'good':
          return { backgroundColor: success[100], color: success[500] };
        case 'excellent':
          return { backgroundColor: info[100], color: info[500] };
      }
    };

    const statusColor = getStatusColor();
    const statusBadgeStyle = getStatusBadgeStyle();

    if (warningMessage) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-[12px] py-[8px]', className)}
        >
          {/* Icon for XL */}
          {isXL && icon && (
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
          )}

          {/* Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
            <p style={{ fontSize: isXL ? '14px' : '12px', lineHeight: isXL ? '22px' : '20px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
              {name}
            </p>
          </div>

          {/* Warning Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: warning[100], borderRadius: '6px' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L1 11H11L6 1Z" fill={warning[500]} />
              <path d="M6 4V7" stroke="#17263D" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="6" cy="9" r="0.5" fill="#17263D" />
            </svg>
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: warning[500], fontFamily: 'DM Sans' }}>
              {warningMessage}
            </p>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Settings */}
          {showSettings && (
            <button
              onClick={onSettingsClick}
              style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <GearSix size={16} weight="regular" color="#7F8FA4" />
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-[8px]', className)}
        style={{ width: '100%' }}
      >
        {/* Top Row: Name, Current, Percentage, Target, Capacity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          {/* Icon (XL only) */}
          {isXL && icon && (
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {icon}
            </div>
          )}

          {/* Name */}
          <div style={{ minWidth: isXL ? '100px' : '80px', flexShrink: 0 }}>
            <p style={{ fontSize: isXL ? '14px' : '12px', lineHeight: isXL ? '22px' : '20px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
              {name}
            </p>
          </div>

          {/* Current Value */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
              Current:
            </p>
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
              {current.toLocaleString()}
            </p>
          </div>

          {/* Percentage Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '6px',
              ...statusBadgeStyle,
            }}
          >
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 600, fontFamily: 'DM Sans' }}>
              {percentage}%
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{ flex: 1, minWidth: 0, position: 'relative', height: isXL ? '12px' : '10px' }}>
            {/* Background */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F3F6F9',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Fill */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${Math.min(fillPercentage, 100)}%`,
                  backgroundColor: statusColor,
                  borderRadius: '6px',
                  transition: 'width 0.3s ease',
                }}
              />

              {/* Target Marker */}
              <div
                style={{
                  position: 'absolute',
                  left: `${Math.min(targetPercentage, 100)}%`,
                  top: '-2px',
                  width: '2px',
                  height: 'calc(100% + 4px)',
                  backgroundColor: '#17263D',
                  transform: 'translateX(-1px)',
                }}
              />
            </div>

            {/* Target Label Below Bar */}
            <div
              style={{
                position: 'absolute',
                left: `${Math.min(targetPercentage, 100)}%`,
                top: '100%',
                transform: 'translateX(-50%)',
                marginTop: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              <p style={{ fontSize: '10px', lineHeight: '16px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                Target: {target.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Capacity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
              Total Capacity:
            </p>
            <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
              {capacity.toLocaleString()}
            </p>
          </div>

          {/* Settings Icon */}
          {showSettings && (
            <button
              onClick={onSettingsClick}
              style={{
                padding: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <GearSix size={16} weight="regular" color="#7F8FA4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
