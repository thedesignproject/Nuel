'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CostTrendChartProps {
  /** Additional className for custom styling */
  className?: string;
}

interface ChartDataPoint {
  month: string;
  preNuel: number;
  nuelOptimization: number;
}

// ============================================
// DATA
// ============================================

const chartData: ChartDataPoint[] = [
  { month: 'Jan', preNuel: 265, nuelOptimization: 238 },
  { month: 'Feb', preNuel: 278, nuelOptimization: 225 },
  { month: 'Mar', preNuel: 255, nuelOptimization: 218 },
  { month: 'Apr', preNuel: 270, nuelOptimization: 202 },
  { month: 'May', preNuel: 248, nuelOptimization: 198 },
  { month: 'Jun', preNuel: 275, nuelOptimization: 215 },
  { month: 'Jul', preNuel: 252, nuelOptimization: 195 },
  { month: 'Aug', preNuel: 268, nuelOptimization: 188 },
  { month: 'Sep', preNuel: 242, nuelOptimization: 182 },
  { month: 'Oct', preNuel: 260, nuelOptimization: 165 },
  { month: 'Nov', preNuel: 235, nuelOptimization: 172 },
  { month: 'Dec', preNuel: 258, nuelOptimization: 158 },
];

// ============================================
// CUSTOM TOOLTIP
// ============================================

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const month = payload[0].payload.month;
    const preNuel = payload[0].payload.preNuel;
    const nuelOptimization = payload[0].payload.nuelOptimization;
    const difference = preNuel - nuelOptimization;

    return (
      <div
        style={{
          backgroundColor: COLORS.neutral[0],
          padding: SPACING[16],
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          width: '240px',
        }}
      >
        {/* Month Name */}
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 600,
            color: COLORS.text.primary,
            marginBottom: SPACING[12],
          }}
        >
          {month}
        </div>

        {/* Pre-Nuel Value */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SPACING[8],
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING[8] }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#CCD9F2',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 400,
                color: COLORS.text.secondary,
              }}
            >
              Pre-Nuel
            </span>
          </div>
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: COLORS.text.primary,
            }}
          >
            ${preNuel}/Ton
          </span>
        </div>

        {/* Nuel Optimization Value */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SPACING[12],
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING[8] }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#365EC8',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 400,
                color: COLORS.text.secondary,
              }}
            >
              Nuel Optimization
            </span>
          </div>
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: COLORS.text.primary,
            }}
          >
            ${nuelOptimization}/Ton
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '0.5px',
            backgroundColor: COLORS.border.default,
            marginBottom: SPACING[12],
          }}
        />

        {/* Difference */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 400,
              color: COLORS.text.secondary,
            }}
          >
            Difference
          </span>
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: COLORS.semantic.success[500],
            }}
          >
            -${difference}/Ton
          </span>
        </div>
      </div>
    );
  }

  return null;
};

// ============================================
// CUSTOM LEGEND
// ============================================

const CustomLegend = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING[24],
        marginTop: SPACING[16],
      }}
    >
      {/* Pre-Nuel */}
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING[8] }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#CCD9F2',
            borderRadius: '2px',
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
          Pre-Nuel
        </span>
      </div>

      {/* Nuel Optimization */}
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING[8] }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#365EC8',
            borderRadius: '2px',
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
          Nuel Optimization
        </span>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * CostTrendChart Component
 * Displays stacked area chart showing Pre-Nuel vs Nuel Optimization costs
 * Exact specifications from Figma with smooth animations
 */
export const CostTrendChart = React.forwardRef<HTMLDivElement, CostTrendChartProps>(
  ({ className }, ref) => {
    const [displayData, setDisplayData] = useState<ChartDataPoint[]>([]);
    const chartRef = React.useRef<HTMLDivElement>(null);
    const hasAnimated = React.useRef(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated.current) {
              // Mark as animated
              hasAnimated.current = true;

              // Small delay to ensure component is mounted
              setTimeout(() => {
                setDisplayData(chartData);
              }, 100);
            }
          });
        },
        { threshold: 0.3 } // Require 30% visibility before triggering
      );

      if (chartRef.current) {
        observer.observe(chartRef.current);
      }

      return () => {
        if (chartRef.current) {
          observer.unobserve(chartRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={chartRef}
        className={className}
        style={{
          width: '100%',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="0"
              stroke={COLORS.border.subtle}
              vertical={false}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'DM Sans',
                fontSize: 14,
                fontWeight: 400,
                fill: '#99A5B8',
              }}
              dy={10}
            />

            {/* Y-Axis */}
            <YAxis
              domain={[0, 280]}
              ticks={[0, 70, 140, 210, 280]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'DM Sans',
                fontSize: 14,
                fontWeight: 400,
                fill: '#99A5B8',
              }}
              tickFormatter={(value) => `$${value}/Ton`}
              dx={-10}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Legend */}
            <Legend content={<CustomLegend />} />

            {/* Pre-Nuel Area - Rises from 0 with gravity */}
            <Area
              type="natural"
              dataKey="preNuel"
              stackId="1"
              stroke="#365EC8"
              strokeWidth={2}
              fill="#CCD9F2"
              fillOpacity={1}
              animationDuration={1400}
              animationBegin={0}
              animationEasing="ease-out"
              isAnimationActive={true}
            />

            {/* Nuel Optimization Area - Rises from 0 with gravity */}
            <Area
              type="natural"
              dataKey="nuelOptimization"
              stackId="2"
              stroke="#365EC8"
              strokeWidth={2}
              fill="#365EC8"
              fillOpacity={1}
              animationDuration={1400}
              animationBegin={200}
              animationEasing="ease-out"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

CostTrendChart.displayName = 'CostTrendChart';
