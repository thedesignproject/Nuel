'use client';

import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { Sidebar } from '../../components/Sidebar';
import { SectionHeader } from '../../components/SectionHeader';
import { Button } from '../../components/Button';
import { StatusPill } from '../../components/StatusPill';
import { NotificationsPanel } from '../../components/NotificationsPanel';
import { ActivityAlertWidget } from '../../components/ActivityAlertWidget';
import { useAuth } from '../../context/AuthContext';
import { LAYOUT_SPACING, TYPOGRAPHY, COLORS, BORDER_RADIUS } from '../../design-tokens';
import { neutral, primary, gradients } from '../../../lib/design-tokens/colors';
import { MagnifyingGlass, FunnelSimple, PencilLine, House, BuildingOffice } from '@phosphor-icons/react';

export interface OrderRow {
  orderId: string;
  orderPlaced: string;
  deliveryDate: string;
  deliveryStatus: 'pending' | 'shipped' | 'delivered' | 'in-progress';
  deliveryUpdated: string;
  creator: string;
  customer: string;
  customerCode: string;
  shipTo: string;
  deliveryCity: string;
  deliveryState: string;
  material: string;
  materialCode: string;
  volume: number;
  optimizedSource: string;
  sourceType: 'plant' | 'terminal';
  status: string;
  statusVariant: 'info' | 'warning' | 'good' | 'error' | 'neutral';
  actionLabel: string;
}

