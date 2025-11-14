'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChartLine, ImageSquare, GearSix, CaretDown } from '@phosphor-icons/react';

// ============================================
// TYPE DEFINITIONS
// ============================================

type SectionLevel = 'primary' | 'secondary' | 'tertiary';
type FilterVariant = 'error' | 'warning' | 'success' | 'info' | 'neutral';

interface ButtonConfig {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  dropdown?: boolean;
  variant?: 'primary' | 'secondary';
}

interface FilterConfig {
  label: string;
  variant: FilterVariant;
  active?: boolean;
  onClick?: () => void;
}

export interface SectionHeaderProps {
  // Required
  title: string;
  level: SectionLevel;

  // Optional
  description?: string;
  tag?: string;
  icon?: 'chart-line' | 'image-square' | React.ReactNode;

  // Actions
  buttons?: ButtonConfig[];

  // Filters
  showFilters?: boolean;
  filters?: FilterConfig[];

  // Toggle
  showToggle?: boolean;
  toggleOptions?: [string, string];
  activeToggle?: number;
  onToggleChange?: (index: number) => void;

  // Settings (Tertiary only)
  showSettings?: boolean;
  onSettingsClick?: () => void;

  // Additional
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getHeadingStyles = (level: SectionLevel) => {
  switch (level) {
    case 'primary':
      return 'text-[24px] leading-[30px] font-semibold';
    case 'secondary':
      return 'text-[18px] leading-[26px] font-semibold';
    case 'tertiary':
      return 'text-[16px] leading-[24px] font-semibold';
  }
};

const getIconSize = (level: SectionLevel): number => {
  switch (level) {
    case 'primary':
      return 24;
    case 'secondary':
      return 16;
    case 'tertiary':
      return 16;
  }
};

const getDescriptionIconSize = (level: SectionLevel): number => {
  switch (level) {
    case 'primary':
      return 16;
    case 'secondary':
      return 14;
    case 'tertiary':
      return 14;
  }
};

const getFilterStyles = (variant: FilterVariant, active: boolean = false) => {
  const baseStyles = 'px-[12px] py-[4px] rounded-full flex items-center gap-[8px] text-[14px] leading-[22px] font-medium transition-all duration-200 cursor-pointer';

  if (!active) {
    return cn(
      baseStyles,
      'bg-white border border-[#D9E0E9] text-[#7F8FA4] hover:border-[#7F8FA4]'
    );
  }

  switch (variant) {
    case 'error':
      return cn(baseStyles, 'bg-[#FFD6DB] text-[#FF3B30] border border-[#FF3B30]');
    case 'warning':
      return cn(baseStyles, 'bg-[#FFF5CC] text-[#FFD400] border border-[#FFD400]');
    case 'success':
      return cn(baseStyles, 'bg-[#D6F5E1] text-[#34C759] border border-[#34C759]');
    case 'info':
      return cn(baseStyles, 'bg-[#D6EDFF] text-[#007AFF] border border-[#007AFF]');
    case 'neutral':
    default:
      return cn(baseStyles, 'bg-[#F3F6F9] text-[#17263D] border border-[#D9E0E9]');
  }
};

const getDotColor = (variant: FilterVariant): string => {
  switch (variant) {
    case 'error':
      return '#FF3B30';
    case 'warning':
      return '#FFD400';
    case 'success':
      return '#34C759';
    case 'info':
      return '#007AFF';
    case 'neutral':
    default:
      return '#7F8FA4';
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * SectionHeader Component
 * Displays section headers with exact specifications from Figma
 * Supports 3 levels (primary, secondary, tertiary) with various optional elements
 */
export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      level,
      description,
      tag,
      icon,
      buttons,
      showFilters = false,
      filters = [],
      showToggle = false,
      toggleOptions,
      activeToggle = 0,
      onToggleChange,
      showSettings = false,
      onSettingsClick,
      className,
    },
    ref
  ) => {
    const iconSize = getIconSize(level);
    const descIconSize = getDescriptionIconSize(level);

    // Render icon based on type
    const renderIcon = () => {
      if (!icon) return null;

      if (typeof icon === 'string') {
        switch (icon) {
          case 'chart-line':
            return <ChartLine size={iconSize} weight="regular" className="text-[#17263D]" />;
          case 'image-square':
            return <ImageSquare size={iconSize} weight="regular" className="text-[#17263D]" />;
          default:
            return null;
        }
      }

      return icon;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full flex items-center gap-[24px]',
          className
        )}
      >
        {/* Left Side - Title Section */}
        <div className="flex gap-[8px] flex-1">
          {/* Icon - aligned to title only */}
          {icon && (
            <div className="flex items-start pt-[3px]">
              {renderIcon()}
            </div>
          )}

