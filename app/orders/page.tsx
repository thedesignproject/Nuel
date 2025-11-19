'use client';
// Updated warning colors to use design tokens

import { useState } from 'react';
import { MagnifyingGlass, FunnelSimple, PencilLine, House, BuildingOffice } from '@phosphor-icons/react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { SectionHeader } from '../components/SectionHeader';
import { StatusPill } from '../components/StatusPill';
import { Button } from '../components/Button';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { LAYOUT_SPACING, TYPOGRAPHY, COLORS, BORDER_RADIUS } from '../design-tokens';
import { neutral, primary, gradients } from '../../lib/design-tokens/colors';

// ============================================
// TYPE DEFINITIONS
// ============================================

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

// ============================================
// SAMPLE DATA - Based on Figma
// ============================================

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
    orderPlaced: '07/22/2025',
    deliveryDate: '10/16/2025',
    deliveryStatus: 'pending',
    deliveryUpdated: 'Updated on 10/12/25 at 2:45pm',
    creator: 'ZYNK',
    customer: 'Rivenstone Ltd.',
    customerCode: '5083',
    shipTo: 'Port Terminal',
    deliveryCity: 'Houston',
    deliveryState: 'TX',
    material: 'Diesel Blend #30',
    materialCode: 'DSL-6127',
    volume: 51.8,
    optimizedSource: 'Lakeshore Terminal',
    sourceType: 'terminal',
    status: 'FM Assigned',
    statusVariant: 'warning',
    actionLabel: 'Sent to source',
  },
  {
    orderId: '928303',
    orderPlaced: '08/01/2025',
    deliveryDate: '10/14/2025',
    deliveryStatus: 'shipped',
    deliveryUpdated: 'Updated on 10/13/25 at 9:12am',
    creator: 'SQLR',
    customer: 'Summit Industries',
    customerCode: '9374',
    shipTo: 'South Dock',
    deliveryCity: 'Charlotte',
    deliveryState: 'NC',
    material: 'Vegetable Oil',
    materialCode: 'VGT-8530',
    volume: 8.5,
    optimizedSource: 'Riverside Refinery',
    sourceType: 'plant',
    status: 'Delivered',
    statusVariant: 'good',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928304',
    orderPlaced: '08/08/2025',
    deliveryDate: '10/12/2025',
    deliveryStatus: 'delivered',
    deliveryUpdated: 'Updated on 10/11/25 at 4:30pm',
    creator: 'TRUP',
    customer: 'Atlas Corp.',
    customerCode: '1256',
    shipTo: 'North Wharf',
    deliveryCity: 'Des Moines',
    deliveryState: 'IA',
    material: 'Glycerin Refined',
    materialCode: 'GLY-3901',
    volume: 30.7,
    optimizedSource: 'Oakmont Plant',
    sourceType: 'plant',
    status: 'Pending',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928305',
    orderPlaced: '08/27/2025',
    deliveryDate: '10/09/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/08/25 at 10:15am',
    creator: 'UMT',
    customer: 'Pinnacle Ltd.',
    customerCode: '8042',
    shipTo: 'East Pier',
    deliveryCity: 'Chicago',
    deliveryState: 'IL',
    material: 'Silicone Fluid',
    materialCode: 'SIL-6701',
    volume: 9.0,
    optimizedSource: 'Highpoint Terminal',
    sourceType: 'terminal',
    status: 'Pending',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928306',
    orderPlaced: '08/01/2025',
    deliveryDate: '10/08/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/07/25 at 1:45pm',
    creator: 'HXAO',
    customer: 'Fusion Enterprises',
    customerCode: '5519',
    shipTo: 'West Dock',
    deliveryCity: 'Phoenix',
    deliveryState: 'AZ',
    material: 'Brake Fluid',
    materialCode: 'BRK-8012',
    volume: 28.1,
    optimizedSource: 'Pinnacle Refinery',
    sourceType: 'plant',
    status: 'FM Assigned',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928307',
    orderPlaced: '08/08/2025',
    deliveryDate: '10/06/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/05/25 at 3:20pm',
    creator: 'ZENV',
    customer: 'Vertex Solutions',
    customerCode: '7845',
    shipTo: 'Main Terminal',
    deliveryCity: 'Oakland',
    deliveryState: 'CA',
    material: 'Pump Oil',
    materialCode: 'PMP-4583',
    volume: 3.8,
    optimizedSource: 'Tempa, FL',
    sourceType: 'terminal',
    status: 'Pending',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928308',
    orderPlaced: '08/10/2025',
    deliveryDate: '10/06/2025',
    deliveryStatus: 'pending',
    deliveryUpdated: 'Updated on 10/04/25 at 11:50am',
    creator: 'KRGN',
    customer: 'Quantum Innovation',
    customerCode: '2390',
    shipTo: 'East Wing',
    deliveryCity: 'Sacramento',
    deliveryState: 'CA',
    material: 'Liquid Ammonia',
    materialCode: 'AMM-5704',
    volume: 4.2,
    optimizedSource: 'East Gate',
    sourceType: 'terminal',
    status: 'Pending',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
  {
    orderId: '928309',
    orderPlaced: '08/10/2025',
    deliveryDate: '10/06/2025',
    deliveryStatus: 'in-progress',
    deliveryUpdated: 'Updated on 10/03/25 at 8:30am',
    creator: 'ALZNA',
    customer: 'Nexus Technology',
    customerCode: '4176',
    shipTo: 'North Dock',
    deliveryCity: 'Kansas City',
    deliveryState: 'MO',
    material: 'Soy-Based Emulsion',
    materialCode: 'SYB-2014',
    volume: 10.3,
    optimizedSource: 'North Stage',
    sourceType: 'terminal',
    status: 'Pending',
    statusVariant: 'warning',
    actionLabel: 'Accepted',
  },
];