// Sample orders data matching Figma specifications with logical dates
const ORDERS_DATA: OrderRow[] = [
  {
    orderId: '928301',
    orderPlaced: '07/08/2025',
    deliveryDate: '10/19/2025',
    deliveryStatus: 'pending',
    deliveryUpdated: 'Updated on 10/10/25 at 11:23am',
    creator: 'LYOS',
    customer: 'Northfield Co.',
    customerCode: '20581',
    shipTo: 'Harbor Terminal',
    deliveryCity: 'Columbus',
    deliveryState: 'OH',
    material: 'Ethylene Glycol',
    materialCode: 'LQD-3489',
    volume: 32.3,
    optimizedSource: 'Westfield Plant',
    sourceType: 'plant',
    status: 'Sent to source',
    statusVariant: 'info',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928302',
    orderPlaced: '07/09/2025',
    deliveryDate: '10/20/2025',
    deliveryStatus: 'shipped',
    deliveryUpdated: 'Updated on 10/11/25 at 09:15am',
    creator: 'NUEL',
    customer: 'Westfield Co.',
    customerCode: '20582',
    shipTo: 'Lakeside Terminal',
    deliveryCity: 'Cincinnati',
    deliveryState: 'OH',
    material: 'Urea Ammonium Nitrate',
    materialCode: 'FRT-2341',
    volume: 45.7,
    optimizedSource: 'Harbor Terminal',
    sourceType: 'terminal',
    status: 'In transit',
    statusVariant: 'warning',
    actionLabel: 'Pending',
  },
  {
    orderId: '928303',
    orderPlaced: '07/10/2025',
    deliveryDate: '10/21/2025',
    deliveryStatus: 'delivered',
    deliveryUpdated: 'Updated on 10/12/25 at 02:30pm',
    creator: 'LYOS',
    customer: 'Harbor Agri Inc.',
    customerCode: '20583',
    shipTo: 'Westfield Plant',
    deliveryCity: 'Cleveland',
    deliveryState: 'OH',
    material: 'Liquid Nitrogen',
    materialCode: 'LQD-1156',
    volume: 28.9,
    optimizedSource: 'Northfield Terminal',
    sourceType: 'terminal',
    status: 'Completed',
    statusVariant: 'good',
    actionLabel: 'Delivered',
  },
  {
    orderId: '928304',
    orderPlaced: '07/11/2025',
    deliveryDate: '10/22/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/13/25 at 04:45pm',
    creator: 'NUEL',
    customer: 'Lakeside Farms',
    customerCode: '20584',
    shipTo: 'Northfield Terminal',
    deliveryCity: 'Toledo',
    deliveryState: 'OH',
    material: 'Potassium Sulfate',
    materialCode: 'FRT-7823',
    volume: 51.2,
    optimizedSource: 'Harbor Plant',
    sourceType: 'plant',
    status: 'Processing',
    statusVariant: 'warning',
    actionLabel: 'In Progress',
  },
  {
    orderId: '928305',
    orderPlaced: '07/12/2025',
    deliveryDate: '10/23/2025',
    deliveryStatus: 'pending',
    deliveryUpdated: 'Updated on 10/14/25 at 08:00am',
    creator: 'LYOS',
    customer: 'Eastfield Corp.',
    customerCode: '20585',
    shipTo: 'Southside Terminal',
    deliveryCity: 'Akron',
    deliveryState: 'OH',
    material: 'Ammonium Phosphate',
    materialCode: 'FRT-5674',
    volume: 38.6,
    optimizedSource: 'Lakeside Plant',
    sourceType: 'plant',
    status: 'Awaiting confirmation',
    statusVariant: 'neutral',
    actionLabel: 'Pending',
  },
  {
    orderId: '928306',
    orderPlaced: '07/13/2025',
    deliveryDate: '10/24/2025',
    deliveryStatus: 'shipped',
    deliveryUpdated: 'Updated on 10/15/25 at 10:20am',
    creator: 'NUEL',
    customer: 'Southside Agro',
    customerCode: '20586',
    shipTo: 'Eastfield Terminal',
    deliveryCity: 'Dayton',
    deliveryState: 'OH',
    material: 'Calcium Nitrate',
    materialCode: 'LQD-8912',
    volume: 42.1,
    optimizedSource: 'Westfield Terminal',
    sourceType: 'terminal',
    status: 'In transit',
    statusVariant: 'warning',
    actionLabel: 'Shipped',
  },
  {
    orderId: '928307',
    orderPlaced: '07/14/2025',
    deliveryDate: '10/25/2025',
    deliveryStatus: 'pending',
    deliveryUpdated: 'Updated on 10/16/25 at 03:10pm',
    creator: 'LYOS',
    customer: 'Riverside Farms',
    customerCode: '20587',
    shipTo: 'Central Terminal',
    deliveryCity: 'Canton',
    deliveryState: 'OH',
    material: 'Magnesium Sulfate',
    materialCode: 'FRT-4501',
    volume: 35.4,
    optimizedSource: 'Harbor Plant',
    sourceType: 'plant',
    status: 'Sent to source',
    statusVariant: 'info',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928308',
    orderPlaced: '07/15/2025',
    deliveryDate: '10/26/2025',
    deliveryStatus: 'delivered',
    deliveryUpdated: 'Updated on 10/17/25 at 11:55am',
    creator: 'NUEL',
    customer: 'Central Agri LLC',
    customerCode: '20588',
    shipTo: 'Riverside Terminal',
    deliveryCity: 'Youngstown',
    deliveryState: 'OH',
    material: 'Triple Superphosphate',
    materialCode: 'FRT-6789',
    volume: 48.3,
    optimizedSource: 'Northfield Plant',
    sourceType: 'plant',
    status: 'Completed',
    statusVariant: 'good',
    actionLabel: 'Delivered',
  },
  {
    orderId: '928309',
    orderPlaced: '07/16/2025',
    deliveryDate: '10/27/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/18/25 at 01:40pm',
    creator: 'LYOS',
    customer: 'Northside Growers',
    customerCode: '20589',
    shipTo: 'Westfield Terminal',
    deliveryCity: 'Lorain',
    deliveryState: 'OH',
    material: 'Monoammonium Phosphate',
    materialCode: 'FRT-3267',
    volume: 44.8,
    optimizedSource: 'Eastfield Plant',
    sourceType: 'plant',
    status: 'Processing',
    statusVariant: 'warning',
    actionLabel: 'In Progress',
  },
];

