'use client';

import React from 'react';
import {
  GasPump,
  TrendUp,
  TrendDown,
  Receipt,
  Train,
  Sparkle,
} from '@phosphor-icons/react';
import { COLORS, SPACING } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

type TrendDirection = 'up' | 'down';
type IconType = 'gas-pump' | 'trend-up' | 'receipt' | 'train' | 'sparkle';

export interface ExternalFactorItem {
  /** Icon type to display */
  icon?: IconType;
  /** Factor title */
  title: string;
  /** Factor description */
  description: string;
  /** Primary value (e.g., "+$12.5/Ton") */
  value: string;
  /** Secondary value (e.g., "+15.2%") */
  secondaryValue: string;
  /** Trend direction for icon and color */
  trend: TrendDirection;
  /** Whether this is the net impact row (bold, no icon) */
  isNetImpact?: boolean;
}

export interface ExternalFactorsListProps {
  /** Array of factor items to display */
  items: ExternalFactorItem[];
  /** Additional className for custom styling */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getIcon = (iconType: IconType) => {
  const iconProps = {
    size: 16,
    weight: 'regular' as const,
    className: 'text-[#1339A0]',
  };

  switch (iconType) {
    case 'gas-pump':
      return <GasPump {...iconProps} />;
    case 'trend-up':
      return <TrendUp {...iconProps} />;
    case 'receipt':
      return <Receipt {...iconProps} />;
    case 'train':
      return <Train {...iconProps} />;
    case 'sparkle':
      return <Sparkle {...iconProps} />;
  }
};

const getTrendIcon = (trend: TrendDirection) => {
  if (trend === 'up') {
    return <TrendUp size={16} weight="regular" className="text-[#FF3B30]" />;
  } else {
    return <TrendDown size={16} weight="regular" className="text-[#34C759]" />;
  }
};

const getTrendColor = (trend: TrendDirection) => {
  return trend === 'up' ? COLORS.semantic.error[500] : COLORS.semantic.success[500];
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * ExternalFactorsList Component
 * Displays a list of external factors with their impact values
 * Exact specifications from Figma
 */
export const ExternalFactorsList = React.forwardRef<HTMLDivElement, ExternalFactorsListProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          backgroundColor: COLORS.neutral[0],
          borderRadius: '16px',
          padding: `${SPACING[16]} ${SPACING[24]}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isNetImpact = item.isNetImpact;

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[16],
                paddingBottom: isLast ? '0' : SPACING[12],
                borderBottom: isLast ? 'none' : `0.5px solid ${COLORS.border.subtle}`,
                width: '100%',
              }}
            >
              {/* Left Section - Title & Description */}
              <div
                style={{
                  flex: '1 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: SPACING[16],
                }}
              >
                {/* Title Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[8],
                    width: '100%',
                  }}
                >
                  {/* Icon (if not net impact) */}
                  {!isNetImpact && item.icon && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '1px',
                      }}
                    >
                      {getIcon(item.icon)}
                    </div>
                  )}

                  {/* Title */}
                  <div
                    style={{
                      flex: '1 0 0',
                      fontFamily: 'DM Sans',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: isNetImpact ? 600 : 600,
                      color: COLORS.text.primary,
                    }}
                  >
                    {item.title}
                  </div>
                </div>

                {/* Description (if not net impact) */}
                {!isNetImpact && item.description && (
                  <div
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: COLORS.text.secondary,
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>

              {/* Right Section - Values */}
              <div
                style={{
                  width: isNetImpact ? 'auto' : '140px',
                  display: 'flex',
                  flexDirection: isNetImpact ? 'row' : 'column',
                  alignItems: isNetImpact ? 'center' : 'flex-end',
                  justifyContent: 'center',
                  paddingLeft: SPACING[12],
                  gap: isNetImpact ? SPACING[12] : 0,
                }}
              >
                {/* Primary Value with Trend Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[4],
                    width: isNetImpact ? 'auto' : '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  {!isNetImpact && getTrendIcon(item.trend)}
                  <div
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: isNetImpact ? 600 : 400,
                      color: isNetImpact ? COLORS.text.primary : getTrendColor(item.trend),
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.value}
                  </div>
                </div>

                {/* Secondary Value */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING[4],
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: isNetImpact ? '#717182' : COLORS.text.secondary,
                      textAlign: 'right',
                      whiteSpace: isNetImpact ? 'nowrap' : 'normal',
                    }}
                  >
                    {item.secondaryValue}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

ExternalFactorsList.displayName = 'ExternalFactorsList';
