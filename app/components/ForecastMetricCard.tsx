'use client';

import React from 'react';
import { Truck, Package, GitBranch, Crosshair, Info, TrendingUp } from 'lucide-react';
import { CARD_CURVATURE, COLORS, SPACING, TYPOGRAPHY } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

/** Bullet list item for breakdown variant */
export interface BulletItem {
  label: string;
  color: 'blue' | 'black';
}

/** Base props shared by all forecast card variants */
interface BaseForecastCardProps {
  /** Icon type for the metric */
  icon: 'truck' | 'package' | 'git-diff' | 'crosshair';
  /** Icon background color */
  iconBgColor: 'blue' | 'gray' | 'black';
  /** Title of the metric */
  title: string;
  /** Main value to display */
  value: string;
  /** Whether to show info icon next to title */
  showInfoIcon?: boolean;
  /** Additional className */
  className?: string;
}

/** Bullet list variant - for breakdown with colored dots */
interface BulletListVariant extends BaseForecastCardProps {
  variant: 'bullet-list';
  /** List of items with colored bullet dots */
  bulletItems: BulletItem[];
}

/** Simple text variant - for single-line descriptions */
interface SimpleTextVariant extends BaseForecastCardProps {
  variant: 'simple-text';
  /** Description text */
  description: string;
}

/** Trend comparison variant - for metrics with trend indicators */
interface TrendComparisonVariant extends BaseForecastCardProps {
  variant: 'trend-comparison';
  /** Trend data */
  trend: {
    percentage: string;
    label: string;
  };
}

/** Union type for all forecast card variants */
export type ForecastMetricCardProps =
  | BulletListVariant
  | SimpleTextVariant
  | TrendComparisonVariant;

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get icon component based on icon type */
const getIcon = (iconType: string) => {
  const iconProps = { size: 14, strokeWidth: 1.5, color: COLORS.neutral[50] };
  switch (iconType) {
    case 'truck':
      return <Truck {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'git-diff':
      return <GitBranch {...iconProps} />;
    case 'crosshair':
      return <Crosshair {...iconProps} />;
    default:
      return <Truck {...iconProps} />;
  }
};

/** Get icon background color */
const getIconBgColor = (color: string) => {
  switch (color) {
    case 'blue':
      return COLORS.primary[500];
    case 'gray':
      return COLORS.primary[300];
    case 'black':
      return COLORS.primary[900];
    default:
      return COLORS.primary[500];
  }
};

/** Get bullet dot color */
const getBulletColor = (color: string) => {
  switch (color) {
    case 'blue':
      return COLORS.primary[500];
    case 'black':
      return COLORS.primary[900];
    default:
      return COLORS.primary[500];
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * ForecastMetricCard Component
 * Displays forecast-specific KPI metrics with variant-based bottom sections
 *
 * Specifications from Figma:
 * - Border Radius: 16px (CARD_CURVATURE token)
 * - Padding: 16px (all sides)
 * - Background: #ffffff
 * - Height: 156px
 * - Width: flex-1 (in 4-column grid)
 * - Gap between cards: 16px
 *
 * Variants:
 * - bullet-list: Shows breakdown with colored bullet points
 * - simple-text: Shows single-line description
 * - trend-comparison: Shows trend indicator with comparison label
 */
export const ForecastMetricCard = React.forwardRef<
  HTMLDivElement,
  ForecastMetricCardProps
>((props, ref) => {
  const { icon, iconBgColor, title, value, showInfoIcon = false, className, variant } = props;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundColor: COLORS.neutral[0],
        borderRadius: CARD_CURVATURE,
        padding: SPACING[16],
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[12],
        height: '156px',
        flex: '1 0 0',
        minWidth: 0,
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          gap: SPACING[8],
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Rounded Icon */}
        <div
          style={{
            backgroundColor: getIconBgColor(iconBgColor),
            borderRadius: '9999px',
            padding: SPACING[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {getIcon(icon)}
        </div>

        {/* Title Wrapper */}
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            gap: SPACING[4],
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.text.primary,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </p>
          {showInfoIcon && (
            <Info
              size={12}
              className="shrink-0"
              strokeWidth={1.5}
              style={{ color: COLORS.text.secondary }}
            />
          )}
        </div>
      </div>

      {/* Value Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[2],
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: TYPOGRAPHY.bodyLargeBold.fontFamily,
            fontSize: TYPOGRAPHY.bodyLargeBold.fontSize,
            lineHeight: TYPOGRAPHY.bodyLargeBold.lineHeight,
            fontWeight: TYPOGRAPHY.bodyLargeBold.fontWeight,
            color: COLORS.accent[500],
            margin: 0,
          }}
        >
          {value}
        </p>
      </div>

      {/* Bottom Section - Variant Specific */}
      <div
        style={{
          borderTop: `0.5px solid ${COLORS.border.subtle}`,
          paddingTop: SPACING[8],
          display: 'flex',
          gap: SPACING[8],
          width: '100%',
          flex: variant === 'bullet-list' ? '1 0 0' : undefined,
          minHeight: variant !== 'bullet-list' ? '52px' : undefined,
        }}
      >
        {variant === 'bullet-list' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING[2],
              flex: '1 0 0',
              minWidth: 0,
            }}
          >
            {props.bulletItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: getBulletColor(item.color),
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
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {variant === 'simple-text' && (
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
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
              {props.description}
            </p>
          </div>
        )}

        {variant === 'trend-comparison' && (
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              alignItems: 'center',
              gap: SPACING[4],
              minWidth: 0,
            }}
          >
            {/* Trend Tag */}
            <div
              style={{
                display: 'flex',
                gap: SPACING[4],
                alignItems: 'center',
              }}
            >
              <TrendingUp
                size={10}
                strokeWidth={1.5}
                style={{ color: COLORS.semantic.success[500] }}
              />
              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  lineHeight: '16px',
                  fontWeight: 400,
                  color: COLORS.semantic.success[500],
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                {props.trend.percentage}
              </p>
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '10px',
                lineHeight: '16px',
                fontWeight: 400,
                color: COLORS.text.secondary,
                margin: 0,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {props.trend.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

ForecastMetricCard.displayName = 'ForecastMetricCard';
