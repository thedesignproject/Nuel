'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { NotificationCard } from './NotificationCard';
import { ReviewAlertModal } from './ReviewAlertModal';
import { Bell, SlidersHorizontal } from '@phosphor-icons/react';

export interface InventoryAlertsProps {
  className?: string;
}

/**
 * InventoryAlerts Component
 * Displays a scrollable list of inventory alerts with filter button
 * Exactly replicates Figma specifications
 */
export const InventoryAlerts = React.forwardRef<HTMLDivElement, InventoryAlertsProps>(
  ({ className }, ref) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<any>(null);

    const [alerts, setAlerts] = useState([
      {
        id: '1',
        severity: 'info' as const,
        title: 'Sales Below Forecast',
        description: 'High inventory of KMS at New Amina Terminal',
        location: 'New Amina Terminal - KMS',
        date: '20/05/2025',
        status: 'info' as const,
        statusLabel: 'Info',
        region: 'New Amina Terminal',
        impact: 'Medium - Inventory buildup',
        reported: '20/05/2025',
      },
      {
        id: '2',
        severity: 'warning' as const,
        title: 'Sales Above Forecast',
        description: 'High inventory of KMS at New Amina Terminal',
        location: 'New Amina Terminal - KMS',
        date: '20/05/2025',
        status: 'warning' as const,
        statusLabel: 'Warning',
        region: 'New Amina Terminal',
        impact: 'High - Stock shortage risk',
        reported: '20/05/2025',
      },
      {
        id: '3',
        severity: 'critical' as const,
        title: 'Sales Above Forecast',
        description: 'High inventory of KMS at New Amina Terminal',
        location: 'New Amina Terminal - KMS',
        date: '20/05/2025',
        status: 'critical' as const,
        statusLabel: 'Critical',
        region: 'New Amina Terminal',
        impact: 'Critical - Immediate action required',
        reported: '20/05/2025',
      },
    ]);

    const handleReviewAlert = (alert: any) => {
      setSelectedAlert(alert);
      setShowReviewModal(true);
    };

    const handleDismissCard = (id: string) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const handleCompleteReview = (data: { priority: string; assignedTo: string; notes: string; }) => {
      console.log('Review completed:', data);
    };

    const handleMarkUnread = () => {
      console.log('Marked as unread');
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          width: '504px',
          height: '504px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Section Header */}
        <SectionHeader
          level="primary"
          icon={<Bell size={24} weight="regular" className="text-[#1C58F7]" />}
          title="Inventory Alerts"
          buttons={[
            {
              label: 'Filters',
              onClick: () => console.log('Open filters'),
              icon: <SlidersHorizontal size={16} weight="regular" />,
              variant: 'secondary',
            },
          ]}
        />

        {/* Alerts Container with Scroll */}
        <div
          style={{
            position: 'relative',
            height: '386px',
            width: '100%',
          }}
        >
          {/* Scrollable Alerts List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              width: '100%',
            }}
          >
            {alerts.map((alert) => (
              <NotificationCard
                key={alert.id}
                severity={alert.severity}
                title={alert.title}
                description={alert.description}
                date={alert.date}
                primaryAction="Review"
                secondaryAction="Dismiss"
                onPrimaryAction={() => handleReviewAlert(alert)}
                onSecondaryAction={() => handleDismissCard(alert.id)}
                className="w-full"
              />
            ))}
          </div>

          {/* Shadow Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '504px',
              height: '80px',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Review Alert Modal */}
        <ReviewAlertModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          alert={selectedAlert}
          onComplete={handleCompleteReview}
          onMarkUnread={handleMarkUnread}
        />
      </div>
    );
  }
);

InventoryAlerts.displayName = 'InventoryAlerts';
