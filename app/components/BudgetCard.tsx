'use client';

import React from 'react';
import { TrendingUp, Target, TrendingDown } from 'lucide-react';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type BudgetCardIcon = 'trending-up' | 'target' | 'trending-down';

export interface BudgetCardProps {
  /** Icon to display */
  icon?: BudgetCardIcon;
  /** Card title */
  title: string;
  /** Optional tag text (e.g., "FY2026") */
  tag?: string;
  /** Main value to display (e.g., "254,000 Tons") */
  value: string;
  /** Insight text below the value */
  insight: string;
  /** Whether to highlight the insight text in green */
  highlightInsight?: boolean;
  /** Whether to show the vertical indicator line (for Variance card) */
  showIndicatorLine?: boolean;
  /** Optional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get icon component based on icon type */
const getIconComponent = (iconType?: BudgetCardIcon) => {
  switch (iconType) {
    case 'trending-up':
      return TrendingUp;
    case 'trending-down':
      return TrendingDown;
    case 'target':
      return Target;
    default:
      return TrendingUp;
  }
};

/** Extract highlight from insight text (e.g., "+5.8%") */
const parseInsightText = (
  insight: string,
  shouldHighlight: boolean
): { highlight: string | null; text: string } => {
  if (!shouldHighlight) {
    return { highlight: null, text: insight };
  }

  // Match patterns like "+5.8%" or "-3.2%"
  const match = insight.match(/([+-]?\d+\.?\d*%)/);
  if (match) {
    const highlight = match[1];
    const text = insight.replace(highlight, '').trim();
    return { highlight, text };
  }

  return { highlight: null, text: insight };
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * BudgetCard Component
 * Metric card variant for Budget Planning section showing forecast metrics
 *
 * Specifications from Figma:
 * - Width: 356px
 * - Background: #f3f6f9 (COLORS.neutral[100])
 * - Border radius: 16px (CARD_CURVATURE)
 * - Padding: 16px
 * - Icon: 20×20px, blue color #1339a0
 * - Title: Inter Medium, 16px, line-height 24px
 * - Tag: Optional, gray background #e8edf2
 * - Main Value: Inter Semi Bold, 18px, line-height 26px, gradient text
 * - Insight: Inter Regular/Medium, 12px, line-height 20px
 * - Green highlight for positive percentages: #34c759
 *
 * @example
 * ```tsx
 * // Total Forecast Card
 * <BudgetCard
 *   icon="trending-up"
 *   title="Total Forecast"
 *   tag="FY2026"
 *   value="254,000 Tons"
 *   insight="+5.8% vs. previous year"
 *   highlightInsight={true}
 * />
 *
 * // Budget Target Card
 * <BudgetCard
 *   icon="target"
 *   title="Budget Target"
 *   value="249,000 Tons"
 *   insight="+3.7% vs. previous year"
 *   highlightInsight={true}
 * />
 *
 * // Variance Card
 * <BudgetCard
 *   icon="trending-down"
 *   title="Variance"
 *   value="+5,000 Tons"
 *   insight="2.0% above budget"
 *   showIndicatorLine={true}
 * />
 * ```
 */
export const BudgetCard = React.forwardRef<HTMLDivElement, BudgetCardProps>(
  (
    {
      icon = 'trending-up',
      title,
      tag,
      value,
      insight,
      highlightInsight = false,
      showIndicatorLine = false,
      className,
    },
    ref
  ) => {
    const IconComponent = getIconComponent(icon);
    const { highlight, text } = parseInsightText(insight, highlightInsight);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: 'relative',
          width: '356px',
          backgroundColor: '#f3f6f9',
          borderRadius: CARD_CURVATURE,
          padding: SPACING[16],
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[12],
          overflow: 'hidden',
        }}
      >
        {/* Vertical Indicator Line (for Variance card) */}
        {showIndicatorLine && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '164px',
              backgroundColor: '#070d15',
              borderRadius: '0 2px 2px 0',
            }}
          />
        )}

        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING[4],
          }}
        >
          {/* Icon */}
          <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>
            <IconComponent size={20} color="#1339a0" strokeWidth={2} />
          </div>

          {/* Title and Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
              width: '100%',
            }}
          >
            <p
              style={{
                flex: 1,
                fontFamily: 'DM Sans',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 500,
                color: COLORS.text.primary,
                margin: 0,
              }}
            >
              {title}
            </p>

            {/* Optional Tag */}
            {tag && (
              <div
                style={{
                  backgroundColor: '#e8edf2',
                  borderRadius: '4px',
                  padding: `1px ${SPACING[8]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    lineHeight: '20px',
                    fontWeight: 500,
                    color: '#3f4e66',
                    margin: 0,
                  }}
                >
                  {tag}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Value Section */}
        <div
          style={{
            borderBottom: `0.5px solid #d9e0e9`,
            paddingBottom: SPACING[8],
          }}
        >
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '18px',
              lineHeight: '26px',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #1C58F7 0%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {value}
          </p>
        </div>

        {/* Insight Section */}
        <div
          style={{
            paddingLeft: '2px',
          }}
        >
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: 400,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            {highlight && (
              <span
                style={{
                  fontWeight: 500,
                  color: '#34c759',
                }}
              >
                {highlight}
              </span>
            )}
            {highlight && ' '}
            {text}
          </p>
        </div>
      </div>
    );
  }
);

BudgetCard.displayName = 'BudgetCard';
