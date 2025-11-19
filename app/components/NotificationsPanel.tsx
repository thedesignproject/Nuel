'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Bell, WarningCircle, Info, ClockClockwise, CheckCircle } from '@phosphor-icons/react';
import { StatusPill } from './StatusPill';
import { Button } from './Button';
import { warning, error, success } from '../../lib/design-tokens/colors';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type NotificationType = 'critical' | 'warning' | 'info' | 'completed';
export type FilterTab = 'all' | 'unread' | 'alerts' | 'completed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
}

// ============================================
// SAMPLE DATA
// ============================================

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Critical Inventory Alert',
    description: 'SKU #12345 has fallen below minimum threshold (5 units remaining)',
    time: '2 min ago',
    isUnread: true,
    actionLabel: 'View Details',
  },
  {
    id: '2',
    type: 'critical',
    title: 'System Performance Warning',
    description: 'High API response time detected in production environment',
    time: '15 min ago',
    isUnread: true,
    actionLabel: 'Investigate',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Upcoming Delivery Deadline',
    description: 'Order #ORD-2024-1234 due for delivery in 2 hours',
    time: '1 hour ago',
    isUnread: true,
    actionLabel: 'Track Order',
  },
  {
    id: '4',
    type: 'info',
    title: 'Daily Report Generated',
    description: 'Your daily operational report for Dec 9 is ready to view',
    time: '2 hours ago',
    isUnread: true,
  },
  {
    id: '5',
    type: 'completed',
    title: 'Inventory Sync Completed',
    description: 'All inventory data has been successfully synchronized',
    time: '3 hours ago',
    isUnread: false,
  },
  {
    id: '6',
    type: 'warning',
    title: 'Pending Approval Required',
    description: 'Purchase order PO-2024-567 awaiting your approval',
    time: '4 hours ago',
    isUnread: true,
    actionLabel: 'Review',
  },
  {
    id: '7',
    type: 'info',
    title: 'New Feature Available',
    description: 'Check out the new inventory forecasting dashboard',
    time: 'Yesterday',
    isUnread: false,
  },
  {
    id: '8',
    type: 'completed',
    title: 'Data Export Complete',
    description: 'Your requested ZSOP7 export has been generated',
    time: 'Yesterday',
    isUnread: false,
  },
  {
    id: '9',
    type: 'critical',
    title: 'Failed API Connection',
    description: 'Unable to connect to external inventory system',
    time: '2 days ago',
    isUnread: false,
    actionLabel: 'Retry',
  },
  {
    id: '10',
    type: 'info',
    title: 'System Update Scheduled',
    description: 'Maintenance window scheduled for tonight 2:00 AM - 4:00 AM',
    time: '2 days ago',
    isUnread: false,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'critical':
      return { Icon: WarningCircle, color: error[500] };
    case 'warning':
      return { Icon: ClockClockwise, color: warning[500] };
    case 'info':
      return { Icon: Info, color: '#1C58F7' };
    case 'completed':
      return { Icon: CheckCircle, color: success[500] };
  }
};

const groupNotificationsByDay = (notifications: Notification[]) => {
  const groups: { [key: string]: Notification[] } = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };

  notifications.forEach((notification) => {
    if (notification.time.includes('min') || notification.time.includes('hour')) {
      groups.Today.push(notification);
    } else if (notification.time === 'Yesterday') {
      groups.Yesterday.push(notification);
    } else {
      groups.Earlier.push(notification);
    }
  });

  return groups;
};

// ============================================
// MAIN COMPONENT
// ============================================

