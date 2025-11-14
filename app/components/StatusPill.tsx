'use client';

import React from 'react';

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
        backgroundColor: '#D6EDFF',
        textColor: '#007AFF',
        dotColor: '#007AFF',
      };
    case 'warning':
      return {
        backgroundColor: '#FFF5CC',
        textColor: '#FFD400',
        dotColor: '#FFD400',
      };
    case 'excellent':
      return {
        backgroundColor: '#D6F5E1',
        textColor: '#34C759',
        dotColor: '#34C759',
      };
    case 'error':
      return {
        backgroundColor: '#FFD6DB',
        textColor: '#FF3B30',
        dotColor: '#FF3B30',
      };
    case 'info':
      return {
        backgroundColor: '#D6EDFF',
        textColor: '#007AFF',
        dotColor: '#007AFF',
      };
    case 'neutral':
    default:
      return {
        backgroundColor: '#F3F6F9',
        textColor: '#7F8FA4',
        dotColor: '#7F8FA4',
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
