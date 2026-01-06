'use client';

import React, { useState } from 'react';
import { X, Warning } from '@phosphor-icons/react';
import { StatusPill } from './StatusPill';
import { ReviewAlertModal } from './ReviewAlertModal';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  status: 'critical' | 'warning' | 'info';
  statusLabel: string;
  region?: string;
  impact?: string;
  reported?: string;
}

export const CompactAlertBanner: React.FC = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      title: 'Northeast Region Execution Rate Below 85%',
      description: 'Four terminals showing significant performance degradation requiring immediate attention',
      status: 'critical',
      statusLabel: 'Critical',
      region: 'Northeast',
      impact: 'High - 4 terminals affected',
      reported: '10/09/2025, 15:45:26',
    },
    {
      id: '2',
      severity: 'warning',
      title: 'Inventory Levels Critical at Harbor Terminal',
      description: 'KMS inventory has dropped below safety threshold',
      status: 'warning',
      statusLabel: 'Warning',
      region: 'Harbor Terminal',
      impact: 'Medium - Stock shortage risk',
      reported: '10/09/2025, 14:30:15',
    },
  ]);

  const currentAlert = alerts[0];

  const handleDismiss = () => {
    setAlerts(alerts.slice(1));
  };

  const handleReview = () => {
    setShowReviewModal(true);
  };

  const handleCompleteReview = (data: { priority: string; assignedTo: string; notes: string }) => {
    console.log('Review completed:', data);
    setAlerts(alerts.slice(1));
  };

  const handleMarkUnread = () => {
    console.log('Marked as unread');
  };

  if (!currentAlert) return null;

  const getSeverityColor = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return '#FF3B30';
      case 'warning':
        return '#FF9500';
      case 'info':
        return '#1C58F7';
    }
  };

  const getSeverityBg = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return '#FFD6DB';
      case 'warning':
        return '#FFE8CC';
      case 'info':
        return '#E8F3FF';
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 999999,
          width: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${getSeverityColor(currentAlert.severity)}20`,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: getSeverityBg(currentAlert.severity),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Warning size={20} weight="fill" color={getSeverityColor(currentAlert.severity)} />
            </div>
            <StatusPill variant={currentAlert.severity} label={currentAlert.statusLabel} />
          </div>

          <button
            onClick={handleDismiss}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={18} weight="bold" color="#7F8FA4" />
          </button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              fontWeight: 600,
              color: '#17263D',
              margin: 0,
            }}
          >
            {currentAlert.title}
          </p>
          <p
            style={{
              fontFamily: 'DM Sans',
              fontSize: '13px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#7F8FA4',
              margin: 0,
            }}
          >
            {currentAlert.description}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
          <button
            onClick={handleReview}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #17263D 0%, #0D245C 50%, #02227B 100%)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Review Alert
          </button>
          <button
            onClick={handleDismiss}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: '1px solid #D1D5DB',
              cursor: 'pointer',
              fontFamily: 'DM Sans',
              fontSize: '13px',
              fontWeight: 500,
              color: '#7F8FA4',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Dismiss
          </button>
        </div>

        {/* Alert Counter */}
        {alerts.length > 1 && (
          <div
            style={{
              paddingTop: '8px',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '12px',
                lineHeight: '20px',
                fontWeight: 500,
                color: '#7F8FA4',
                margin: 0,
              }}
            >
              {alerts.length - 1} more alert{alerts.length - 1 !== 1 ? 's' : ''} pending
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewAlertModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        alert={currentAlert}
        onComplete={handleCompleteReview}
        onMarkUnread={handleMarkUnread}
      />
    </>
  );
};
