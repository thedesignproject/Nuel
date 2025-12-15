'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { NotificationCard } from './NotificationCard';
import { ReviewAlertModal } from './ReviewAlertModal';

export interface ActivityAlertWidgetProps {
  /** Additional className */
  className?: string;
}

/**
 * Activity Alert Widget Component
 * Exactly replicates the Figma "Activity Alert" widget design
 *
 * Features:
 * - Collapsible section
 * - Horizontal scrolling cards
 * - Dismiss all functionality
 * - Uses NotificationCard component
 */
export const ActivityAlertWidget = React.forwardRef<HTMLDivElement, ActivityAlertWidgetProps>(
  ({ className }, ref) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<any>(null);
    const [alerts, setAlerts] = useState([
      {
        id: '1',
        severity: 'critical' as const,
        title: 'Northeast Region Execution Rate Below 8…',
        description: 'Four terminals showing significant performance degradation requiring immediate attention',
        status: 'critical' as const,
        statusLabel: 'Critical',
        region: 'Northeast',
        impact: 'High - 4 terminals affected',
        reported: '10/09/2025, 15:45:26',
      },
      {
        id: '2',
        severity: 'warning' as const,
        title: 'Fuel Cost Impact Exceeding Forecast',
        description: 'Current fuel costs are 15% above budget projections for Q4',
        status: 'warning' as const,
        statusLabel: 'Warning',
        region: 'Midwest',
        impact: 'Medium - Budget variance',
        reported: '10/09/2025, 14:30:12',
      },
      {
        id: '3',
        severity: 'warning' as const,
        title: 'Maintenance Schedule Delay',
        description: 'Routine maintenance pushed back 2 weeks due to resource constraints',
        status: 'warning' as const,
        statusLabel: 'Warning',
        region: 'Southeast',
        impact: 'Low - Schedule adjustment',
        reported: '10/09/2025, 13:15:45',
      },
    ]);

    const handleDismissAll = () => {
      setAlerts([]);
    };

    const handleDismissCard = (id: string) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const handleReviewAlert = (alert: any) => {
      setSelectedAlert(alert);
      setShowReviewModal(true);
    };

    const handleCompleteReview = (data: {
      priority: string;
      assignedTo: string;
      notes: string;
    }) => {
      console.log('Review completed:', data);
      // You can add logic here to update the alert or send to backend
    };

    const handleMarkUnread = () => {
      console.log('Marked as unread');
      // You can add logic here to mark alert as unread
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white',
          'rounded-[24px]',
          'p-[24px]',
          'w-full',
          'max-w-full',
          'flex flex-col gap-[16px]',
          className
        )}
      >
        {/* Section Heading */}
        <div className="border-b-[0.5px] border-[#D9E0E9] pb-[16px] flex gap-[24px] items-center w-full">
          {/* Left side - Title with icon */}
          <div className="flex-1 flex gap-[12px] items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center pt-[1px]"
              aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
            >
              {/* Collapse/Expand Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={cn(
                  'transition-transform duration-200',
                  isExpanded ? 'rotate-0' : '-rotate-90'
                )}
              >
                <path
                  d="M18 9L12 15L6 9"
                  stroke="#1C58F7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex-1 flex gap-[8px] items-center">
              <h3 className="text-[24px] leading-[30px] font-semibold text-[#17263D]">
                Active Alerts
              </h3>
            </div>
          </div>

          {/* Right side - Dismiss All */}
          <div className="flex gap-[12px] items-center">
            <button
              onClick={handleDismissAll}
              className="px-[4px] py-[8px] rounded-[12px] hover:bg-[#F9FAFB] transition-colors"
              disabled={alerts.length === 0}
            >
              <p className="text-[14px] leading-[22px] font-normal text-[#7F8FA4] text-center underline decoration-solid">
                Dismiss All
              </p>
            </button>
          </div>
        </div>

        {/* Cards Container - Horizontal Scroll */}
        {isExpanded && (
          <div className="w-full overflow-x-auto">
            <div className="flex gap-[16px] items-stretch">
              {alerts.length === 0 ? (
                <div className="w-full text-center py-[40px]">
                  <p className="text-[14px] leading-[22px] text-[#7F8FA4]">
                    No active alerts
                  </p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="flex-shrink-0">
                    <NotificationCard
                      severity={alert.severity}
                      title={alert.title}
                      description={alert.description}
                      primaryAction="Review"
                      secondaryAction="Dismiss"
                      onPrimaryAction={() => handleReviewAlert(alert)}
                      onSecondaryAction={() => handleDismissCard(alert.id)}
                      onClose={() => handleDismissCard(alert.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

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

ActivityAlertWidget.displayName = 'ActivityAlertWidget';