          {/* Title & Description */}
          <div className="flex flex-col gap-[2px]">
            {/* Title Row */}
            <div className="flex items-center gap-[8px]">
              <h2 className={cn(
                'font-[\'DM_Sans\'] text-[#17263D]',
                getHeadingStyles(level)
              )}>
                {title}
              </h2>

              {/* Tag (Tertiary only) */}
              {tag && level === 'tertiary' && (
                <div className="w-[40px] h-[24px] px-[8px] bg-[#EAF1FF] rounded-[4px] flex items-center justify-center">
                  <span className="text-[12px] leading-[20px] font-medium text-[#1C58F7]">
                    {tag}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="flex items-center gap-[4px]">
                <ImageSquare size={descIconSize} weight="regular" className="text-[#7F8FA4]" />
                <p className="text-[14px] leading-[22px] font-normal text-[#7F8FA4]">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Actions Section */}
        <div className="flex items-center gap-[12px]">
          {/* Filters */}
          {showFilters && filters.length > 0 && (
            <div className="flex gap-[8px]">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={filter.onClick}
                  className={getFilterStyles(filter.variant, filter.active)}
                >
                  {filter.active && (
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{ backgroundColor: getDotColor(filter.variant) }}
                    />
                  )}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Toggle */}
          {showToggle && toggleOptions && (
            <div className="flex gap-[4px] p-[4px] bg-[#F3F6F9] rounded-[8px]">
              {toggleOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onToggleChange?.(index)}
                  className={cn(
                    'px-[12px] py-[4px] rounded-[4px] text-[14px] leading-[22px] font-medium transition-all duration-200',
                    activeToggle === index
                      ? 'bg-white text-[#17263D] shadow-sm'
                      : 'text-[#7F8FA4] hover:text-[#17263D]'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex gap-[8px]">
              {buttons.map((button, index) => {
                const buttonVariant = button.variant || 'primary';
                const isPrimary = buttonVariant === 'primary';

                return (
                  <button
                    key={index}
                    onClick={button.onClick}
                    className={cn(
                      'flex items-center gap-[8px] rounded-[12px] text-[14px] leading-[22px] font-medium transition-all duration-200',
                      level === 'primary' || level === 'secondary'
                        ? 'px-[16px] py-[8px]'
                        : 'px-[12px] py-[6px]',
                      isPrimary
                        ? 'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B] hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31] text-white'
                        : 'bg-[#FFFFFF] text-[#1339A0] border border-[#17263D] hover:bg-[#F9FAFB]'
                    )}
                  >
                    {button.icon && button.icon}
                    <span>{button.label}</span>
                    {button.dropdown && (
                      <CaretDown
                        size={16}
                        weight="bold"
                        className={isPrimary ? 'text-white' : 'text-[#1339A0]'}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Settings Icon (Tertiary only) */}
          {showSettings && level === 'tertiary' && (
            <button
              onClick={onSettingsClick}
              className="p-[6px] hover:bg-[#F3F6F9] rounded-[8px] transition-colors duration-200"
            >
              <GearSix size={20} weight="regular" className="text-[#7F8FA4]" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
