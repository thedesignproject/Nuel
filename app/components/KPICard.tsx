'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  Package,
  ClockCounterClockwise,
  Bell,
  Info,
  CaretRight,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

type IconType = 'check-circle' | 'package' | 'clock' | 'bell';

interface ProgressBarProps {
  value: string;
  label: string;
}

interface ComparisonProps {
  preNuel: string;
  postNuel: string;
}

interface AlertTag {
  label: string;
  color: 'error' | 'warning';
}

export interface KPICardProps {
  /** Icon type to display */
  icon: IconType;

  /** Card title */
  title: string;

  /** Main value to display */
  value: string;

  /** Progress bar configuration (for standard KPI cards) */
  progressBar?: ProgressBarProps;

  /** Comparison values (for standard KPI cards) */
  comparison?: ComparisonProps;

  /** Alert tags (for alert variant) */
  alertTags?: AlertTag[];

  /** Review link handler (for alert variant) */
  onReviewClick?: () => void;

  /** Variant type */
  variant?: 'standard' | 'alert';

  /** Additional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getIcon = (iconType: IconType) => {
  const iconProps = {
    size: 14,
    weight: 'regular' as const,
    color: COLORS.accent[500],
  };

  switch (iconType) {
    case 'check-circle':
      return <CheckCircle {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'clock':
      return <ClockCounterClockwise {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * KPICard Component
 * Displays KPI metrics with progress bars and comparisons
 * Supports standard and alert variants
 */
export const KPICard = React.forwardRef<HTMLDivElement, KPICardProps>(
  (
    {
      icon,
      title,
      value,
      progressBar,
      comparison,
      alertTags,
      onReviewClick,
      variant = 'standard',
      className,
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [progressWidth, setProgressWidth] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Subtle number animation
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);

              // Animate number
              if (value.includes('%') && variant === 'standard') {
                const targetNum = parseFloat(value.replace('%', ''));
                const duration = 800;
                const startTime = Date.now();
                const startNum = targetNum - 2; // Animate last 2%

                const animate = () => {
                  const elapsed = Date.now() - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const easeOut = 1 - Math.pow(1 - progress, 3);
                  const currentNum = startNum + (targetNum - startNum) * easeOut;

                  setDisplayValue(`${currentNum.toFixed(1)}%`);

                  if (progress < 1) {
                    requestAnimationFrame(animate);
                  } else {
                    setDisplayValue(value);
                  }
                };

                setTimeout(() => requestAnimationFrame(animate), 100);
              }

              // Animate progress bar
              if (progressBar && variant === 'standard') {
                const targetWidth = parseFloat(value.replace('%', ''));
                const targetProgress = (targetWidth / 100) * 80; // 80px max width

                setTimeout(() => {
                  setProgressWidth(targetProgress);
                }, 200);
              }
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
    }, [value, isVisible, variant, progressBar]);

    return (
      <div
        ref={cardRef}
        className={className}
        style={{
          width: variant === 'alert' ? '310.25px' : '280.25px',
          height: variant === 'alert' ? '176px' : 'auto',
          backgroundColor: COLORS.neutral[0],
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
            gap: SPACING[8],
          }}
        >
          {/* Icon in rounded background */}
          <div
            style={{
              backgroundColor: COLORS.accent[100],
              borderRadius: '9999px',
              padding: SPACING[4],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getIcon(icon)}
          </div>

          {/* Title */}
          <div
            style={{
              flex: '1 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[4],
            }}
          >
            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 500,
                color: COLORS.text.primary,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
            <Info size={12} weight="regular" color={COLORS.text.secondary} />
          </div>
        </div>

        {/* Standard Variant */}
        {variant === 'standard' && (
          <>
            {/* Value Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING[2],
              }}
            >
              {/* Main Value */}
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  lineHeight: '26px',
                  fontWeight: 700,
                  color: COLORS.accent[500],
                }}
              >
                {displayValue}
              </div>

              {/* Progress Bar */}
              {progressBar && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[12],
                  }}
                >
                  {/* Progress Bar Track */}
                  <div
                    style={{
                      width: '80px',
                      height: '6px',
                      backgroundColor: COLORS.neutral[200],
                      borderRadius: '9999px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Progress Fill */}
                    <div
                      style={{
                        width: `${progressWidth}px`,
                        height: '100%',
                        backgroundColor: COLORS.semantic.success[500],
                        borderRadius: '9999px',
                        transition: 'width 1s ease-out',
                      }}
                    />
                  </div>

                  {/* Progress Label */}
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: COLORS.text.primary,
                    }}
                  >
                    {progressBar.label}
                  </span>
                </div>
              )}
            </div>

            {/* Comparison Section */}
            {comparison && (
              <div
                style={{
                  borderTop: `0.5px solid ${COLORS.border.subtle}`,
                  paddingTop: SPACING[8],
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[8],
                }}
              >
                {/* Pre-Nuel */}
                <div
                  style={{
                    flex: '1 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 500,
                      color: COLORS.text.secondary,
                    }}
                  >
                    Pre-Nuel
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: COLORS.text.secondary,
                    }}
                  >
                    {comparison.preNuel}
                  </span>
                </div>

                {/* Arrow */}
                <CaretRight size={14} weight="regular" color={COLORS.text.secondary} />

                {/* Post-Nuel */}
                <div
                  style={{
                    flex: '1 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 500,
                      color: COLORS.text.primary,
                    }}
                  >
                    Post-Nuel
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: COLORS.text.primary,
                    }}
                  >
                    {comparison.postNuel}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Alert Variant */}
        {variant === 'alert' && (
          <div
            style={{
              flex: '1 0 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Alert Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {/* Main Value */}
              <div
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  lineHeight: '26px',
                  fontWeight: 700,
                  color: COLORS.accent[500],
                }}
              >
                {value}
              </div>

              {/* Alert Tags */}
              {alertTags && alertTags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[8],
                  }}
                >
                  {alertTags.map((tag, index) => (
                    <React.Fragment key={index}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: SPACING[4],
                          paddingRight: index < alertTags.length - 1 ? SPACING[8] : 0,
                          borderRight:
                            index < alertTags.length - 1
                              ? `0.5px solid ${COLORS.border.default}`
                              : 'none',
                        }}
                      >
                        {/* Colored Dot */}
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor:
                              tag.color === 'error'
                                ? COLORS.semantic.error[500]
                                : '#A58B00',
                          }}
                        />
                        {/* Label */}
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '10px',
                            lineHeight: '16px',
                            fontWeight: 400,
                            color:
                              tag.color === 'error'
                                ? COLORS.semantic.error[500]
                                : '#A58B00',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tag.label}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Review Link */}
            <div
              style={{
                borderTop: `0.5px solid ${COLORS.border.subtle}`,
                paddingTop: SPACING[8],
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={onReviewClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING[4],
                  padding: `${SPACING[4]} ${SPACING[2]}`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: SPACING[12],
                }}
              >
                <span
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    color: COLORS.accent[500],
                    textDecoration: 'underline',
                  }}
                >
                  Review
                </span>
                <ArrowSquareOut size={14} weight="regular" color={COLORS.accent[500]} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

KPICard.displayName = 'KPICard';
