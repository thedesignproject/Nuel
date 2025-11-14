'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { X } from '@phosphor-icons/react';

// ============================================
// MODAL COMPONENT TYPES
// ============================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  maxWidth?: string;
}

// ============================================
// MODAL COMPONENT
// ============================================

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  subtitle,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  footer,
  width = '424px',
  maxWidth = '424px',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element when modal opens
    setTimeout(() => {
      if (firstElement) {
        firstElement.focus();
      }
    }, 100);

    // Handle tab key for focus trap
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab as any);
    return () => modal.removeEventListener('keydown', handleTab as any);
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 250ms ease-out',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className="relative"
        style={{
          width: width,
          maxWidth: maxWidth,
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0px 4px 16px 8px rgba(0, 0, 0, 0.06)',
          animation: 'modalSlideIn 250ms ease-out',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: 'calc(100vh - 80px)',
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            style={{
              borderBottom: '0.5px solid #C3CDD9',
              paddingBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* Title Section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                }}
              >
                {title && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {icon && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '1px',
                        }}
                      >
                        {icon}
                      </div>
                    )}
                    <h2
                      id="modal-title"
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '30px',
                        color: '#17263D',
                      }}
                    >
                      {title}
                    </h2>
                  </div>
                )}
                {subtitle && (
                  <p
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '22px',
                      color: '#7F8FA4',
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '2px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#7F8FA4',
                    transition: 'color 150ms ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#17263D')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#7F8FA4')}
                >
                  <X size={24} weight="regular" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          div[ref='modalRef'] {
            width: calc(100% - 32px) !important;
          }
        }
      `}</style>
    </div>
  );
};
