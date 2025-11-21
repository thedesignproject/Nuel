'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { COLORS, SPACING, TYPOGRAPHY, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface CalculationRow {
  label: string;
  value: string;
  operator?: '-' | '+' | '÷' | '=';
}

interface CalculationStep {
  title: string;
  rows: CalculationRow[];
  result: {
    label: string;
    value: string;
  };
}

export interface CalculationMethodologyProps {
  /** Optional className */
  className?: string;
}

// ============================================
// DATA
// ============================================

const calculationSteps: CalculationStep[] = [
  {
    title: 'Step 1: Calculate Target Inventory',
    rows: [
      { label: 'Current Open Orders', value: '84,250 Tons', operator: '-' },
      { label: 'Historical Seasonal Adjustment', value: '32,892 Tons', operator: '+' },
      { label: 'Safety Margin', value: '12,826 Tons', operator: '+' },
    ],
    result: {
      label: 'Target Inventory:',
      value: '129,968 Tons',
    },
  },
  {
    title: 'Step 2: Calculate Production/Distribution Need',
    rows: [
      { label: 'Target Inventory', value: '129,968 Tons' },
      { label: 'Current Inventory', value: '95,420 Tons', operator: '-' },
    ],
    result: {
      label: 'Production Needed:',
      value: '34,548 Tons',
    },
  },
  {
    title: 'Step 3: Capacity Analysis',
    rows: [
      { label: 'Target Inventory', value: '129,968 Tons' },
      { label: 'Full Capacity', value: '159,000 Tons', operator: '÷' },
    ],
    result: {
      label: 'Capacity Coverage',
      value: '88%',
    },
  },
];

// ============================================
// SUB-COMPONENTS
// ============================================

/** Calculation Row Component */
const CalcRow = ({ label, value, operator }: CalculationRow) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING[12],
        width: '100%',
      }}
    >
      {/* Operator */}
      {operator && (
        <div
          style={{
            width: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
              fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
              fontWeight: 600,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            {operator}
          </p>
        </div>
      )}

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
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
          {label}
        </p>
      </div>

      {/* Value */}
      <div style={{ flexShrink: 0 }}>
        <p
          style={{
            fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
            fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
            lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
            fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
            color: COLORS.text.primary,
            margin: 0,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/** Calculation Step Component */
const CalcStep = ({ step }: { step: CalculationStep }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: CARD_CURVATURE,
        padding: SPACING[16],
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[12],
        width: '100%',
      }}
    >
      {/* Step Title */}
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
          fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
          fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
          color: COLORS.text.primary,
          margin: 0,
        }}
      >
        {step.title}
      </p>

      {/* Calculation Rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[4],
          paddingLeft: '20px',
        }}
      >
        {step.rows.map((row, index) => (
          <CalcRow key={index} {...row} />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: COLORS.border.subtle,
          marginLeft: '20px',
        }}
      />

      {/* Result */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING[12],
          paddingLeft: '20px',
        }}
      >
        {/* Equals Sign */}
        <div
          style={{
            width: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
              fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
              fontWeight: 600,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            =
          </p>
        </div>

        {/* Result Label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.text.primary,
              margin: 0,
            }}
          >
            {step.result.label}
          </p>
        </div>

        {/* Result Value */}
        <div style={{ flexShrink: 0 }}>
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
            {step.result.value}
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * CalculationMethodology Component
 * Displays the 3-step calculation methodology for Target Inventory
 *
 * Specifications from Figma:
 * - Width: 696px
 * - Background: #F3F6F9
 * - Border radius: 24px
 * - Padding: 24px
 * - 3 calculation steps with exact values
 * - Uses design tokens for all styling
 */
export const CalculationMethodology = React.forwardRef<
  HTMLDivElement,
  CalculationMethodologyProps
>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '696px',
        backgroundColor: '#F3F6F9',
        borderRadius: '24px',
        padding: SPACING[24],
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[24],
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[4],
          borderBottom: `0.5px solid ${COLORS.border.subtle}`,
          paddingBottom: SPACING[16],
        }}
      >
        {/* Title with Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING[12],
          }}
        >
          {/* Blue Numbered Icon */}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: COLORS.accent[500],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: '1',
              }}
            >
              1
            </span>
          </div>

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
            Core Calculation Methodology
          </h3>
        </div>

        {/* Description */}
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
          The foundation formula applied across al months and locations
        </p>
      </div>

      {/* Calculation Steps */}
      {calculationSteps.map((step, index) => (
        <CalcStep key={index} step={step} />
      ))}
    </div>
  );
});

CalculationMethodology.displayName = 'CalculationMethodology';
