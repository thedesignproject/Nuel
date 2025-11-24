'use client';

import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';
import { COLORS, SPACING, TYPOGRAPHY } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PieChartDataItem {
  /** Label for the segment */
  label: string;
  /** Numeric value */
  value: number;
  /** Percentage as number (e.g., 65.6) */
  percentage: number;
  /** Hex color for the segment */
  color: string;
}

export interface PieChartProps {
  /** Array of data items for the pie chart */
  data: PieChartDataItem[];
  /** Chart diameter in pixels */
  diameter?: number;
  /** Whether to show legend below chart */
  showLegend?: boolean;
  /** Whether to show tooltips on hover */
  showTooltip?: boolean;
  /** Additional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Format number with commas */
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

// ============================================
// SUB-COMPONENTS
// ============================================

/** Custom Tooltip Component */
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: PieChartDataItem;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div
      style={{
        backgroundColor: COLORS.neutral[0],
        padding: SPACING[12],
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        border: `0.5px solid ${COLORS.border.subtle}`,
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
          fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
          fontWeight: 600,
          color: COLORS.text.primary,
          margin: 0,
          marginBottom: SPACING[4],
        }}
      >
        {data.label}
      </p>

      {/* Percentage and Value */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING[8],
        }}
      >
        <p
          style={{
            fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
            fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
            lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
            fontWeight: 600,
            color: data.color,
            margin: 0,
          }}
        >
          {data.percentage}%
        </p>
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
          {formatNumber(data.value)} Tons
        </p>
      </div>
    </div>
  );
};

/** Legend Component */
interface LegendProps {
  data: PieChartDataItem[];
}

const Legend = ({ data }: LegendProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[8],
        width: '100%',
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING[8],
            width: '100%',
          }}
        >
          {/* Color Dot */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: item.color,
              flexShrink: 0,
            }}
          />

          {/* Label and Values */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[4],
              flex: 1,
              minWidth: 0,
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
              {item.label}:
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
              {item.percentage}%
            </p>
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
              {formatNumber(item.value)} Tons
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * PieChart Component
 * Reusable donut-style pie chart with legend and tooltips
 *
 * Specifications from Figma:
 * - Donut style with 50% inner radius
 * - Default diameter: 150px
 * - Legend with colored dots positioned below chart
 * - Tooltips on hover showing label, percentage, and value
 * - Uses design tokens for all styling
 *
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { label: 'Open Orders', value: 84250, percentage: 65.6, color: '#1C58F7' },
 *     { label: 'Seasonal', value: 32892, percentage: 25.0, color: '#A8C3FF' },
 *     { label: 'Safety', value: 12826, percentage: 9.4, color: '#E3ECFF' },
 *   ]}
 *   diameter={150}
 *   showLegend={true}
 *   showTooltip={true}
 * />
 * ```
 */
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      diameter = 150,
      showLegend = true,
      showTooltip = true,
      className,
    },
    ref
  ) => {
    // Calculate inner and outer radius for donut effect
    const outerRadius = diameter / 2;
    const innerRadius = outerRadius * 0.5; // 50% inner radius for donut

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING[16],
          width: '100%',
        }}
      >
        {/* Pie Chart */}
        <div
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            flexShrink: 0,
          }}
        >
          <RechartsPieChart width={diameter} height={diameter}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              nameKey="label"
              paddingAngle={0}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </RechartsPieChart>
        </div>

        {/* Legend */}
        {showLegend && <Legend data={data} />}
      </div>
    );
  }
);

PieChart.displayName = 'PieChart';
