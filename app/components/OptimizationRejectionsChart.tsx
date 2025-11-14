'use client';

import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface OptimizationRejectionsChartProps {
  /** Additional className for custom styling */
  className?: string;
}

interface ChartDataPoint {
  category: string;
  rejections: number;
  rejectedValue: number;
  percentage: number;
  barColor: string;
}

interface RankingCard {
  rank: number;
  category: string;
  rejections: number;
  percentage: number;
  isTopRank: boolean;
}

// ============================================
// DATA
// ============================================

const chartData: ChartDataPoint[] = [
  {
    category: 'Service Requirements',
    rejections: 180000,
    rejectedValue: 245,
    percentage: 28,
    barColor: '#0B1F57', // accent-900
  },
  {
    category: 'Risk Management',
    rejections: 140000,
    rejectedValue: 198,
    percentage: 22,
    barColor: '#1339A0', // accent-700
  },
  {
    category: 'Capacity Constraints',
    rejections: 115000,
    rejectedValue: 168,
    percentage: 18,
    barColor: '#1C58F7', // accent-500
  },
  {
    category: 'Operational Concerns',
    rejections: 85000,
    rejectedValue: 142,
    percentage: 13,
    barColor: '#A8C3FF', // accent-300
  },
  {
    category: 'Budget Constraints',
    rejections: 68000,
    rejectedValue: 118,
    percentage: 11,
    barColor: '#EAF1FF', // accent-100
  },
  {
    category: 'Timing Issues',
    rejections: 52000,
    rejectedValue: 95,
    percentage: 8,
    barColor: '#F4F7FD', // secondary-100
  },
];

const rankingCards: RankingCard[] = [
  {
    rank: 1,
    category: 'Service Requirements',
    rejections: 180000,
    percentage: 28,
    isTopRank: true,
  },
  {
    rank: 2,
    category: 'Risk Management',
    rejections: 140000,
    percentage: 22,
    isTopRank: false,
  },
  {
    rank: 3,
    category: 'Capacity Constraints',
    rejections: 115000,
    percentage: 18,
    isTopRank: false,
  },
];

// ============================================
// CUSTOM TOOLTIP
// ============================================

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: COLORS.neutral[0],
          padding: SPACING[16],
          borderRadius: CARD_CURVATURE,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          minWidth: '220px',
        }}
      >
        {/* Category Title */}
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
          {data.category}
        </div>

        {/* Rejections */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SPACING[8],
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
            Rejections:
          </span>
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: COLORS.text.primary,
            }}
          >
            {data.rejections.toLocaleString()}
          </span>
        </div>

        {/* Rejected Value */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            Rejected Value:
          </span>
          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: COLORS.semantic.error[500],
            }}
          >
            ${data.rejectedValue}/Ton
          </span>
        </div>
      </div>
    );
  }

  return null;
};

// ============================================
// SUMMARY CARDS
// ============================================

const SummaryCards = () => {
  const totalRejections = '41 Total Rejections';
  const rejectedValue = '$635K Rejected Value';

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 0',
        marginBottom: SPACING[16],
      }}
    >
      {/* Total Rejections Card */}
      <div
        style={{
          flex: '1 0 0',
          backgroundColor: '#F3F6F9',
          borderRadius: CARD_CURVATURE,
          padding: `12px ${SPACING[24]}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '18px',
            lineHeight: '26px',
            fontWeight: 600,
            color: COLORS.semantic.error[500],
            textAlign: 'center',
          }}
        >
          {totalRejections}
        </div>
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: COLORS.text.secondary,
            textAlign: 'center',
          }}
        >
          This Quarter
        </div>
      </div>

      {/* Rejected Value Card */}
      <div
        style={{
          flex: '1 0 0',
          backgroundColor: '#F3F6F9',
          borderRadius: CARD_CURVATURE,
          padding: `12px ${SPACING[24]}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '18px',
            lineHeight: '26px',
            fontWeight: 600,
            color: '#A58B00', // Gold token
            textAlign: 'center',
          }}
        >
          {rejectedValue}
        </div>
        <div
          style={{
            fontFamily: 'DM Sans',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: COLORS.text.secondary,
            textAlign: 'center',
          }}
        >
          Percentage Change Potential Savings Lost
        </div>
      </div>
    </div>
  );
};

