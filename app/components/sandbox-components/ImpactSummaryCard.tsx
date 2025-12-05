'use client';

import React, { useState } from 'react';
import { TrendUp, CaretDown } from '@phosphor-icons/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/app/design-tokens';

interface ImpactSummaryCardProps {
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  description: string;
  breakdownItems?: Array<{
    label: string;
    value: string;
    color: string;
  }>;
}

export const ImpactSummaryCard: React.FC<ImpactSummaryCardProps> = ({
  label,
  value,
  trend,
  trendDirection,
  description,
  breakdownItems = [],
}) => {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        gap: SPACING[12],
        padding: SPACING[16],
        backgroundColor: COLORS.neutral[200],
        borderRadius: BORDER_RADIUS.card,
      }}
    >
      {/* Label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          gap: SPACING[2],
        }}
      >
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.secondary,
          }}
        >
          {label}
        </span>
      </div>

      {/* Values */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignSelf: 'stretch',
          gap: SPACING[12],
        }}
      >
        {/* Main Value */}
        <span
          style={{
            ...TYPOGRAPHY.headingH5,
            color: COLORS.text.dark,
          }}
        >
          {value}
        </span>

        {/* Trend Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING[4],
            padding: '0px 4px 0px 0px',
          }}
        >
          <TrendUp size={10} weight="bold" color={COLORS.semantic.error[500]} />
          <span
            style={{
              ...TYPOGRAPHY.bodySmallMedium,
              color: COLORS.semantic.error[500],
            }}
          >
            {trend}
          </span>
        </div>
      </div>

      {/* Horizontal Border */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          alignSelf: 'stretch',
          gap: SPACING[8],
          paddingBottom: SPACING[8],
          borderBottom: `1px solid ${COLORS.border.default}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <span
            style={{
              ...TYPOGRAPHY.bodySmallText,
              color: COLORS.text.primary,
              textAlign: 'center',
            }}
          >
            {description}
          </span>
        </div>
      </div>

      {/* View Cost Breakdown Button */}
      <button
        onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: SPACING[4],
          padding: '2px 12px',
          borderRadius: BORDER_RADIUS.full,
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.secondary,
          }}
        >
          View Cost Breakdown
        </span>
        <CaretDown
          size={18}
          weight="regular"
          color={COLORS.text.secondary}
          style={{
            transform: isBreakdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </button>

      {/* Breakdown Items (collapsible) */}
      {isBreakdownOpen && breakdownItems.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[8],
            paddingTop: SPACING[8],
            borderTop: `1px solid ${COLORS.border.default}`,
          }}
        >
          {breakdownItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SPACING[8],
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <span
                  style={{
                    ...TYPOGRAPHY.bodyExtraSmallText,
                    color: COLORS.text.secondary,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                style={{
                  ...TYPOGRAPHY.bodyExtraSmallMedium,
                  color: COLORS.text.primary,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
