'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUpLeft,
  Info,
  ArrowSquareOut,
  HouseSimple,
  BuildingApartment,
} from '@phosphor-icons/react';
import { CARD_CURVATURE, COLORS, SPACING } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

type DirectionIcon = 'up-right' | 'down-right' | 'down-left' | 'up-left';
type PerformanceStatus = 'excellent' | 'good' | 'warning';

export interface PerformanceCardProps {
  /** Region name (e.g., "Northeast", "Midwest", "Southeast", "West") */
  region: string;

  /** Direction arrow icon */
  directionIcon: DirectionIcon;

  /** Number of alerts (0 if none) */
  alerts?: number;

  /** Performance status determines pill color */
  status: PerformanceStatus;

  /** Execution rate percentage (e.g., "78.3%") */
  executionRate: string;

  /** Volume in tons (e.g., "420K Tons") */
  volume: string;

  /** Savings amount (e.g., "$2M") */
  savings: string;

  /** Untapped potential dollar amount (e.g., "$720K") */
  untappedPotential: string;

  /** Number of facilities */
  facilities: number;

  /** Number of plants */
  plants: number;

  /** Number of terminals */
  terminals: number;

  /** Optional click handler for alerts link */
  onAlertsClick?: () => void;

  /** Optional click handler for review link */
  onReviewClick?: () => void;

  /** Additional className for custom styling */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getDirectionIcon = (direction: DirectionIcon) => {
  const iconProps = {
    size: 14,
    weight: 'regular' as const,
    className: 'text-[#17263D]',
  };

  switch (direction) {
    case 'up-right':
      return <ArrowUpRight {...iconProps} />;
    case 'down-right':
      return <ArrowDownRight {...iconProps} />;
    case 'down-left':
      return <ArrowDownLeft {...iconProps} />;
    case 'up-left':
      return <ArrowUpLeft {...iconProps} />;
  }
};

const getStatusStyles = (status: PerformanceStatus) => {
  switch (status) {
    case 'excellent':
      return {
        backgroundColor: COLORS.semantic.success[100], // #D6F5E1
        dotColor: COLORS.semantic.success[500], // #34C759
        textColor: COLORS.text.primary, // #17263D
        label: 'Excellent',
      };
    case 'good':
      return {
        backgroundColor: COLORS.semantic.info[100], // #D6EDFF
        dotColor: COLORS.semantic.info[500], // #007AFF
        textColor: COLORS.text.primary, // #17263D
        label: 'Good',
      };
    case 'warning':
      return {
        backgroundColor: COLORS.semantic.warning[100], // #FFF5CC
        dotColor: COLORS.semantic.warning[500], // #FFD400
        textColor: COLORS.text.primary, // #17263D
        label: 'Warning',
      };
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * PerformanceCard Component
 * Displays regional performance metrics with exact Figma specifications
 * Includes execution rate, savings, and untapped potential breakdown
 */
export const PerformanceCard = React.forwardRef<HTMLDivElement, PerformanceCardProps>(
  (
    {
      region,
      directionIcon,
      alerts = 0,
      status,
      executionRate,
      volume,
      savings,
      untappedPotential,
      facilities,
      plants,
      terminals,
      onAlertsClick,
      onReviewClick,
      className,
    },
    ref
  ) => {
    const statusStyles = getStatusStyles(status);
    const [displayRate, setDisplayRate] = useState('0%');
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Subtle animation for execution rate
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);

              const targetNum = parseFloat(executionRate.replace('%', ''));
              const duration = 800; // 0.8 seconds
              const startTime = Date.now();
              const startNum = targetNum * 0.92; // Start from 92%

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentNum = startNum + (targetNum - startNum) * easeOut;

                setDisplayRate(`${currentNum.toFixed(1)}%`);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setDisplayRate(executionRate);
                }
              };

              setTimeout(() => requestAnimationFrame(animate), 100);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [executionRate, isVisible]);

