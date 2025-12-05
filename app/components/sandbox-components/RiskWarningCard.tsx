'use client';

import React from 'react';
import { Warning } from '@phosphor-icons/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/app/design-tokens';

interface RiskWarningCardProps {
  title: string;
  description: string;
  severity?: 'warning' | 'critical';
}

export const RiskWarningCard: React.FC<RiskWarningCardProps> = ({
  title,
  description,
  severity = 'warning',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[12],
        padding: SPACING[16],
        backgroundColor: COLORS.semantic.warning[50],
        border: `1px solid ${COLORS.semantic.warning[400]}`,
        borderRadius: BORDER_RADIUS.card,
      }}
    >
      {/* Header with WARNING Badge */}
      {/* Warning Badge - Hugs Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING[4],
          padding: '2px 12px',
          backgroundColor: COLORS.semantic.warning[300],
          borderRadius: BORDER_RADIUS.full,
          width: 'fit-content',
        }}
      >
        <Warning size={16} weight="regular" color={COLORS.text.heading} />
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallMedium,
            color: COLORS.text.heading,
          }}
        >
          WARNING
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
        }}
      >
        {/* Title */}
        <span
          style={{
            ...TYPOGRAPHY.bodyMediumSemiBold,
            color: COLORS.text.primary,
          }}
        >
          {title}
        </span>

        {/* Description */}
        <span
          style={{
            ...TYPOGRAPHY.bodyExtraSmallText,
            color: COLORS.text.muted,
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
};
