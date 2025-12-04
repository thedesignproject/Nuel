'use client';

import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  disabled = false,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      {/* Label and Value */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: 500,
            color: disabled ? '#9CA3AF' : '#374151',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontWeight: 600,
            color: disabled ? '#9CA3AF' : '#1F2937',
          }}
        >
          {value}
          {unit}
        </span>
      </div>

      {/* Slider Track */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '8px',
          backgroundColor: '#E5E7EB',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {/* Filled Track */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: disabled ? '#9CA3AF' : '#3B82F6',
            borderRadius: '4px',
            transition: 'width 0.15s ease',
          }}
        />

        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            zIndex: 2,
          }}
        />

        {/* Slider Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `${percentage}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            backgroundColor: '#FFFFFF',
            border: `3px solid ${disabled ? '#9CA3AF' : '#3B82F6'}`,
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            transition: 'left 0.15s ease',
          }}
        />
      </div>

      {/* Min/Max Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '12px',
            fontWeight: 400,
            color: '#9CA3AF',
          }}
        >
          {min}
          {unit}
        </span>
        <span
          style={{
            fontFamily: 'DM Sans',
            fontSize: '12px',
            fontWeight: 400,
            color: '#9CA3AF',
          }}
        >
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
};
