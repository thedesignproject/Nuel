'use client';

import React, { forwardRef, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

// ============================================
// INPUT COMPONENT TYPES
// ============================================

type BaseInputProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
};

type SingleLineInputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    variant?: 'input';
    multiline?: false;
  };

type MultiLineInputProps = BaseInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    variant: 'textarea';
    multiline: true;
    rows?: number;
  };

export type InputProps = SingleLineInputProps | MultiLineInputProps;

// ============================================
// INPUT COMPONENT
// ============================================

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      label,
      helperText,
      error = false,
      errorMessage,
      disabled = false,
      className = '',
      variant = 'input',
      multiline = false,
      ...restProps
    } = props;

    // Determine the actual error state and message
    const isError = error || !!errorMessage;
    const displayHelperText = errorMessage || helperText;

    // Base styles matching Figma specifications
    const baseStyles = {
      fontFamily: 'DM Sans',
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 400,
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid',
      width: '100%',
      outline: 'none',
      transition: 'border-color 150ms ease-in-out, background-color 150ms ease-in-out',
    } as const;

    // State-specific styles
    const getStateStyles = () => {
      if (disabled) {
        return {
          backgroundColor: '#F3F6F9',
          borderColor: '#C3CDD9',
          color: '#17263D',
          opacity: 0.5,
          cursor: 'not-allowed',
        };
      }

      if (isError) {
        return {
          backgroundColor: '#FFFFFF',
          borderColor: '#FF3B30',
          color: '#17263D',
        };
      }

      // Default state
      return {
        backgroundColor: '#F3F6F9',
        borderColor: '#C3CDD9',
        color: '#17263D',
      };
    };

    // Focus styles (applied via CSS class)
    const focusClass = !disabled && !isError ? 'focus:border-[#1C58F7] focus:bg-white' : '';
    const errorFocusClass = isError && !disabled ? 'focus:border-[#FF3B30]' : '';

    // Placeholder color
    const placeholderClass = 'placeholder:text-[#7F8FA4]';

    const combinedStyles = {
      ...baseStyles,
      ...getStateStyles(),
    };

    return (
      <div className={`flex flex-col ${className}`}>
        {/* Label */}
        {label && (
          <label
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 500,
              color: '#17263D',
              marginBottom: '8px',
            }}
          >
            {label}
          </label>
        )}

        {/* Helper Text (above input) */}
        {helperText && !errorMessage && (
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#7F8FA4',
              marginBottom: '4px',
            }}
          >
            {helperText}
          </p>
        )}

        {/* Input Field */}
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            disabled={disabled}
            className={`${focusClass} ${errorFocusClass} ${placeholderClass} resize-none`}
            style={{
              ...combinedStyles,
              minHeight: '81px',
            }}
            {...(restProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            disabled={disabled}
            className={`${focusClass} ${errorFocusClass} ${placeholderClass}`}
            style={{
              ...combinedStyles,
              height: '38px',
            }}
            {...(restProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Error Message */}
        {errorMessage && (
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#FF3B30',
              marginTop: '4px',
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
