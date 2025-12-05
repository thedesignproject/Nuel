'use client';

import React from 'react';
import { Building, MapPin } from '@phosphor-icons/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/app/design-tokens';

interface PlantCapacityCardProps {
  locations: string[];
}

export const PlantCapacityCard: React.FC<PlantCapacityCardProps> = ({ locations }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        gap: SPACING[12],
        padding: SPACING[16],
        backgroundColor: COLORS.neutral[200],
        borderRadius: BORDER_RADIUS.card,
      }}
    >
      {/* Title Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: SPACING[8],
        }}
      >
        <Building size={20} weight="regular" color={COLORS.primary[700]} />
        <span
          style={{
            ...TYPOGRAPHY.bodyMediumMedium,
            color: COLORS.text.primary,
          }}
        >
          Plants at Max Capacity
        </span>
      </div>

      {/* Location Tags Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: SPACING[12],
        }}
      >
        {locations.map((location, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: SPACING[4],
              padding: '4px 8px',
              border: `1px solid ${COLORS.primary[700]}`,
              borderRadius: BORDER_RADIUS.full,
            }}
          >
            <MapPin size={20} weight="regular" color={COLORS.primary[700]} />
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.text.primary,
              }}
            >
              {location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
