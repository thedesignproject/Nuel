'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Zap } from 'lucide-react';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../design-tokens';
import { ActionOption } from './ExecutionCard';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  selectedOption: ActionOption | null;
}

// ============================================
// EXECUTION MODAL COMPONENT
// ============================================

/**
 * ExecutionModal Component
 * Displays execution progress when user clicks "Execute this option"
 *
 * Uses ONLY existing components and tokens:
 * - Modal component (existing)
 * - Zap icon from lucide-react (existing)
 * - All color, typography, spacing tokens (existing)
 * - CSS transitions for progress bar animation
 *
 * Auto-closes after 2 seconds and triggers onComplete callback
 */
export const ExecutionModal: React.FC<ExecutionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  selectedOption,
}) => {
  const [progress, setProgress] = useState(0);

  // Progress animation and auto-close logic
  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    // Start progress animation
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 50); // Small delay to trigger CSS transition

    // Auto-close after 2 seconds
    const closeTimer = setTimeout(() => {
      onComplete();
      onClose();
    }, 2000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(closeTimer);
    };
  }, [isOpen, onClose, onComplete]);

  // Progress steps
  const progressSteps = [
    'Distribution analysis complete',
    'Facility coordination in progress',
    'Inventory redistribution active',
    'System updates and notifications',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Updating Distribution Plan"
      icon={<Zap size={24} style={{ color: COLORS.primary[500] }} />}
      subtitle="Please wait while we implement the selected distribution strategy across your facilities"
      showCloseButton={true}
      closeOnBackdrop={false}
      closeOnEscape={false}
      width="600px"
      maxWidth="600px"
    >
      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#E8EDF2',
          borderRadius: BORDER_RADIUS.full,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: COLORS.primary[500],
            borderRadius: BORDER_RADIUS.full,
            transition: 'width 2000ms ease-out',
          }}
        />
      </div>

      {/* Status Text */}
      <p
        style={{
          fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
          fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
          fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
          color: COLORS.text.primary,
          margin: 0,
        }}
      >
        Analyzing current distribution configuration...
      </p>

      {/* Selected Action Card */}
      {selectedOption && (
        <div
          className="border"
          style={{
            borderRadius: BORDER_RADIUS.md,
            borderColor: COLORS.primary[500],
            backgroundColor: COLORS.accent[100],
            padding: SPACING[16],
          }}
        >
          <h4
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              fontWeight: 600,
              color: COLORS.text.primary,
              marginBottom: SPACING[8],
            }}
          >
            {selectedOption.title}
          </h4>
          <p
            style={{
              fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
              fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
              lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
              color: COLORS.text.secondary,
              margin: 0,
            }}
          >
            {selectedOption.description}
          </p>
          <div
            className="flex items-center gap-4 flex-wrap"
            style={{
              marginTop: SPACING[12],
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.bodyExtraSmallMedium.fontFamily,
                fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
                color: COLORS.text.secondary,
              }}
            >
              Cost: <span style={{ fontWeight: 500 }}>{selectedOption.cost}</span>
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.bodyExtraSmallMedium.fontFamily,
                fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
                color: COLORS.text.secondary,
              }}
            >
              Delivery: <span style={{ fontWeight: 500 }}>{selectedOption.delivery}</span>
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.bodyExtraSmallMedium.fontFamily,
                fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
                color: COLORS.text.secondary,
              }}
            >
              Impact: <span style={{ fontWeight: 500 }}>{selectedOption.impact}</span>
            </span>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING[12],
        }}
      >
        {progressSteps.map((step, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING[8],
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: COLORS.text.secondary,
                opacity: 0.5,
              }}
            />
            <span
              style={{
                fontFamily: TYPOGRAPHY.bodySmallMedium.fontFamily,
                fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
                lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
                color: COLORS.text.secondary,
              }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};
