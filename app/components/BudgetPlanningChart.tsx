'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS, SPACING, TYPOGRAPHY } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface BudgetChartDataItem {
  /** Quarter label (e.g., "Q1 2026") */
  quarter: string;
  /** Forecast value in tons */
  forecast: number;
  /** Budget value in tons */
  budget: number;
}

export interface BudgetPlanningChartProps {
  /** Array of data items for the chart */
  data: BudgetChartDataItem[];
  /** Chart width in pixels */
  width?: number;
  /** Chart height in pixels */
  height?: number;
  /** Whether to show legend */
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

/** Format Y-axis tick values */
const formatYAxisTick = (value: number): string => {
  return formatNumber(value);
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
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

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
      {/* Quarter Label */}
      <p
        style={{
          fontFamily: 'DM Sans',
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: 600,
          color: COLORS.text.primary,
          margin: 0,
          marginBottom: SPACING[8],
        }}
      >
        {label}
      </p>

      {/* Values */}
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING[8],
            marginBottom: index < payload.length - 1 ? SPACING[4] : 0,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              flexShrink: 0,
            }}
          />
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
            {entry.name === 'forecast' ? 'Forecast' : 'Budget'}:{' '}
            <span style={{ fontWeight: 500, color: COLORS.text.primary }}>
              {formatNumber(entry.value)} Tons
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

/** Custom Legend Component */
interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        paddingTop: SPACING[24],
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '2px',
              backgroundColor: entry.color,
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 400,
              color: COLORS.text.primary,
              margin: 0,
            }}
          >
            {entry.value === 'forecast' ? 'Forecast' : 'Budget'}
          </p>
        </div>
      ))}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * BudgetPlanningChart Component
 * Grouped vertical bar chart showing Forecast vs Budget data by quarter
 *
 * Specifications from Figma:
 * - Chart dimensions: 1132px × 268px
 * - Grouped vertical bars (2 per quarter)
 * - Bar width: 80px, gap between bars: 8px
 * - Bar colors: Forecast (#9db8ff), Budget (#1339a0)
 * - Y-axis scale: 0 to 80,000 with 20,000 intervals
 * - Grid lines: horizontal, color #d9e0e9
 * - Legend below chart with colored squares
 *
 * @example
 * ```tsx
 * <BudgetPlanningChart
 *   data={[
 *     { quarter: 'Q1 2026', forecast: 54000, budget: 50000 },
 *     { quarter: 'Q2 2026', forecast: 61000, budget: 57000 },
 *     { quarter: 'Q3 2026', forecast: 71000, budget: 68000 },
 *     { quarter: 'Q4 2026', forecast: 57000, budget: 56000 },
 *   ]}
 *   width={1132}
 *   height={268}
 * />
 * ```
 */
export const BudgetPlanningChart = React.forwardRef<HTMLDivElement, BudgetPlanningChartProps>(
  (
    {
      data,
      width = 1132,
      height = 268,
      showLegend = true,
      showTooltip = true,
      className,
    },
    ref
  ) => {
    // Bar styling
    const forecastBarColor = '#9DB8FF'; // Light blue from Figma
    const budgetBarColor = '#17263D'; // Dark blue from Figma (text primary)
    const barSize = 80; // Bar width
    const barGap = 8;
    const barCategoryGap = '20%'; // Use percentage for better spacing

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Chart Container */}
        <div style={{ width: '100%', height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barGap={barGap}
              barCategoryGap={barCategoryGap}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="0"
                stroke="rgba(217, 224, 233, 1)"
                vertical={false}
                horizontalPoints={[8, 54, 100, 146, 192]}
              />

              {/* X Axis */}
              <XAxis
                dataKey="quarter"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: 'DM Sans',
                  fontSize: 12,
                  fontWeight: 400,
                  fill: '#99a5b8',
                }}
                dy={10}
              />

              {/* Y Axis */}
              <YAxis
                domain={[0, 80000]}
                ticks={[0, 20000, 40000, 60000, 80000]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: 'DM Sans',
                  fontSize: 14,
                  fontWeight: 400,
                  fill: '#99a5b8',
                }}
                tickFormatter={formatYAxisTick}
                width={68}
              />

              {/* Tooltip */}
              {showTooltip && <Tooltip content={<CustomTooltip />} cursor={false} />}

              {/* Legend */}
              {showLegend && <Legend content={<CustomLegend />} />}

              {/* Bars */}
              <Bar
                dataKey="forecast"
                fill={forecastBarColor}
                radius={[4, 4, 0, 0]}
                barSize={barSize}
              />
              <Bar
                dataKey="budget"
                fill={budgetBarColor}
                radius={[4, 4, 0, 0]}
                barSize={barSize}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

BudgetPlanningChart.displayName = 'BudgetPlanningChart';
