'use client';

import React from 'react';
import { Crosshair, CurrencyDollarSimple, Truck } from '@phosphor-icons/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/app/design-tokens';

interface OpportunityCardProps {
  title: string;
  description: string;
  impact: string;
  cost: string;
  delivery: string;
  isRecommended?: boolean;
  onViewDetails?: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  title,
  description,
  impact,
  cost,
  delivery,
  isRecommended = false,
  onViewDetails,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING[12],
        padding: SPACING[16],
        backgroundColor: COLORS.accent[100],
        border: `1px solid transparent`,
        borderRadius: BORDER_RADIUS.card,
        backgroundImage: `linear-gradient(${COLORS.accent[100]}, ${COLORS.accent[100]}), ${COLORS.gradient.blue}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        width: '561px',
      }}
    >
      {/* Title Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: SPACING[8],
        }}
      >
        <span
          style={{
            ...TYPOGRAPHY.bodyMediumMedium,
            color: COLORS.text.primary,
          }}
        >
          {title}
        </span>

        {isRecommended && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: SPACING[4],
              padding: '4px 8px',
              backgroundColor: COLORS.accent[500],
              borderRadius: BORDER_RADIUS.sm,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '14px',
                height: '14px',
              }}
            >
              <span style={{ fontSize: '12px' }}>⭐️</span>
            </div>
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.neutral[50],
              }}
            >
              Recommended
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <span
        style={{
          ...TYPOGRAPHY.bodySmallText,
          color: COLORS.text.primary,
        }}
      >
        {description}
      </span>

      {/* Impact */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING[4],
        }}
      >
        <Crosshair size={16} weight="regular" color={COLORS.primary[700]} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING[4],
            paddingTop: '1px',
          }}
        >
          <span
            style={{
              ...TYPOGRAPHY.bodyExtraSmallText,
              color: COLORS.text.secondary,
            }}
          >
            Impact:
          </span>
          <span
            style={{
              ...TYPOGRAPHY.bodyExtraSmallText,
              color: COLORS.semantic.success[500],
            }}
          >
            {impact}
          </span>
        </div>
      </div>

      {/* Insights Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'stretch',
          flexWrap: 'wrap',
          gap: SPACING[16],
          paddingLeft: '2px',
        }}
      >
        {/* Cost Item */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING[4],
          }}
        >
          <CurrencyDollarSimple size={16} weight="regular" color={COLORS.primary[700]} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING[4],
              paddingTop: '1px',
            }}
          >
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.text.secondary,
              }}
            >
              Cost:
            </span>
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.text.primary,
              }}
            >
              {cost}
            </span>
          </div>
        </div>

        {/* Delivery Item */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING[4],
          }}
        >
          <Truck size={16} weight="regular" color={COLORS.primary[700]} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING[4],
              paddingTop: '1px',
            }}
          >
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.text.secondary,
              }}
            >
              Delivery:
            </span>
            <span
              style={{
                ...TYPOGRAPHY.bodyExtraSmallText,
                color: COLORS.text.primary,
              }}
            >
              {delivery}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          alignSelf: 'stretch',
          gap: '10px',
        }}
      >
        <button
          onClick={onViewDetails}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            gap: SPACING[8],
            padding: '8px 12px',
            background: COLORS.gradient.darkBlue,
            borderRadius: BORDER_RADIUS.md,
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <span
            style={{
              ...TYPOGRAPHY.bodySmallText,
              color: COLORS.neutral[50],
            }}
          >
            View in distribution planning
          </span>
        </button>
      </div>
    </div>
  );
};