export const NotificationsPanel = React.forwardRef<HTMLDivElement, NotificationsPanelProps>(
  ({ isOpen, onClose, notifications = SAMPLE_NOTIFICATIONS }, ref) => {
    const [activeTab, setActiveTab] = useState<FilterTab>('all');
    const [activeTypeFilters, setActiveTypeFilters] = useState<NotificationType[]>([]);
    const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications);
    const panelRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when panel is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
      if (isOpen && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };

        document.addEventListener('keydown', handleTab);
        firstElement?.focus();

        return () => document.removeEventListener('keydown', handleTab);
      }
    }, [isOpen]);

    // Filter notifications
    const filteredNotifications = localNotifications.filter((notification) => {
      // Tab filter
      if (activeTab === 'unread' && !notification.isUnread) return false;
      if (activeTab === 'alerts' && notification.type !== 'critical' && notification.type !== 'warning')
        return false;
      if (activeTab === 'completed' && notification.type !== 'completed') return false;

      // Type filter
      if (activeTypeFilters.length > 0 && !activeTypeFilters.includes(notification.type)) {
        return false;
      }

      return true;
    });

    const groupedNotifications = groupNotificationsByDay(filteredNotifications);

    // Count calculations
    const unreadCount = localNotifications.filter((n) => n.isUnread).length;
    const alertsCount = localNotifications.filter((n) => n.type === 'critical' || n.type === 'warning').length;
    const completedCount = localNotifications.filter((n) => n.type === 'completed').length;

    const handleDismiss = (id: string) => {
      setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const toggleTypeFilter = (type: NotificationType) => {
      setActiveTypeFilters((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    };

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 9998,
            animation: 'fadeIn 250ms ease-out',
          }}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            bottom: '24px',
            width: '520px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0px 4px 16px 8px rgba(0, 0, 0, 0.06)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 300ms ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '24px 24px 16px 24px',
              borderBottom: '1px solid #E8ECF2',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell size={24} weight="regular" color="#1C58F7" />
                <h2
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '32px',
                    color: '#17263D',
                    margin: 0,
                  }}
                >
                  Notifications
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: '4px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close notifications panel"
              >
                <X size={24} weight="regular" color="#17263D" />
              </button>
            </div>
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#7F8FA4',
                margin: 0,
              }}
            >
              Stay updated with system alerts and activity notifications
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#F3F6F9',
              borderRadius: '16px',
              margin: '16px 24px 0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Count Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant={activeTab === 'all' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('all')}
              >
                All ({localNotifications.length})
              </Button>
              <Button
                size="small"
                variant={activeTab === 'unread' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                size="small"
                variant={activeTab === 'alerts' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('alerts')}
              >
                Alerts ({alertsCount})
              </Button>
              <Button
                size="small"
                variant={activeTab === 'completed' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('completed')}
              >
                Completed ({completedCount})
              </Button>
            </div>

            {/* Type Filters using StatusPill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: '#7F8FA4',
                }}
              >
                Filter by:
              </span>
              <button
                onClick={() => toggleTypeFilter('critical')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeTypeFilters.includes('critical') ? 1 : 0.4,
                  transition: 'opacity 150ms ease',
                }}
              >
                <StatusPill variant="error" label="Critical" />
              </button>
              <button
                onClick={() => toggleTypeFilter('warning')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeTypeFilters.includes('warning') ? 1 : 0.4,
                  transition: 'opacity 150ms ease',
                }}
              >
                <StatusPill variant="warning" label="Warning" />
              </button>
              <button
                onClick={() => toggleTypeFilter('completed')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeTypeFilters.includes('completed') ? 1 : 0.4,
                  transition: 'opacity 150ms ease',
                }}
              >
                <StatusPill variant="good" label="Completed" />
              </button>
              <button
                onClick={() => toggleTypeFilter('info')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeTypeFilters.includes('info') ? 1 : 0.4,
                  transition: 'opacity 150ms ease',
                }}
              >
                <StatusPill variant="info" label="Scheduled" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
            }}
          >
            {Object.entries(groupedNotifications).map(([day, dayNotifications]) => {
              if (dayNotifications.length === 0) return null;

              return (
                <div key={day} style={{ marginBottom: '32px' }}>
                  {/* Day Divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        color: '#7F8FA4',
                        textTransform: 'uppercase',
                      }}
                    >
                      {day}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: '0.5px',
                        backgroundColor: '#D9E0E9',
                      }}
                    />
                  </div>

                  {/* Notifications */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {dayNotifications.map((notification, index) => {
                      const { Icon, color } = getNotificationIcon(notification.type);
                      const isLastInDay = index === dayNotifications.length - 1;
                      const isLastDay = day === 'Earlier' || (day === 'Yesterday' && !groupedNotifications.Earlier.length) || (day === 'Today' && !groupedNotifications.Yesterday.length && !groupedNotifications.Earlier.length);

                      return (
                        <div
                          key={notification.id}
                          style={{
                            backgroundColor: '#FFFFFF',
                            padding: '16px 0',
                            borderBottom: (isLastInDay && isLastDay) ? 'none' : '0.5px solid #D9E0E9',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                            transition: 'all 150ms ease-in-out',
                          }}
                        >
                          {/* Icon */}
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: `${color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px',
                            }}
                          >
                            <Icon size={18} weight="regular" color={color} />
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4
                              style={{
                                fontFamily: 'DM Sans',
                                fontSize: '16px',
                                fontWeight: 600,
                                lineHeight: '24px',
                                color: '#17263D',
                                margin: '0 0 4px 0',
                              }}
                            >
                              {notification.title}
                            </h4>
                            <p
                              style={{
                                fontFamily: 'DM Sans',
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: '22px',
                                color: '#7F8FA4',
                                margin: '0 0 8px 0',
                              }}
                            >
                              {notification.description}
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'DM Sans',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  lineHeight: '20px',
                                  color: '#7F8FA4',
                                }}
                              >
                                {notification.time}
                              </span>
                              <div style={{ display: 'flex', gap: '12px' }}>
                                {notification.actionLabel && (
                                  <Button
                                    size="small"
                                    variant="primary"
                                    onClick={notification.onAction}
                                  >
                                    {notification.actionLabel}
                                  </Button>
                                )}
                                <Button
                                  size="small"
                                  variant="secondary"
                                  onClick={() => handleDismiss(notification.id)}
                                >
                                  Dismiss
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Blue Dot for Unread - aligned to the end */}
                          {notification.isUnread && (
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#007AFF',
                                flexShrink: 0,
                                marginTop: '2px',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 24px',
                  textAlign: 'center',
                }}
              >
                <Bell size={48} weight="regular" color="#C8D4EB" />
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    color: '#7F8FA4',
                    marginTop: '16px',
                  }}
                >
                  No notifications to display
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </>
    );
  }
);

NotificationsPanel.displayName = 'NotificationsPanel';
