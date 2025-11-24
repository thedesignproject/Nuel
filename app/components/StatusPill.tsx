'use client';

import React from 'react';
import { warning, success, error, info, neutral } from '../../lib/design-tokens/colors';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StatusVariant = 'good' | 'warning' | 'excellent' | 'error' | 'info' | 'neutral';

export interface StatusPillProps {
  /** Status variant determining colors */
  variant: StatusVariant;

  /** Label text to display */
  label: string;

  /** Optional className for custom styling */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getStatusStyles = (variant: StatusVariant) => {
  switch (variant) {
    case 'good':
      return {
        backgroundColor: info[100],
        textColor: '#17263D',
        dotColor: info[500],
      };
    case 'warning':
      return {
        backgroundColor: warning[100],
        textColor: '#17263D',
        dotColor: warning[500],
      };
    case 'excellent':
      return {
        backgroundColor: success[100],
        textColor: '#17263D',
        dotColor: success[500],
      };
    case 'error':
      return {
        backgroundColor: error[100],
        textColor: '#17263D',
        dotColor: error[500],
      };
    case 'info':
      return {
        backgroundColor: info[100],
        textColor: '#17263D',
        dotColor: info[500],
      };
    case 'neutral':
    default:
      return {
        backgroundColor: neutral[100],
        textColor: '#17263D',
        dotColor: neutral[600],
      };
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * StatusPill Component
 * Displays status with colored dot and text in a pill-shaped container
 * Exact specifications from Figma with proper color backgrounds
 */
export const StatusPill = React.forwardRef<HTMLDivElement, StatusPillProps>(
  ({ variant, label, className }, ref) => {
    const styles = getStatusStyles(variant);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          paddingLeft: '8px',
          paddingRight: '12px',
          paddingTop: '4px',
          paddingBottom: '4px',
          backgroundColor: styles.backgroundColor,
          borderRadius: '999px',
        }}
      >
        {/* Status Dot */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: styles.dotColor,
            flexShrink: 0,
          }}
        />

        {/* Status Label */}
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 500,
            color: styles.textColor,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>
    );
  }
);

StatusPill.displayName = 'StatusPill';
