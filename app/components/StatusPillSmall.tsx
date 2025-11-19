'use client';

import React from 'react';
import { warning, success, error, info, neutral } from '../../lib/design-tokens/colors';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StatusVariantSmall = 'good' | 'warning' | 'excellent' | 'error' | 'info' | 'neutral';

export interface StatusPillSmallProps {
  /** Status variant determining colors */
  variant: StatusVariantSmall;

  /** Label text to display */
  label: string;

  /** Optional className for custom styling */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getStatusStyles = (variant: StatusVariantSmall) => {
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
 * StatusPillSmall Component
 * Smaller version of StatusPill for compact spaces like table cells
 * Displays status with colored dot and text in a pill-shaped container
 */
export const StatusPillSmall = React.forwardRef<HTMLDivElement, StatusPillSmallProps>(
  ({ variant, label, className }, ref) => {
    const styles = getStatusStyles(variant);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          paddingLeft: '6px',
          paddingRight: '8px',
          paddingTop: '2px',
          paddingBottom: '2px',
          backgroundColor: styles.backgroundColor,
          borderRadius: '999px',
        }}
      >
        {/* Status Dot */}
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: styles.dotColor,
            flexShrink: 0,
          }}
        />

        {/* Status Label */}
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '12px',
            lineHeight: '18px',
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

StatusPillSmall.displayName = 'StatusPillSmall';
