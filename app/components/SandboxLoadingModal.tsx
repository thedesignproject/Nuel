'use client';

import React from 'react';
import { Modal } from './Modal';
import { ArrowClockwise } from '@phosphor-icons/react';
import { COLORS } from '../design-tokens';

interface SandboxLoadingModalProps {
  isOpen: boolean;
}

export const SandboxLoadingModal: React.FC<SandboxLoadingModalProps> = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Running Configuration"
      subtitle="Analyzing scenarios and calculating impact metrics..."
      icon={
        <div className="animate-spin">
          <ArrowClockwise size={28} weight="bold" color={COLORS.accent[500]} />
        </div>
      }
      width="480px"
      maxWidth="480px"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '32px 0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: COLORS.neutral[200],
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            className="animate-pulse"
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.accent[500],
              borderRadius: '2px',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'DM Sans',
            fontSize: '14px',
            color: COLORS.text.secondary,
            textAlign: 'center',
          }}
        >
          This may take a few moments...
        </p>
      </div>
    </Modal>
  );
};
