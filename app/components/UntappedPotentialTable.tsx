'use client';

import React, { useState } from 'react';
import { FileText, MagnifyingGlass } from '@phosphor-icons/react';
import { SectionHeader } from './SectionHeader';
import { StatusPill } from './StatusPill';
import { Dropdown } from './Dropdown';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface UntappedPotentialRow {
  orderId: string;
  date: string;
  region: string;
  manager: string;
  optimizationType: string;
  missedSavings: string;
  reasonCategory: string;
  priority: 'high' | 'medium' | 'low';
  status: 'justified' | 'under-review' | 'needs-review';
}

export interface UntappedPotentialTableProps {
  className?: string;
}

// ============================================
// SAMPLE DATA
// ============================================

const UNTAPPED_POTENTIAL_DATA: UntappedPotentialRow[] = [
  {
    orderId: 'MO-2024-001',
    date: '12/14/2025',
    region: 'Northeast',
    manager: 'Sarah Johnson',
    optimizationType: 'Route Optimization',
    missedSavings: '$8,500',
    reasonCategory: 'Capacity Constraints',
    priority: 'high',
    status: 'justified',
  },
  {
    orderId: 'MO-2024-002',
    date: '12/11/2025',
    region: 'Midwest',
    manager: 'Mike Chen',
    optimizationType: 'Carrier Selection',
    missedSavings: '$3,200',
    reasonCategory: 'Risk Management',
    priority: 'medium',
    status: 'justified',
  },
  {
    orderId: 'MO-2024-003',
    date: '12/9/2025',
    region: 'Southeast',
    manager: 'Lisa Rodriguez',
    optimizationType: 'Inventory Positioning',
    missedSavings: '$12,000',
    reasonCategory: 'Operational Concerns',
    priority: 'low',
    status: 'under-review',
  },
  {
    orderId: 'MO-2024-004',
    date: '12/7/2025',
    region: 'West',
    manager: 'David Park',
    optimizationType: 'Mode Optimization',
    missedSavings: '$5,800',
    reasonCategory: 'Service Requirements',
    priority: 'medium',
    status: 'justified',
  },
  {
    orderId: 'MO-2024-005',
    date: '12/4/2025',
    region: 'Northeast',
    manager: 'Sarah Johnson',
    optimizationType: 'Route Optimization',
    missedSavings: '$4,200',
    reasonCategory: 'Timeline Issues',
    priority: 'medium',
    status: 'justified',
  },
  {
    orderId: 'MO-2024-006',
    date: '12/2/2025',
    region: 'Midwest',
    manager: 'Mike Chen',
    optimizationType: 'Carrier Selection',
    missedSavings: '$1,800',
    reasonCategory: 'Risk Management',
    priority: 'low',
    status: 'justified',
  },
  {
    orderId: 'MO-2024-007',
    date: '11/30/2025',
    region: 'Southeast',
    manager: 'Lisa Rodriguez',
    optimizationType: 'Inventory Positioning',
    missedSavings: '$9,500',
    reasonCategory: 'Budget Constraints',
    priority: 'high',
    status: 'needs-review',
  },
  {
    orderId: 'MO-2024-008',
    date: '11/27/2025',
    region: 'West',
    manager: 'David Park',
    optimizationType: 'Mode Optimization',
    missedSavings: '$7,200',
    reasonCategory: 'Service Requirements',
    priority: 'high',
    status: 'justified',
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export const UntappedPotentialTable = React.forwardRef<HTMLDivElement, UntappedPotentialTableProps>(
  ({ className }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('All regions');
    const [managerFilter, setManagerFilter] = useState('All managers');
    const [categoryFilter, setCategoryFilter] = useState('All categories');
    const [priorityFilter, setPriorityFilter] = useState('All priorities');
    const [statusFilter, setStatusFilter] = useState('All status');
    const [currentPage, setCurrentPage] = useState(1);

    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'justified':
          return 'good';
        case 'under-review':
          return 'info';
        case 'needs-review':
          return 'error';
        default:
          return 'neutral';
      }
    };

    const getPriorityVariant = (priority: string) => {
      switch (priority) {
        case 'high':
          return 'error';
        case 'medium':
          return 'warning';
        case 'low':
          return 'good';
        default:
          return 'neutral';
      }
    };

    const getStatusLabel = (status: string) => {
      switch (status) {
        case 'justified':
          return 'Justified';
        case 'under-review':
          return 'Under review';
        case 'needs-review':
          return 'Needs Review';
        default:
          return status;
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
        }}
      >
        {/* Section Header */}
        <SectionHeader
          level="primary"
          icon={<FileText size={24} weight="regular" color="#1C58F7" />}
          title="Untapped Potential"
          description="Detailed log of optimization opportunities with manager responses and reasoning"
        />

        {/* Search and Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            width: '100%',
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              width: '320px',
              maxWidth: '100%',
            }}
          >
            <MagnifyingGlass
              size={20}
              weight="regular"
              color="#7F8FA4"
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
              placeholder="Search orders by ID, customer, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '48px',
                paddingRight: '16px',
                fontFamily: 'DM Sans',
                fontSize: '14px',
                lineHeight: '22px',
                color: '#17263D',
                backgroundColor: '#F3F6F9',
                border: '1px solid #C3CDD9',
                borderRadius: '12px',
                outline: 'none',
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Dropdown
              value={regionFilter}
              options={[
                { value: 'All regions', label: 'All regions' },
                { value: 'Northeast', label: 'Northeast' },
                { value: 'Midwest', label: 'Midwest' },
                { value: 'Southeast', label: 'Southeast' },
                { value: 'West', label: 'West' },
              ]}
              onChange={setRegionFilter}
              variant="secondary"
              width="145px"
            />
            <Dropdown
              value={managerFilter}
              options={[
                { value: 'All managers', label: 'All managers' },
                { value: 'Sarah Johnson', label: 'Sarah Johnson' },
                { value: 'Mike Chen', label: 'Mike Chen' },
                { value: 'Lisa Rodriguez', label: 'Lisa Rodriguez' },
                { value: 'David Park', label: 'David Park' },
              ]}
              onChange={setManagerFilter}
              variant="secondary"
              width="160px"
            />
            <Dropdown
              value={categoryFilter}
              options={[
                { value: 'All categories', label: 'All categories' },
                { value: 'Capacity Constraints', label: 'Capacity Constraints' },
                { value: 'Risk Management', label: 'Risk Management' },
                { value: 'Operational Concerns', label: 'Operational Concerns' },
              ]}
              onChange={setCategoryFilter}
              variant="secondary"
              width="165px"
            />
            <Dropdown
              value={priorityFilter}
              options={[
                { value: 'All priorities', label: 'All priorities' },
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
              onChange={setPriorityFilter}
              variant="secondary"
              width="150px"
            />
            <Dropdown
              value={statusFilter}
              options={[
                { value: 'All status', label: 'All status' },
                { value: 'Justified', label: 'Justified' },
                { value: 'Under review', label: 'Under review' },
                { value: 'Needs Review', label: 'Needs Review' },
              ]}
              onChange={setStatusFilter}
              variant="secondary"
              width="135px"
            />
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'visible',
            borderRadius: '12px',
            border: '1px solid #D9E0E9',
          }}
          className="untapped-potential-table-scroll"
        >
          <table
            style={{
              width: '1650px',
              minWidth: '1650px',
              borderCollapse: 'collapse',
            }}
          >
            {/* Table Header */}
            <thead
              style={{
                backgroundColor: '#17263D',
              }}
            >
              <tr>
                <th style={{ ...headerCellStyle, width: '126px' }}>Order ID</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Date</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Region</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Manager</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Optimization Type</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Missed Savings</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Reason Category</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Priority</th>
                <th style={{ ...headerCellStyle, width: '180px' }}>Status</th>
                <th style={{ ...headerCellStyle, width: '84px' }}>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {UNTAPPED_POTENTIAL_DATA.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < UNTAPPED_POTENTIAL_DATA.length - 1 ? '1px solid #D9E0E9' : 'none',
                  }}
                >
                  {/* Order ID */}
                  <td style={{ ...bodyCellStyle, width: '126px' }}>
                    <div style={mainTextStyle}>{row.orderId}</div>
                  </td>

                  {/* Date */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.date}</div>
                  </td>

                  {/* Region */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.region}</div>
                  </td>

                  {/* Manager */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.manager}</div>
                  </td>

                  {/* Optimization Type */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.optimizationType}</div>
                  </td>

                  {/* Missed Savings */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.missedSavings}</div>
                  </td>

                  {/* Reason Category */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <div style={mainTextStyle}>{row.reasonCategory}</div>
                  </td>

                  {/* Priority */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <StatusPill
                      variant={getPriorityVariant(row.priority)}
                      label={row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
                    />
                  </td>

                  {/* Status */}
                  <td style={{ ...bodyCellStyle, width: '180px' }}>
                    <StatusPill
                      variant={getStatusVariant(row.status)}
                      label={getStatusLabel(row.status)}
                    />
                  </td>

                  {/* Actions */}
                  <td style={{ ...bodyCellStyle, width: '84px', textAlign: 'center' }}>
                    <button
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#7F8FA4',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                      }}
                    >
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
          }}
        >
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              fontWeight: 500,
              color: currentPage === 1 ? '#C3CDD9' : '#7F8FA4',
              background: 'none',
              border: 'none',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              padding: '8px 12px',
            }}
          >
            Previous
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 500,
                color: currentPage === page ? '#1C58F7' : '#7F8FA4',
                background: currentPage === page ? '#EAF1FF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '8px',
                minWidth: '36px',
              }}
            >
              {page}
            </button>
          ))}

          <span
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              color: '#7F8FA4',
              padding: '8px 4px',
            }}
          >
            ...
          </span>

          {[65, 66].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 500,
                color: currentPage === page ? '#1C58F7' : '#7F8FA4',
                background: currentPage === page ? '#EAF1FF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '8px',
                minWidth: '36px',
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(66, currentPage + 1))}
            disabled={currentPage === 66}
            style={{
              fontFamily: 'DM Sans',
              fontSize: '14px',
              fontWeight: 500,
              color: currentPage === 66 ? '#C3CDD9' : '#7F8FA4',
              background: 'none',
              border: 'none',
              cursor: currentPage === 66 ? 'not-allowed' : 'pointer',
              padding: '8px 12px',
            }}
          >
            Next
          </button>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .untapped-potential-table-scroll::-webkit-scrollbar {
            height: 8px;
          }

          .untapped-potential-table-scroll::-webkit-scrollbar-track {
            background: #F3F6F9;
            border-radius: 4px;
          }

          .untapped-potential-table-scroll::-webkit-scrollbar-thumb {
            background: #C3CDD9;
            border-radius: 4px;
          }

          .untapped-potential-table-scroll::-webkit-scrollbar-thumb:hover {
            background: #7F8FA4;
          }
        `}</style>
      </div>
    );
  }
);

UntappedPotentialTable.displayName = 'UntappedPotentialTable';

// ============================================
// STYLES
// ============================================

const headerCellStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '22px',
  color: '#F9FAFB',
  textAlign: 'left',
  padding: '20px 16px',
  whiteSpace: 'nowrap',
};

const bodyCellStyle: React.CSSProperties = {
  padding: '16px',
  verticalAlign: 'middle',
};

const mainTextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#17263D',
};
