'use client';

import React from 'react';
import { ChartLine } from '@phosphor-icons/react';
import { COLORS, SPACING } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface RegionalPerformanceHeaderProps {
  /** Active view: 0 for Grid View, 1 for Table View */
  activeView: number;
  /** Callback when view changes */
  onViewChange: (index: number) => void;
  /** Additional className for custom styling */
  className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * RegionalPerformanceHeader Component
 * Section header with tab toggle and performance legend
 * Exact specifications from Figma for Regional Performance Overview
 */
export const RegionalPerformanceHeader = React.forwardRef<HTMLDivElement, RegionalPerformanceHeaderProps>(
  ({ activeView, onViewChange, className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          paddingBottom: SPACING[16],
          borderBottom: `0.5px solid ${COLORS.border.subtle}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: SPACING[24],
        }}
      >
        {/* Left Side - Title & Description with Legend */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[12],
            flex: 1,
          }}
        >
          {/* Title Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
            }}
          >
            {/* Icon */}
            <ChartLine size={24} weight="regular" className="text-[#17263D]" />

            {/* Title & Description */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING[2],
              }}
            >
              {/* Title */}
              <h2
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '24px',
                  lineHeight: '30px',
                  fontWeight: 600,
                  color: COLORS.text.primary,
                  margin: 0,
                }}
              >
                Regional Performance Overview
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: 400,
                  color: COLORS.text.secondary,
                  margin: 0,
                }}
              >
                Execution rates and untapped savings potential by region
              </p>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[16],
              marginLeft: '32px', // Align with title text (24px icon + 8px gap)
            }}
          >
            {/* Excellent */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[8],
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: COLORS.semantic.success[500],
                }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 400,
                  color: COLORS.text.primary,
                }}
              >
                Excellent (≥90%)
              </span>
            </div>

            {/* Good */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[8],
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: COLORS.semantic.info[500],
                }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 400,
                  color: COLORS.text.primary,
                }}
              >
                Good (80-89%)
              </span>
            </div>

            {/* Warning */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[8],
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: COLORS.semantic.warning[500],
                }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: 400,
                  color: COLORS.text.primary,
                }}
              >
                Warning (&lt;80%)
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Tab Toggle */}
        <div
          style={{
            display: 'flex',
            gap: SPACING[4],
            padding: SPACING[4],
            backgroundColor: COLORS.neutral[100],
            borderRadius: '8px',
          }}
        >
          {/* Grid View Tab */}
          <button
            onClick={() => onViewChange(0)}
            style={{
              padding: `${SPACING[4]} ${SPACING[12]}`,
              borderRadius: '4px',
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: activeView === 0 ? 500 : 400,
              backgroundColor: activeView === 0 ? COLORS.accent[100] : 'transparent',
              color: activeView === 0 ? COLORS.accent[700] : COLORS.text.secondary,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            Grid View
          </button>

          {/* Table View Tab */}
          <button
            onClick={() => onViewChange(1)}
            style={{
              padding: `${SPACING[4]} ${SPACING[12]}`,
              borderRadius: '4px',
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: activeView === 1 ? 500 : 400,
              backgroundColor: activeView === 1 ? COLORS.accent[100] : 'transparent',
              color: activeView === 1 ? COLORS.accent[700] : COLORS.text.secondary,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            Table View
          </button>
        </div>
      </div>
    );
  }
);

RegionalPerformanceHeader.displayName = 'RegionalPerformanceHeader';
