'use client';

import React, { forwardRef, useState, InputHTMLAttributes } from 'react';

// ============================================
// PASSWORD INPUT COMPONENT TYPES
// ============================================

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

// ============================================
// EYE ICONS
// ============================================

const EyeOpenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
      fill="#7F8FA4"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z"
      fill="#7F8FA4"
    />
  </svg>
);

// ============================================
// PASSWORD INPUT COMPONENT
// ============================================

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      label,
      helperText,
      error = false,
      errorMessage,
      disabled = false,
      className = '',
      ...restProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    // Determine the actual error state and message
    const isError = error || !!errorMessage;

    // Base styles matching Figma specifications (same as Input component)
    const baseStyles = {
      fontFamily: 'DM Sans',
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 400,
      padding: '8px 16px',
      paddingRight: '44px', // Extra padding for the eye icon
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

    const togglePasswordVisibility = () => {
      if (!disabled) {
        setShowPassword(!showPassword);
      }
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

        {/* Input Field with Toggle Button */}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            className={`${focusClass} ${errorFocusClass} ${placeholderClass}`}
            style={{
              ...combinedStyles,
              height: '38px',
            }}
            {...restProps}
          />

          {/* Show/Hide Toggle Button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>

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

PasswordInput.displayName = 'PasswordInput';
