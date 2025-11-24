'use client';

import React from 'react';
import { MapPin, Crosshair } from 'lucide-react';
import { COLORS, SPACING, TYPOGRAPHY } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface TableRow {
  location: string;
  type: 'Terminal' | 'Plant';
  currentAccuracy: number;
  progressTo90: number;
  status: 'Needs improvement' | 'Focus Area';
  notes: string;
  noteEmoji?: string;
}

export interface HistoricalPerformanceTableProps {
  className?: string;
}

// ============================================
// DATA
// ============================================

const tableData: TableRow[] = [
  {
    location: 'Midwest',
    type: 'Terminal',
    currentAccuracy: 66,
    progressTo90: 40,
    status: 'Needs improvement',
    notes: 'Provide order details to the terminal',
    noteEmoji: '🔹',
  },
  {
    location: 'Midwest',
    type: 'Plant',
    currentAccuracy: 74,
    progressTo90: 60,
    status: 'Focus Area',
    notes: 'Supply from other terminals',
    noteEmoji: '📦',
  },
  {
    location: 'Midwest',
    type: 'Plant',
    currentAccuracy: 80,
    progressTo90: 80,
    status: 'Focus Area',
    notes: 'Add Note...',
    noteEmoji: '✏',
  },
  {
    location: 'Midwest',
    type: 'Terminal',
    currentAccuracy: 66,
    progressTo90: 40,
    status: 'Needs improvement',
    notes: 'Rail service issues',
    noteEmoji: '🚂',
  },
  {
    location: 'Midwest',
    type: 'Plant',
    currentAccuracy: 74,
    progressTo90: 60,
    status: 'Focus Area',
    notes: 'Logistics disruption',
    noteEmoji: '🚚',
  },
  {
    location: 'Midwest',
    type: 'Plant',
    currentAccuracy: 80,
    progressTo90: 80,
    status: 'Focus Area',
    notes: 'Add Note...',
    noteEmoji: '✏',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Get progress bar color based on value */
const getProgressBarColor = (value: number): string => {
  if (value < 50) return COLORS.semantic.error[500]; // Red
  if (value < 70) return '#FFD400'; // Yellow
  return COLORS.semantic.success[500]; // Green
};

/** Get progress bar width based on percentage */
const getProgressBarWidth = (percentage: number): string => {
  const maxWidth = 80; // 80px max width
  const width = (percentage / 100) * maxWidth;
  return `${Math.round(width)}px`;
};

// ============================================
// SUB-COMPONENTS
// ============================================

/** Type Tag Component (Terminal or Plant) */
const TypeTag = ({ type }: { type: 'Terminal' | 'Plant' }) => {
  const isTerminal = type === 'Terminal';
  const color = isTerminal ? COLORS.accent[500] : '#D345F8'; // Purple for Plant

  return (
    <div
      style={{
        display: 'flex',
        gap: SPACING[4],
        alignItems: 'center',
      }}
    >
      {/* Icon placeholder - simplified for now */}
      <div
        style={{
          width: '14px',
          height: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          {isTerminal ? (
            // Terminal building icon
            <rect x="2" y="3" width="10" height="9" stroke={color} strokeWidth="1.2" fill="none" />
          ) : (
            // Plant house icon
            <path
              d="M7 2L2 6H4V11H10V6H12L7 2Z"
              stroke={color}
              strokeWidth="1.2"
              fill="none"
            />
          )}
        </svg>
      </div>
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
          fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
          lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
          fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
          color: color,
          margin: 0,
        }}
      >
        {type}
      </p>
    </div>
  );
};

/** Progress Bar Component */
const ProgressBar = ({ percentage }: { percentage: number }) => {
  const barColor = getProgressBarColor(percentage);
  const barWidth = getProgressBarWidth(percentage);

  return (
    <div
      style={{
        display: 'flex',
        gap: SPACING[12],
        alignItems: 'center',
      }}
    >
      {/* Progress bar background */}
      <div
        style={{
          backgroundColor: '#E8EDF2',
          width: '80px',
          height: '6px',
          borderRadius: '9999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            backgroundColor: barColor,
            width: barWidth,
            height: '100%',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      {/* Percentage text */}
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
          fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
          lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
          fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
          color: COLORS.text.primary,
          margin: 0,
          width: '40px',
        }}
      >
        {percentage}%
      </p>
    </div>
  );
};

/** Status Pill Component */
const StatusPill = ({ status }: { status: 'Needs improvement' | 'Focus Area' }) => {
  const isError = status === 'Needs improvement';
  const bgColor = isError ? COLORS.semantic.error[100] : COLORS.semantic.info[100];

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '9999px',
        padding: `${SPACING[8]} ${SPACING[12]}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: SPACING[4],
        height: '32px',
      }}
    >
      {/* Dot indicator */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isError ? COLORS.semantic.error[500] : '#007AFF',
        }}
      />
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
          fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
          lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
          fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
          color: COLORS.text.primary,
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {status}
      </p>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * HistoricalPerformanceTable Component
 * Displays historical forecast performance data in a table format
 * Exact specifications from Figma with 6 columns and data rows
 */
export const HistoricalPerformanceTable = React.forwardRef<
  HTMLDivElement,
  HistoricalPerformanceTableProps
>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Table Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#17263D',
          borderBottom: `0.5px solid #EAF0FC`,
        }}
      >
        {/* Location */}
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Location
          </p>
        </div>

        {/* Type */}
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Type
          </p>
        </div>

        {/* Current Accuracy */}
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Current Accuracy
          </p>
        </div>

        {/* Progress to 90% */}
        <div
          style={{
            flex: '1 0 0',
            minWidth: 0,
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Progress to 90%
          </p>
        </div>

        {/* Status */}
        <div
          style={{
            width: '202px',
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Status
          </p>
        </div>

        {/* Notes/Issues */}
        <div
          style={{
            width: '304px',
            padding: `${SPACING[12]} ${SPACING[16]}`,
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
              color: COLORS.neutral[50],
              margin: 0,
            }}
          >
            Notes/Issues
          </p>
        </div>
      </div>

      {/* Table Body */}
      {tableData.map((row, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: COLORS.neutral[0],
            borderBottom: `0.5px solid #EAF0FC`,
          }}
        >
          {/* Location */}
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: SPACING[4],
                alignItems: 'center',
              }}
            >
              <MapPin size={14} strokeWidth={1.5} style={{ color: COLORS.text.primary }} />
              <p
                style={{
                  fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                  fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                  lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                  fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
                  color: COLORS.text.primary,
                  margin: 0,
                }}
              >
                {row.location}
              </p>
            </div>
          </div>

          {/* Type */}
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TypeTag type={row.type} />
          </div>

          {/* Current Accuracy */}
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: SPACING[4],
                alignItems: 'center',
              }}
            >
              <Crosshair size={14} strokeWidth={1.5} style={{ color: COLORS.text.primary }} />
              <p
                style={{
                  fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                  fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                  lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                  fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
                  color: COLORS.text.primary,
                  margin: 0,
                }}
              >
                {row.currentAccuracy}%
              </p>
            </div>
          </div>

          {/* Progress to 90% */}
          <div
            style={{
              flex: '1 0 0',
              minWidth: 0,
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ProgressBar percentage={row.progressTo90} />
          </div>

          {/* Status */}
          <div
            style={{
              width: '202px',
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <StatusPill status={row.status} />
          </div>

          {/* Notes/Issues */}
          <div
            style={{
              width: '304px',
              padding: `${SPACING[16]} ${SPACING[16]}`,
              height: '56px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: SPACING[8],
                alignItems: 'center',
              }}
            >
              {row.noteEmoji && (
                <span style={{ fontSize: '14px', lineHeight: '22px' }}>{row.noteEmoji}</span>
              )}
              <p
                style={{
                  fontFamily: TYPOGRAPHY.bodyExtraSmallText.fontFamily,
                  fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
                  lineHeight: TYPOGRAPHY.bodyExtraSmallText.lineHeight,
                  fontWeight: TYPOGRAPHY.bodyExtraSmallText.fontWeight,
                  color: COLORS.text.primary,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.notes}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

HistoricalPerformanceTable.displayName = 'HistoricalPerformanceTable';
