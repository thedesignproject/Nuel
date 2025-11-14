'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button size variant */
  size?: ButtonSize;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Icon element to display before text */
  icon?: React.ReactNode;
  /** Child content (typically text) */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Button Component
 * Exactly replicates the Figma "buttons" component design
 *
 * Variants:
 * - Sizes: small, medium, large
 * - Types: primary, secondary
 * - States: default, hover, disabled
 * - Icon: optional icon in front
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      icon,
      children,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    // Size-specific styles - EXACT values from Figma
    const sizeStyles = {
      small: {
        padding: 'px-[12px] py-[6px]',
        borderRadius: 'rounded-[8px]',
        fontSize: 'text-[12px]',
        lineHeight: 'leading-[20px]',
        fontWeight: 'font-medium',
        letterSpacing: 'tracking-[0px]',
        iconSize: 'w-[16px] h-[16px]',
      },
      medium: {
        padding: 'px-[12px] py-[6px]',
        borderRadius: 'rounded-[10px]',
        fontSize: 'text-[16px]',
        lineHeight: 'leading-[24px]',
        fontWeight: 'font-medium',
        letterSpacing: 'tracking-[0.2px]',
        iconSize: 'w-[18px] h-[18px]',
      },
      large: {
        padding: 'px-[16px] py-[10px]',
        borderRadius: 'rounded-[12px]',
        fontSize: 'text-[18px]',
        lineHeight: 'leading-[26px]',
        fontWeight: 'font-medium',
        letterSpacing: 'tracking-[0px]',
        iconSize: 'w-[20px] h-[20px]',
      },
    };

    // Variant-specific styles - EXACT colors from Figma tokens
    const variantStyles = {
      primary: {
        default: 'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B] text-[#F9FAFB]',
        hover: 'hover:bg-gradient-to-r hover:from-[#121D31] hover:via-[#121D31] hover:to-[#121D31]',
        disabled: 'disabled:opacity-50',
        border: '',
      },
      secondary: {
        default: 'bg-[#FFFFFF] text-[#1339A0] border border-[#17263D]',
        hover: 'hover:bg-[#F9FAFB]',
        disabled: 'disabled:opacity-50',
        border: 'border',
      },
    };

    const currentSize = sizeStyles[size];
    const currentVariant = variantStyles[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center gap-[10px]',
          'font-sans transition-all duration-200',
          'cursor-pointer disabled:cursor-not-allowed',
          'w-fit', // Hug contents - only as wide as needed

          // Size styles
          currentSize.padding,
          currentSize.borderRadius,
          currentSize.fontSize,
          currentSize.lineHeight,
          currentSize.fontWeight,
          currentSize.letterSpacing,

          // Variant styles
          currentVariant.default,
          currentVariant.hover,
          currentVariant.disabled,
          currentVariant.border,

          // Custom className
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn('flex-shrink-0', currentSize.iconSize)}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