    return (
      <div
        ref={cardRef}
        className={className}
        style={{
          width: '100%',
          backgroundColor: '#F3F6F9',
          borderRadius: CARD_CURVATURE,
          padding: SPACING[16],
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[12],
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: SPACING[8],
          }}
        >
          {/* Left: Direction Icon + Region Name + Info Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
            }}
          >
            {/* Direction Icon Circle */}
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: COLORS.neutral[0],
                border: `0.5px solid ${COLORS.border.subtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getDirectionIcon(directionIcon)}
            </div>

            {/* Region Name */}
            <h3
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                color: COLORS.text.primary,
                margin: 0,
              }}
            >
              {region}
            </h3>

            {/* Info Icon */}
            <Info size={14} weight="regular" className="text-[#7F8FA4]" />
          </div>

          {/* Right: Alerts Link + Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
            }}
          >
            {/* Alerts Link (if alerts > 0) */}
            {alerts > 0 && (
              <button
                onClick={onAlertsClick}
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 500,
                  color: COLORS.accent[500],
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {alerts} {alerts === 1 ? 'Alert' : 'Alerts'}
              </button>
            )}

            {/* Status Pill */}
            <div
              style={{
                padding: `${SPACING[2]} ${SPACING[12]}`,
                borderRadius: '9999px',
                backgroundColor: statusStyles.backgroundColor,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[4],
              }}
            >
              {/* Status Dot */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: statusStyles.dotColor,
                }}
              />
              {/* Status Label */}
              <span
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 400,
                  color: statusStyles.textColor,
                }}
              >
                {statusStyles.label}
              </span>
            </div>
          </div>
        </div>

        {/* Execution Rate Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[2],
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: 400,
              color: COLORS.text.secondary,
            }}
          >
            Execution Rate
          </div>

          {/* Values Row - All aligned to baseline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              gap: SPACING[12],
            }}
          >
            {/* Main Percentage */}
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '24px',
                lineHeight: '30px',
                fontWeight: 600,
                color: COLORS.accent[500],
              }}
            >
              {displayRate}
            </div>

            {/* Volume with right border */}
            <div
              style={{
                paddingRight: SPACING[12],
                borderRight: `0.5px solid ${COLORS.border.default}`,
                fontFamily: 'DM Sans',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 400,
                color: COLORS.text.primary,
              }}
            >
              {volume}
            </div>

            {/* Savings */}
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 400,
                color: COLORS.text.primary,
              }}
            >
              {savings} Savings
            </div>
          </div>
        </div>

        {/* Untapped Potential Section */}
        <div
          style={{
            borderTop: `0.5px solid ${COLORS.border.default}`,
            paddingTop: SPACING[8],
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: 400,
              color: COLORS.text.secondary,
              marginBottom: 0,
            }}
          >
            Untapped Potential:
          </div>

          {/* Bottom Row - Money/Review on left, Facilities on right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: SPACING[16],
            }}
          >
            {/* Left: Dollar Amount & Review Link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[8],
                flex: '1 0 0',
              }}
            >
              {/* Dollar Amount */}
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  lineHeight: '26px',
                  fontWeight: 600,
                  color: COLORS.text.primary,
                }}
              >
                {untappedPotential}
              </div>

              {/* Review Link */}
              <button
                onClick={onReviewClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[4],
                  fontFamily: 'DM Sans',
                  fontSize: '12px',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: COLORS.accent[500], // #1C58F7 - Blue from palette
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: `${SPACING[4]} ${SPACING[2]}`,
                  textDecoration: 'underline',
                }}
              >
                <span>Review</span>
                <ArrowSquareOut size={14} weight="regular" />
              </button>
            </div>

            {/* Right: Facilities Breakdown */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'end',
                gap: SPACING[8],
              }}
            >
              {/* Total Facilities with border */}
              <div
                style={{
                  paddingRight: SPACING[8],
                  borderRight: `0.5px solid ${COLORS.border.default}`,
                  fontFamily: 'DM Sans',
                  fontSize: '10px',
                  lineHeight: '16px',
                  fontWeight: 600,
                  color: COLORS.text.primary,
                  textTransform: 'uppercase',
                }}
              >
                {facilities} Facilities
              </div>

              {/* Plants */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[4],
                  paddingRight: SPACING[4],
                }}
              >
                <HouseSimple size={10} weight="regular" className="text-[#7F8FA4]" />
                <span
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '10px',
                    lineHeight: '16px',
                    fontWeight: 400,
                    color: COLORS.text.secondary,
                    textTransform: 'uppercase',
                  }}
                >
                  {plants} Plants
                </span>
              </div>

              {/* Terminals */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[4],
                  paddingRight: SPACING[4],
                }}
              >
                <BuildingApartment size={10} weight="regular" className="text-[#7F8FA4]" />
                <span
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '10px',
                    lineHeight: '16px',
                    fontWeight: 400,
                    color: COLORS.text.secondary,
                    textTransform: 'uppercase',
                  }}
                >
                  {terminals} Terminals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PerformanceCard.displayName = 'PerformanceCard';
