'use client';

import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY, CARD_CURVATURE } from '../design-tokens';
import { StatusPill } from './StatusPill';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CurrentStatusCardProps {
  /** Status type */
  status?: 'warning' | 'success' | 'error' | 'info';
  /** Production required value */
  productionRequired: string;
  /** Capacity utilization percentage (0-100) */
  capacityUtilization: number;
  /** Footer text */
  footerText: string;
  /** Optional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get progress bar color based on value */
const getProgressBarColor = (value: number): string => {
  if (value >= 80) return COLORS.semantic.success[500]; // Green
  if (value >= 50) return '#FFD400'; // Yellow
  return COLORS.semantic.error[500]; // Red
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * CurrentStatusCard Component
 * Displays current status with production required, capacity utilization progress bar
 *
 * Specifications from Figma:
 * - Width: 420px
 * - Background: #FFFFFF
 * - Border radius: 16px (CARD_CURVATURE)
 * - Padding: 16px
 * - Status pill with warning/success/error/info variants
 * - Large production value in blue
 * - Progress bar showing capacity utilization
 * - Footer text
 */
export const CurrentStatusCard = React.forwardRef<HTMLDivElement, CurrentStatusCardProps>(
  (
    {
      status = 'warning',
      productionRequired,
      capacityUtilization,
      footerText,
      className,
    },
    ref
  ) => {
    const progressBarColor = getProgressBarColor(capacityUtilization);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '420px',
          backgroundColor: '#f3f6f9',
          borderRadius: CARD_CURVATURE,
          padding: SPACING[16],
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[16],
        }}
      >
        {/* Header with Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontFamily: 'DM Sans',
              fontSize: '24px',
              lineHeight: '30px',
              fontWeight: 600,
              color: COLORS.text.primary,
              margin: 0,
            }}
          >
            Current Status
          </h3>
          <StatusPill
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            variant={status}
          />
        </div>

        {/* Production Required */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[4],
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
              fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
              fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            Production Required
          </p>
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '24px',
              lineHeight: '30px',
              fontWeight: 600,
              color: COLORS.accent[500],
              margin: 0,
            }}
          >
            {productionRequired}
          </p>
        </div>

        {/* Capacity Utilization Progress Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[8],
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
                color: COLORS.text.secondary,
                margin: 0,
              }}
            >
              Capacity Utilization
            </p>
            <p
              style={{
                fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                fontWeight: 500,
                color: COLORS.text.primary,
                margin: 0,
              }}
            >
              {capacityUtilization}%
            </p>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#E8EDF2',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${capacityUtilization}%`,
                height: '100%',
                backgroundColor: progressBarColor,
                borderRadius: '9999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Footer Text */}
        <p
          style={{
            fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
            fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
            lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
            fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
            color: COLORS.text.secondary,
            margin: 0,
          }}
        >
          {footerText}
        </p>
      </div>
    );
  }
);

CurrentStatusCard.displayName = 'CurrentStatusCard';