// ============================================
// RANKING CARDS
// ============================================

const RankingCardsSection = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: SPACING[16],
        marginTop: SPACING[16],
      }}
    >
      {rankingCards.map((card) => (
        <div
          key={card.rank}
          style={{
            flex: '1 0 0',
            backgroundColor: '#F3F6F9',
            borderRadius: CARD_CURVATURE,
            padding: SPACING[16],
            display: 'flex',
            alignItems: 'center',
            gap: SPACING[12],
          }}
        >
          {/* Rank Number */}
          <div
            style={{
              paddingRight: SPACING[12],
              borderRight: `0.5px solid ${COLORS.border.default}`,
              fontFamily: 'DM Sans',
              fontSize: '18px',
              lineHeight: '26px',
              fontWeight: 400,
              color: COLORS.text.secondary,
              whiteSpace: 'nowrap',
            }}
          >
            #{card.rank}
          </div>

          {/* Middle Section - Category & Details */}
          <div
            style={{
              flex: '1 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 500,
                color: COLORS.text.primary,
              }}
            >
              {card.category}
            </div>
            <div
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                fontWeight: 400,
                color: COLORS.text.secondary,
              }}
            >
              {card.rejections.toLocaleString()} rejections (${(card.rejections / 1000).toFixed(0)}K)
            </div>
          </div>

          {/* Percentage */}
          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: '18px',
              lineHeight: '26px',
              fontWeight: 600,
              color: card.isTopRank ? COLORS.semantic.error[500] : '#A58B00',
              whiteSpace: 'nowrap',
            }}
          >
            {card.percentage}%
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
 * OptimizationRejectionsChart Component
 * Combined bar + line chart showing rejection analysis with integrated cards
 * Exact specifications from Figma with staged animations
 */
export const OptimizationRejectionsChart = React.forwardRef<
  HTMLDivElement,
  OptimizationRejectionsChartProps
>(({ className }, ref) => {
  const [displayData, setDisplayData] = useState<ChartDataPoint[]>([]);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
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
    <div ref={chartRef} className={className}>
      {/* Summary Cards */}
      <SummaryCards />

      {/* Chart Container */}
      <div
        style={{
          width: '100%',
          height: '268px',
          marginBottom: SPACING[16],
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={displayData}
            margin={{ top: 10, right: 40, left: 40, bottom: 50 }}
            barCategoryGap="20%"
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="0"
              stroke={COLORS.border.subtle}
              vertical={false}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'DM Sans',
                fontSize: 12,
                fontWeight: 400,
                fill: '#99A5B8',
              }}
              angle={0}
              textAnchor="middle"
              height={50}
              interval={0}
            />

            {/* Y-Axis Left (Rejections) */}
            <YAxis
              yAxisId="left"
              domain={[0, 200000]}
              ticks={[0, 50000, 100000, 150000, 200000]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'DM Sans',
                fontSize: 14,
                fontWeight: 400,
                fill: '#99A5B8',
              }}
              tickFormatter={(value) => `${value / 1000}K`}
              dx={-10}
            />

            {/* Y-Axis Right (Percentage) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'DM Sans',
                fontSize: 14,
                fontWeight: 400,
                fill: '#99A5B8',
              }}
              tickFormatter={(value) => `${value}%`}
              dx={10}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Bars - Rise from 0 with gravity */}
            <Bar
              yAxisId="left"
              dataKey="rejections"
              radius={[4, 4, 0, 0]}
              barSize={80}
              animationDuration={1400}
              animationBegin={0}
              animationEasing="ease-out"
              isAnimationActive={true}
            >
              {displayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.barColor}
                  style={{
                    filter:
                      entry.barColor === '#1339A0'
                        ? 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                        : 'none',
                  }}
                />
              ))}
            </Bar>

            {/* Line - Draws progressively from left to right */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="percentage"
              stroke={COLORS.accent[500]}
              strokeWidth={2}
              dot={{
                r: 6,
                fill: COLORS.accent[500],
                strokeWidth: 2,
                stroke: COLORS.neutral[0],
              }}
              animationDuration={1600}
              animationBegin={700}
              animationEasing="ease-in-out"
              isAnimationActive={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Ranking Cards */}
      <RankingCardsSection />
    </div>
  );
});

OptimizationRejectionsChart.displayName = 'OptimizationRejectionsChart';
