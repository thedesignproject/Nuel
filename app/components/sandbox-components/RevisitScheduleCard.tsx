'use client';

import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/app/design-tokens';

interface RevisitScheduleCardProps {
  label: string;
  date: string;
  description: string;
}

export const RevisitScheduleCard: React.FC<RevisitScheduleCardProps> = ({
  label,
  date,
  description,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        gap: SPACING[4],
        padding: SPACING[16],
        backgroundColor: COLORS.neutral[200],
        borderRadius: BORDER_RADIUS.card,
      }}
    >
      {/* Label */}
      <span
        style={{
          ...TYPOGRAPHY.bodyExtraSmallText,
          color: COLORS.text.secondary,
        }}
      >
        {label}
      </span>

      {/* Date */}
      <span
        style={{
          ...TYPOGRAPHY.headingH6,
          color: COLORS.text.primary,
        }}
      >
        {date}
      </span>

      {/* Description */}
      <span
        style={{
          ...TYPOGRAPHY.bodySmallText,
          color: COLORS.text.primary,
        }}
      >
        {description}
      </span>
    </div>
  );
};
