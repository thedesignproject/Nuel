'use client';

import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { COLORS, SPACING, TYPOGRAPHY } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ForecastChartProps {
  /** Additional className for custom styling */
  className?: string;
}

interface ChartDataPoint {
  date: string;
  ordersShipped: number; // Light blue/gray - Past orders
  unshippedGap: number; // Dark blue/black - Gap distributed to future
  newOrders: number; // Bright blue - Future orders
  forecast: number; // Line forecast value
  isToday?: boolean; // Marker for today's date
}

// ============================================
// DATA - From Figma specifications
// ============================================

const chartData: ChartDataPoint[] = [
  { date: '2 JUN', ordersShipped: 2550, unshippedGap: 350, newOrders: 0, forecast: 2800 },
  { date: '8 JUN', ordersShipped: 2700, unshippedGap: 300, newOrders: 0, forecast: 2850 },
  { date: '14 JUN', ordersShipped: 2600, unshippedGap: 200, newOrders: 0, forecast: 2750 },
  { date: '20 JUN', ordersShipped: 2400, unshippedGap: 400, newOrders: 0, forecast: 2700 },
  { date: '26 JUN', ordersShipped: 2550, unshippedGap: 350, newOrders: 0, forecast: 2800 },
  { date: '2 JUL', ordersShipped: 2450, unshippedGap: 350, newOrders: 0, forecast: 2700 },
  { date: '8 JUL', ordersShipped: 2500, unshippedGap: 400, newOrders: 0, forecast: 2800 },
  { date: '14 JUL', ordersShipped: 2350, unshippedGap: 350, newOrders: 0, forecast: 2600 },
  { date: '20 JUL', ordersShipped: 0, unshippedGap: 0, newOrders: 2550, forecast: 2850, isToday: true },
  { date: '26 JUL', ordersShipped: 0, unshippedGap: 0, newOrders: 2650, forecast: 2900 },
  { date: '1 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2700, forecast: 2950 },
  { date: '7 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2600, forecast: 2850 },
  { date: '13 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2750, forecast: 3000 },
  { date: '19 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2650, forecast: 2900 },
  { date: '25 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2800, forecast: 3050 },
  { date: '31 AUG', ordersShipped: 0, unshippedGap: 0, newOrders: 2700, forecast: 2950 },
  { date: '6 SEPT', ordersShipped: 0, unshippedGap: 0, newOrders: 2550, forecast: 2800 },
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
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          minWidth: '200px',
        }}
      >
        {/* Date */}
        <div
          style={{
            fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
            fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
            lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
            fontWeight: 600,
            color: COLORS.text.primary,
            marginBottom: SPACING[12],
          }}
        >
          {data.date}
        </div>

        {/* Forecast Line */}
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
                height: '2px',
                backgroundColor: '#17263D',
              }}
            />
            <span
              style={{
                ...TYPOGRAPHY.bodySmallMedium,
                fontWeight: 400,
                color: COLORS.text.secondary,
              }}
            >
              Forecast
            </span>
          </div>
          <span
            style={{
              ...TYPOGRAPHY.bodySmallMedium,
              fontWeight: 600,
              color: COLORS.text.primary,
            }}
          >
            {data.forecast.toLocaleString()}
          </span>
        </div>

        {/* Orders Shipped (if > 0) */}
        {data.ordersShipped > 0 && (
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
                  backgroundColor: '#9EADCC',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  ...TYPOGRAPHY.bodySmallMedium,
                  fontWeight: 400,
                  color: COLORS.text.secondary,
                }}
              >
                Orders Shipped
              </span>
            </div>
            <span
              style={{
                ...TYPOGRAPHY.bodySmallMedium,
                fontWeight: 600,
                color: COLORS.text.primary,
              }}
            >
              {data.ordersShipped.toLocaleString()}
            </span>
          </div>
        )}

        {/* Unshipped Gap (if > 0) */}
        {data.unshippedGap > 0 && (
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
                  backgroundColor: '#070D15',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  ...TYPOGRAPHY.bodySmallMedium,
                  fontWeight: 400,
                  color: COLORS.text.secondary,
                }}
              >
                Unshipped Gap
              </span>
            </div>
            <span
              style={{
                ...TYPOGRAPHY.bodySmallMedium,
                fontWeight: 600,
                color: COLORS.text.primary,
              }}
            >
              {data.unshippedGap.toLocaleString()}
            </span>
          </div>
        )}

        {/* New Orders (if > 0) */}
        {data.newOrders > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
                  ...TYPOGRAPHY.bodySmallMedium,
                  fontWeight: 400,
                  color: COLORS.text.secondary,
                }}
              >
                New Orders
              </span>
            </div>
            <span
              style={{
                ...TYPOGRAPHY.bodySmallMedium,
                fontWeight: 600,
                color: COLORS.text.primary,
              }}
            >
              {data.newOrders.toLocaleString()}
            </span>
          </div>
        )}
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
        justifyContent: 'flex-start',
        gap: SPACING[24],
        marginTop: SPACING[16],
        paddingLeft: '68px', // Align with chart content
      }}
    >
      {/* Forecast */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            border: '2px solid #17263D',
            backgroundColor: 'transparent',
          }}
        />
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.primary,
          }}
        >
          Forecast
        </span>
      </div>

      {/* Orders Shipped (Past) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#9EADCC',
            borderRadius: '2px',
          }}
        />
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.primary,
          }}
        >
          Orders Shipped (Past)
        </span>
      </div>

      {/* Unshipped Gap */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#070D15',
            borderRadius: '2px',
          }}
        />
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.primary,
          }}
        >
          Unshipped Gap (Distributed to Future)
        </span>
      </div>

      {/* New Orders to Ship (Future) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.primary,
          }}
        >
          New Orders to Ship (Future)
        </span>
      </div>
    </div>
  );
};

// ============================================
// CUSTOM X-AXIS TICK
// ============================================

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const isToday = chartData[payload.index]?.isToday;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        style={{
          fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
          fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
          fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
          fill: isToday ? '#365EC8' : '#99A5B8',
        }}
      >
        {payload.value}
      </text>
    </g>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * ForecastChart Component
 * Combined bar + line chart showing forecast vs actual orders
 * Exact specifications from Figma with stacked bars and forecast line
 */
export const ForecastChart = React.forwardRef<HTMLDivElement, ForecastChartProps>(
  ({ className }, ref) => {
    const todayIndex = chartData.findIndex((d) => d.isToday);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          height: '380px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={0}
            barCategoryGap="20%"
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="0"
              stroke="#D9E0E9"
              vertical={false}
              horizontalPoints={[0, 76, 152, 228, 304]}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
              height={50}
            />

            {/* Y-Axis */}
            <YAxis
              domain={[0, 3400]}
              ticks={[0, 850, 1700, 2550, 3400]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
                fontSize: 14,
                fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
                fill: '#99A5B8',
              }}
              width={68}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />

            {/* Legend */}
            <Legend content={<CustomLegend />} />

            {/* TODAY Reference Line */}
            {todayIndex >= 0 && (
              <ReferenceLine
                x={chartData[todayIndex].date}
                stroke="#D345F8"
                strokeWidth={2}
                label={{
                  value: 'TODAY',
                  position: 'top',
                  fill: '#D345F8',
                  fontFamily: 'Inter',
                  fontSize: 10,
                  fontWeight: 700,
                  offset: 10,
                }}
              />
            )}

            {/* Stacked Bars - Orders Shipped (Past) */}
            <Bar
              dataKey="ordersShipped"
              stackId="a"
              fill="#9EADCC"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />

            {/* Stacked Bars - Unshipped Gap */}
            <Bar
              dataKey="unshippedGap"
              stackId="a"
              fill="#070D15"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />

            {/* Stacked Bars - New Orders (Future) */}
            <Bar
              dataKey="newOrders"
              stackId="a"
              fill="#365EC8"
              radius={[4, 4, 0, 0]}
              maxBarSize={16}
            />

            {/* Forecast Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#17263D"
              strokeWidth={2}
              dot={{
                fill: '#17263D',
                strokeWidth: 2,
                r: 4,
                stroke: '#FFFFFF',
              }}
              activeDot={{
                r: 6,
                fill: '#17263D',
                stroke: '#FFFFFF',
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

ForecastChart.displayName = 'ForecastChart';
