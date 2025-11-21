'use client';

import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY, CARD_CURVATURE } from '../design-tokens';
import { PieChart, PieChartDataItem } from './PieChart';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface TargetComponentsCardProps {
  /** Subtitle text below title */
  subtitle: string;
  /** Data for the pie chart */
  data: PieChartDataItem[];
  /** Optional className */
  className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * TargetComponentsCard Component
 * Displays target components breakdown with pie chart and legend
 *
 * Specifications from Figma:
 * - Width: 420px
 * - Background: #FFFFFF
 * - Border radius: 16px (CARD_CURVATURE)
 * - Padding: 16px
 * - Title: "Target Components"
 * - Subtitle
 * - Pie chart (150px diameter)
 * - Legend below chart
 */
export const TargetComponentsCard = React.forwardRef<
  HTMLDivElement,
  TargetComponentsCardProps
>(({ subtitle, data, className }, ref) => {
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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[4],
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
          Target Components
        </h3>
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
          {subtitle}
        </p>
      </div>

      {/* Pie Chart with Legend */}
      <PieChart data={data} diameter={150} showLegend={true} showTooltip={true} />
    </div>
  );
});

TargetComponentsCard.displayName = 'TargetComponentsCard';