// ============================================
// STYLES
// ============================================

const headerCellStyle = {
  ...TYPOGRAPHY.bodySmallMedium,
  color: '#F9FAFB',
  textAlign: 'left' as const,
  padding: '20px 16px',
  whiteSpace: 'nowrap' as const,
};

const dataCellStyle = {
  ...TYPOGRAPHY.bodySmallMedium,
  fontWeight: 400,
  color: COLORS.text.primary,
  padding: '16px',
  borderBottom: `1px solid ${COLORS.border.subtle}`,
  whiteSpace: 'nowrap' as const,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

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


// ============================================
// MAIN COMPONENT
// ============================================

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

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
            mode="executive"
            variant="expanded"
            activeItem="orders"
            onNotificationsClick={() => setIsNotificationsPanelOpen(true)}
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
                title="Orders"
                subtitle="Overview delivery sources and routes for cost efficiency"
              />
            </div>

            {/* Page Content */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* Orders Table Section */}
              <div
                style={{
                  backgroundColor: neutral[0],
                  borderRadius: BORDER_RADIUS.lg,
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  width: '100%',
                }}
              >
                {/* Section Header */}
                <SectionHeader level="primary" icon="list" title="Orders" />

                {/* Search and Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    width: '100%',
                  }}
                >
                  {/* Search Input */}
                  <div
                    style={{
                      position: 'relative',
                      flex: 1,
                      maxWidth: '1024px',
                    }}
                  >
                    <MagnifyingGlass
                      size={16}
                      weight="regular"
                      color={COLORS.text.secondary}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer, product...."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        paddingLeft: '44px',
                        paddingRight: '16px',
                        ...TYPOGRAPHY.bodyExtraSmallText,
                        color: COLORS.text.secondary,
                        backgroundColor: neutral[100],
                        border: `1px solid ${neutral[400]}`,
                        borderRadius: BORDER_RADIUS.md,
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Filters Button - Icon Only */}
                  <button
                    onClick={() => {}}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #17263D',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <FunnelSimple size={16} weight="regular" color="#1339A0" />
                  </button>
                </div>

                {/* Table Container with Horizontal Scroll */}
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
                    }}
                  >
                    {/* Table Header */}
                    <thead
                      style={{
                        backgroundColor: primary[500],
                      }}
                    >
                      <tr>
                        <th style={{ ...headerCellStyle, width: '104px' }}>Order ID</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Order Placed</th>
                        <th style={{ ...headerCellStyle, width: '228px' }}>Delivery Date</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Creator</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Customer</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Ship to</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Delivery City</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Material</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Volume (Tons)</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Optimized Source</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Status</th>
                        <th style={{ ...headerCellStyle, width: '180px' }}>Actions</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {ORDERS_DATA.map((order) => (
                        <tr
                          key={order.orderId}
                          style={{
                            backgroundColor: neutral[0],
                            transition: 'background-color 150ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = neutral[50];
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = neutral[0];
                          }}
                        >
                          {/* Order ID */}
                          <td style={{ ...dataCellStyle, width: '104px' }}>{order.orderId}</td>

                          {/* Order Placed */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>{order.orderPlaced}</td>

                          {/* Delivery Date - Special Column */}
                          <td style={{ ...dataCellStyle, width: '228px', padding: '0 16px' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                paddingTop: '9px',
                                paddingBottom: '9px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  <span
                                    style={{
                                      ...TYPOGRAPHY.bodySmallMedium,
                                      color: COLORS.text.primary,
                                    }}
                                  >
                                    {order.deliveryDate}
                                  </span>
                                  <StatusPill
                                    variant={getDeliveryStatusVariant(order.deliveryStatus)}
                                    label={getDeliveryStatusLabel(order.deliveryStatus)}
                                  />
                                </div>
                                <button
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '18px',
                                    padding: '2px 12px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <PencilLine size={12} weight="regular" color={COLORS.text.secondary} />
                                </button>
                              </div>
                              <p
                                style={{
                                  fontFamily: 'DM Sans',
                                  fontSize: '12px',
                                  lineHeight: '20px',
                                  color: '#A1A1AA',
                                  margin: 0,
                                }}
                              >
                                {order.deliveryUpdated}
                              </p>
                            </div>
                          </td>

                          {/* Creator */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>{order.creator}</td>

                          {/* Customer */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                              <span>{order.customer}</span>
                              <span
                                style={{
                                  fontSize: '12px',
                                  lineHeight: '20px',
                                  color: '#A1A1AA',
                                }}
                              >
                                {order.customerCode}
                              </span>
                            </div>
                          </td>

                          {/* Ship to */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>{order.shipTo}</td>

                          {/* Delivery City */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>
                                {order.deliveryCity}, {order.deliveryState}
                              </span>
                            </div>
                          </td>

                          {/* Material */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                              <span>{order.material}</span>
                              <span
                                style={{
                                  fontSize: '12px',
                                  lineHeight: '20px',
                                  color: '#A1A1AA',
                                }}
                              >
                                {order.materialCode}
                              </span>
                            </div>
                          </td>

                          {/* Volume */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>{order.volume} Tons</td>

                          {/* Optimized Source */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {order.sourceType === 'plant' ? (
                                <House size={14} weight="regular" color="#D345F8" />
                              ) : (
                                <BuildingOffice size={14} weight="regular" color="#1C58F7" />
                              )}
                              <span
                                style={{
                                  color: order.sourceType === 'plant' ? '#D345F8' : '#1C58F7',
                                }}
                              >
                                {order.optimizedSource}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <StatusPill variant={order.statusVariant} label={order.status} />
                          </td>

                          {/* Actions */}
                          <td style={{ ...dataCellStyle, width: '180px' }}>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 8px',
                                backgroundColor: '#E8EDF2',
                                borderRadius: '8px',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'DM Sans',
                                  fontSize: '12px',
                                  lineHeight: '20px',
                                  color: '#7F8FA4',
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

                {/* Pagination - Placeholder */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      color: '#7F8FA4',
                    }}
                  >
                    Page 1 of 1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
      />

      {/* Custom Scrollbar Styles */}
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
