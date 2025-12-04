'use client';

import React from 'react';

interface ToggleProps {
  /**
   * Whether the toggle is on or off
   */
  isOn: boolean;
  /**
   * Callback when toggle state changes
   */
  onChange: (isOn: boolean) => void;
  /**
   * Optional label to display next to toggle
   */
  label?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ isOn, onChange, label, disabled = false }) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!isOn);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0E0E0E',
          }}
        >
          {label}
        </span>
      )}
      <button
        onClick={handleClick}
        disabled={disabled}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: isOn ? '#3B82F6' : '#D1D5DB',
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
          padding: 0,
          opacity: disabled ? 0.5 : 1,
        }}
        aria-label={label || 'Toggle'}
        aria-checked={isOn}
        role="switch"
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: '2px',
            left: isOn ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        />
      </button>
    </div>
  );
};
