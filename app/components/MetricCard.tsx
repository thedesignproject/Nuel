'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Info,
  Package,
  Target,
  ChevronRight,
} from 'lucide-react';
import { CARD_CURVATURE } from '../design-tokens';

export interface MetricCardProps {
  /** Icon type for the metric */
  icon: 'dollar' | 'package' | 'target' | 'trending-down';
  /** Title of the metric */
  title: string;
  /** Main value to display */
  value: string;
  /** Trend information */
  trend: {
    direction: 'up' | 'down';
    percentage: string;
    label: string;
  };
  /** Comparison data (Pre-Nuel vs Post-Nuel) */
  comparison: {
    preNuel: string;
    postNuel: string;
  };
  /** Additional className */
  className?: string;
  /** Enable counting animation (default: true) */
  enableAnimation?: boolean;
}

/**
 * MetricCard Component
 * Displays KPI metrics with counting animation
 *
 * Specifications from Figma:
 * - Border Radius: 16px (CARD_CURVATURE token)
 * - Padding: 16px (all sides)
 * - Background: #ffffff
 * - Height: 170px
 * - Width: 100% (responsive in flex container)
 * - Gap between cards: 12px
 * - Animation: 1-2 second counting animation with ease-out
 */
export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      icon,
      title,
      value,
      trend,
      comparison,
      className,
      enableAnimation = false,
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState('0');
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Icon mapping
    const getIcon = () => {
      const iconProps = { size: 14, strokeWidth: 1.5 };
      switch (icon) {
        case 'dollar':
          return <DollarSign {...iconProps} />;
        case 'package':
          return <Package {...iconProps} />;
        case 'target':
          return <Target {...iconProps} />;
        case 'trending-down':
          return <TrendingDown {...iconProps} />;
        default:
          return <DollarSign {...iconProps} />;
      }
    };

    // Extract numeric value for animation
    const getNumericValue = (str: string): number => {
      const cleaned = str.replace(/[$,%,]/g, '').replace(/,/g, '');
      if (str.includes('M')) {
        return parseFloat(cleaned.replace('M', '').replace('Tons', '').trim());
      }
      if (str.includes('Tons')) {
        return parseFloat(cleaned.replace('Tons', '').trim());
      }
      return parseFloat(cleaned) || 0;
    };

    // Format the animated value back
    const formatAnimatedValue = (num: number): string => {
      if (value.includes('$') && value.includes(',') && num >= 1000000) {
        return `$${Math.round(num).toLocaleString()}`;
      } else if (value.includes('$')) {
        return `$${num.toFixed(2)}`;
      } else if (value.includes('%')) {
        return `${num.toFixed(1)}%`;
      } else if (value.includes('M')) {
        return `${num.toFixed(2)}M Tons`;
      }
      return num.toString();
    };

    // Subtle number rolling animation - always enabled
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);

              const targetNum = getNumericValue(value);
              const duration = 800; // 0.8 seconds - subtle and quick
              const startTime = Date.now();
              const startNum = targetNum * 0.92; // Start from 92% of target - very subtle

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic for smooth deceleration
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentNum = startNum + (targetNum - startNum) * easeOut;

                setDisplayValue(formatAnimatedValue(currentNum));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setDisplayValue(value); // Ensure exact final value
                }
              };

              // Start animation after short delay
              setTimeout(() => requestAnimationFrame(animate), 100);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [value, enableAnimation]);

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          'bg-white flex flex-col gap-[12px] p-[16px] h-[170px] w-full',
          `rounded-[${CARD_CURVATURE}]`,
          'transition-opacity duration-500 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
      >
        {/* Header Section */}
        <div className="flex gap-[8px] items-center w-full">
          {/* Rounded Icon */}
          <div className="bg-[#EAF1FF] rounded-full p-[4px] flex items-center justify-center shrink-0">
            <div className="text-[#17263D] w-[14px] h-[14px]">
              {getIcon()}
            </div>
          </div>

          {/* Title Wrapper */}
          <div className="flex flex-1 gap-[4px] items-center min-w-0">
            <p className="font-['DM_Sans'] font-medium text-[14px] leading-[22px] text-[#17263D] truncate">
              {title}
            </p>
            <Info size={12} className="text-[#7F8FA4] shrink-0" strokeWidth={1.5} />
          </div>
        </div>

        {/* Value Section */}
        <div className="flex flex-col gap-[2px] w-full">
          {/* Main Value */}
          <p className="font-['DM_Sans'] font-bold text-[18px] leading-[26px] text-[#1C58F7]">
            {displayValue}
          </p>

          {/* Insight Row */}
          <div className="flex items-center w-full">
            {/* Value Tag */}
            <div className="flex gap-[4px] items-center pr-[4px]">
              {trend.direction === 'up' ? (
                <TrendingUp size={10} className="text-[#34C759]" strokeWidth={1.5} />
              ) : (
                <TrendingDown size={10} className="text-[#FF3B30]" strokeWidth={1.5} />
              )}
              <p
                className={cn(
                  "font-['DM_Sans'] font-normal text-[10px] leading-[16px] uppercase",
                  trend.direction === 'up' ? 'text-[#34C759]' : 'text-[#FF3B30]'
                )}
              >
                {trend.percentage}
              </p>
            </div>

            {/* Label */}
            <p className="font-['DM_Sans'] font-normal text-[10px] leading-[16px] text-[#7F8FA4] uppercase">
              {trend.label}
            </p>
          </div>
        </div>

        {/* Comparison Section (Pre-Nuel vs Post-Nuel) */}
        <div className="border-t-[0.5px] border-[#D9E0E9] pt-[8px] flex gap-[8px] items-center w-full">
          {/* Pre-Nuel */}
          <div className="flex-1 flex flex-col min-w-0">
            <p className="font-['DM_Sans'] font-medium text-[12px] leading-[20px] text-[#7F8FA4]">
              Pre-Nuel
            </p>
            <p className="font-['DM_Sans'] font-normal text-[12px] leading-[20px] text-[#7F8FA4] truncate">
              {comparison.preNuel}
            </p>
          </div>

          {/* Caret Icon */}
          <ChevronRight size={14} className="text-[#7F8FA4] shrink-0" strokeWidth={1.5} />

          {/* Post-Nuel */}
          <div className="flex-1 flex flex-col items-end min-w-0">
            <p className="font-['DM_Sans'] font-medium text-[12px] leading-[20px] text-[#17263D] text-right">
              Post-Nuel
            </p>
            <p className="font-['DM_Sans'] font-normal text-[12px] leading-[20px] text-[#17263D] text-right truncate">
              {comparison.postNuel}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