export default function ManagementOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const { logout } = useAuth();

  // Filter orders based on search query
  const filteredOrders = ORDERS_DATA.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.material.toLowerCase().includes(query) ||
      order.optimizedSource.toLowerCase().includes(query) ||
      order.shipTo.toLowerCase().includes(query)
    );
  });

  // Table header and cell styling using design tokens
  const headerCellStyle = {
    ...TYPOGRAPHY.bodySmallMedium,
    color: '#F9FAFB',
    textAlign: 'left' as const,
    padding: '20px 16px',
    whiteSpace: 'nowrap' as const,
  };

  const cellStyle = {
    ...TYPOGRAPHY.bodySmallMedium,
    fontWeight: 400,
    color: COLORS.text.primary,
    padding: '16px',
    borderBottom: `1px solid ${COLORS.border.subtle}`,
  };

  // Helper to map delivery status to StatusPill variant
  const getDeliveryStatusVariant = (status: OrderRow['deliveryStatus']): 'good' | 'warning' | 'info' | 'neutral' => {
    switch (status) {
      case 'delivered':
        return 'good';
      case 'shipped':
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'neutral';
    }
  };

  // Helper to format delivery status label
  const getDeliveryStatusLabel = (status: OrderRow['deliveryStatus']): string => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#E8F3FF]">
      {/* Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(/Grid.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar - Sticky */}
        <div className="h-screen sticky top-0 z-30" style={{ padding: LAYOUT_SPACING.pageEdge }}>
          <Sidebar
            mode="management"
            variant="expanded"
            activeItem="orders"
            onNotificationsClick={() => setIsNotificationsPanelOpen(true)}
            onLogout={logout}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Content Wrapper with shared padding */}
          <div
            className="flex-1 flex flex-col min-w-0 overflow-y-auto"
            style={{
              paddingLeft: LAYOUT_SPACING.contentEdge,
              paddingRight: LAYOUT_SPACING.pageEdge,
              paddingTop: LAYOUT_SPACING.pageEdge,
              paddingBottom: LAYOUT_SPACING.pageEdge,
            }}
          >
            {/* Top Nav - Sticky with glass effect */}
            <div className="sticky top-0 z-20" style={{ marginBottom: LAYOUT_SPACING.contentTopGap }}>
              <TopBar
                title="Orders Management"
                subtitle="View, track, and manage all fertilizer orders with complete delivery tracking and source optimization"
              />
            </div>

            {/* Page Content */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* Alert Widget */}
              <ActivityAlertWidget />

              {/* Orders Section */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {/* Section Header */}
                <SectionHeader icon="list" title="Orders" />

                {/* Search and Filter Row */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  {/* Search Input */}
                  <div style={{ position: 'relative', width: '1024px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: COLORS.text.secondary,
                      }}
                    >
                      <MagnifyingGlass size={16} weight="regular" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer, product..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        paddingLeft: '48px',
                        paddingRight: '16px',
                        ...TYPOGRAPHY.bodySmallMedium,
                        fontWeight: 400,
                        color: COLORS.text.primary,
                        backgroundColor: neutral[100],
                        border: `1px solid ${neutral[400]}`,
                        borderRadius: BORDER_RADIUS.md,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Filter Button - Icon Only */}
                  <button
                    onClick={() => {}}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #17263D',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <FunnelSimple size={20} weight="regular" color="#1339A0" />
                  </button>
                </div>

                {/* Orders Table with Horizontal Scroll */}
                <div
                  style={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'visible',
                    borderRadius: '12px',
                  }}
                  className="orders-table-scroll"
                >
                  <table
                    style={{
                      width: '2132px',
                      minWidth: '2132px',
                      borderCollapse: 'collapse',
                      backgroundColor: neutral[0],
                    }}
                  >
                    <thead
                      style={{
                        backgroundColor: primary[500],
                      }}
                    >
                      <tr>
                        <th style={{ ...headerCellStyle, width: '104px' }}>Order ID</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Order Placed</th>
                        <th style={{ ...headerCellStyle, width: '228px' }}>Delivery Date</th>
                        <th style={{ ...headerCellStyle, width: '100px' }}>Creator</th>
                        <th style={{ ...headerCellStyle, width: '168px' }}>Customer</th>
                        <th style={{ ...headerCellStyle, width: '160px' }}>Ship To</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Delivery Location</th>
                        <th style={{ ...headerCellStyle, width: '200px' }}>Material</th>
                        <th style={{ ...headerCellStyle, width: '132px' }}>Volume (tons)</th>
                        <th style={{ ...headerCellStyle, width: '200px' }}>Optimized Source</th>
                        <th style={{ ...headerCellStyle, width: '200px' }}>Status</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.orderId}
                          style={{
                            backgroundColor: neutral[0],
                            transition: 'background-color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = neutral[50];
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = neutral[0];
                          }}
                        >
                          {/* Order ID */}
                          <td style={cellStyle}>
                            <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{order.orderId}</span>
                          </td>

                          {/* Order Placed */}
                          <td style={cellStyle}>
                            <span>{order.orderPlaced}</span>
                          </td>

                          {/* Delivery Date with Status and Edit */}
                          <td style={cellStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{order.deliveryDate}</span>
                                <StatusPill
                                  variant={getDeliveryStatusVariant(order.deliveryStatus)}
                                  label={getDeliveryStatusLabel(order.deliveryStatus)}
                                />
                                <button
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: COLORS.text.secondary,
                                  }}
                                >
                                  <PencilLine size={14} weight="regular" />
                                </button>
                              </div>
                              <span
                                style={{
                                  ...TYPOGRAPHY.bodyExtraSmallText,
                                  color: COLORS.text.secondary,
                                }}
                              >
                                {order.deliveryUpdated}
                              </span>
                            </div>
                          </td>

                          {/* Creator */}
                          <td style={cellStyle}>
                            <span>{order.creator}</span>
                          </td>

                          {/* Customer */}
                          <td style={cellStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{order.customer}</span>
                              <span style={{ ...TYPOGRAPHY.bodyExtraSmallText, color: COLORS.text.secondary }}>{order.customerCode}</span>
                            </div>
                          </td>

                          {/* Ship To */}
                          <td style={cellStyle}>
                            <span>{order.shipTo}</span>
                          </td>

                          {/* Delivery Location */}
                          <td style={cellStyle}>
                            <span>
                              {order.deliveryCity}, {order.deliveryState}
                            </span>
                          </td>

                          {/* Material */}
                          <td style={cellStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{order.material}</span>
                              <span style={{ ...TYPOGRAPHY.bodyExtraSmallText, color: COLORS.text.secondary }}>{order.materialCode}</span>
                            </div>
                          </td>

                          {/* Volume */}
                          <td style={cellStyle}>
                            <span style={{ fontWeight: 500, color: COLORS.text.primary }}>{order.volume.toFixed(1)}</span>
                          </td>

                          {/* Optimized Source */}
                          <td style={cellStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: order.sourceType === 'plant' ? '#0E9F6E' : '#3F83F8',
                                }}
                              >
                                {order.sourceType === 'plant' ? (
                                  <House size={16} weight="regular" />
                                ) : (
                                  <BuildingOffice size={16} weight="regular" />
                                )}
                              </div>
                              <span>{order.optimizedSource}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td style={cellStyle}>
                            <StatusPill variant={order.statusVariant} label={order.status} />
                          </td>

                          {/* Actions */}
                          <td style={cellStyle}>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4px 12px',
                                backgroundColor: neutral[100],
                                borderRadius: BORDER_RADIUS.sm,
                              }}
                            >
                              <span
                                style={{
                                  ...TYPOGRAPHY.bodyExtraSmallMedium,
                                  color: COLORS.text.primary,
                                }}
                              >
                                {order.actionLabel}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results Summary */}
                {searchQuery && (
                  <div
                    style={{
                      ...TYPOGRAPHY.bodySmallMedium,
                      fontWeight: 400,
                      color: COLORS.text.secondary,
                      textAlign: 'center',
                    }}
                  >
                    Showing {filteredOrders.length} of {ORDERS_DATA.length} orders
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .orders-table-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .orders-table-scroll::-webkit-scrollbar-track {
          background: ${neutral[100]};
          border-radius: 4px;
        }
        .orders-table-scroll::-webkit-scrollbar-thumb {
          background: ${neutral[400]};
          border-radius: 4px;
        }
        .orders-table-scroll::-webkit-scrollbar-thumb:hover {
          background: ${neutral[500]};
        }
      `}</style>
    </div>
  );
}
