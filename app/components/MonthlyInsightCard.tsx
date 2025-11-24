'use client';

import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY, CARD_CURVATURE } from '../design-tokens';
import { StatusPill } from './StatusPill';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface MonthlyInsightCardProps {
  /** Month name (e.g., "July", "August") */
  month: string;
  /** Whether this is the current month */
  isCurrent?: boolean;
  /** Alert count (e.g., "1 Alert", "2 Alerts") - optional */
  alertText?: string;
  /** Status variant for the status pill */
  status: 'warning' | 'success' | 'error' | 'info';
  /** Eyebrow text above main value (e.g., "Target vs Current") */
  eyebrow: string;
  /** Main metric value (e.g., "-2,049 Tons", "+1,663 Tons") */
  value: string;
  /** Coverage ratio value (e.g., "0.7X", "1.2X") */
  coverageRatio: string;
  /** Progress percentage (0-200) */
  progressPercentage: number;
  /** Progress text (e.g., "83% 9,752/11,801 Tons") */
  progressText: string;
  /** Description/action text at bottom */
  description: string;
  /** Optional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get progress bar background color based on percentage */
const getProgressBarBackground = (percentage: number): string => {
  if (percentage >= 100) return COLORS.semantic.success[300]; // Light green for >100%
  return COLORS.neutral[300]; // Gray for <100%
};

/** Get coverage ratio color based on value */
const getCoverageRatioColor = (ratio: string): string => {
  const numericRatio = parseFloat(ratio);
  if (numericRatio >= 1.0) return COLORS.semantic.success[700]; // Green for >=1.0
  return COLORS.semantic.error[500]; // Red for <1.0
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * MonthlyInsightCard Component
 * Displays monthly target inventory insights with status, progress, and coverage ratio
 *
 * Specifications from Figma:
 * - Width: 365px
 * - Background: #f3f6f9 (COLORS.neutral[100])
 * - Border radius: 16px (CARD_CURVATURE)
 * - Padding: 16px
 * - Header with month, alert badge, and status pill
 * - Main value with coverage ratio tag
 * - Progress bar with percentage and fraction
 * - Footer description with top border
 *
 * @example
 * ```tsx
 * <MonthlyInsightCard
 *   month="July"
 *   isCurrent={true}
 *   alertText="1 Alert"
 *   status="warning"
 *   eyebrow="Target vs Current"
 *   value="-2,049 Tons"
 *   coverageRatio="0.7X"
 *   progressPercentage={83}
 *   progressText="83% 9,752/11,801 Tons"
 *   description="Monitor weekly and prepare backup supply"
 * />
 * ```
 */
export const MonthlyInsightCard = React.forwardRef<HTMLDivElement, MonthlyInsightCardProps>(
  (
    {
      month,
      isCurrent = false,
      alertText,
      status,
      eyebrow,
      value,
      coverageRatio,
      progressPercentage,
      progressText,
      description,
      className,
    },
    ref
  ) => {
    const progressBarBg = getProgressBarBackground(progressPercentage);
    const coverageColor = getCoverageRatioColor(coverageRatio);
    const actualProgress = Math.min(progressPercentage, 100); // Cap display at 100%

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '365px',
          backgroundColor: '#f3f6f9',
          borderRadius: CARD_CURVATURE,
          padding: SPACING[16],
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[12],
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: SPACING[8],
          }}
        >
          {/* Month Title */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
                fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
                lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
                fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
                color: COLORS.text.primary,
                margin: 0,
              }}
            >
              {month}
              {isCurrent && (
                <span
                  style={{
                    color: COLORS.text.secondary,
                  }}
                >
                  {' (Current)'}
                </span>
              )}
            </p>
          </div>

          {/* Trailing: Alert Badge + Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
            }}
          >
            {alertText && (
              <p
                style={{
                  fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                  fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                  lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                  fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
                  color: COLORS.accent[700],
                  textDecoration: 'underline',
                  margin: 0,
                }}
              >
                {alertText}
              </p>
            )}
            <StatusPill
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              variant={status}
            />
          </div>
        </div>

        {/* Value Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[2],
          }}
        >
          {/* Eyebrow */}
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
            {eyebrow}
          </p>

          {/* Main Value + Coverage Ratio */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: SPACING[12],
            }}
          >
            {/* Main Value */}
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
              {value}
            </p>

            {/* Coverage Ratio Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingBottom: '2px',
              }}
            >
              {/* Label */}
              <div
                style={{
                  borderRight: `0.5px solid ${COLORS.border.default}`,
                  paddingRight: SPACING[8],
                }}
              >
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '10px',
                    lineHeight: '16px',
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  coverage ratio
                </p>
              </div>

              {/* Value */}
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '10px',
                  lineHeight: '16px',
                  fontWeight: 400,
                  color: coverageColor,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {coverageRatio}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[12],
              paddingTop: SPACING[4],
            }}
          >
            {/* Progress Bar */}
            <div
              style={{
                flex: 1,
                height: '6px',
                backgroundColor: progressBarBg,
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${actualProgress}%`,
                  height: '100%',
                  backgroundColor: COLORS.semantic.success[500],
                  borderRadius: '9999px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {/* Progress Text */}
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 400,
                color: COLORS.text.primary,
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontWeight: 500 }}>{progressPercentage}%</span>{' '}
              <span style={{ color: COLORS.text.secondary }}>
                {progressText.split('%')[1]?.trim()}
              </span>
            </p>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            borderTop: `0.5px solid ${COLORS.border.default}`,
            paddingTop: SPACING[12],
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
              fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
              fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
              color: COLORS.text.primary,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
);

MonthlyInsightCard.displayName = 'MonthlyInsightCard';
