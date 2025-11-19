'use client';

import React, { useState } from 'react';
import { Package, MagnifyingGlass, CaretDown, CaretUp } from '@phosphor-icons/react';
import { SectionHeader } from './SectionHeader';
import { StatusPill } from './StatusPill';
import { Dropdown } from './Dropdown';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface InventoryDetailRow {
  facility: {
    name: string;
    location: string;
  };
  material: string;
  currentStock: {
    value: string;
    subtitle: string;
  };
  costPerTon: {
    value: string;
    subtitle: string;
  };
  target: {
    value: string;
    subtitle: string;
  };
  variance: {
    value: string;
    isPositive: boolean;
  };
  status: 'critical' | 'high' | 'low' | 'good';
  cause: string;
}

export interface InventoryDetailsTableProps {
  className?: string;
}

// ============================================
// SAMPLE DATA
// ============================================

const INVENTORY_DATA: InventoryDetailRow[] = [
  {
    facility: { name: 'Port Woodrowburgh Terminal', location: 'Port Woodrowburgh, GA' },
    material: 'Thio-Sul',
    currentStock: { value: '101 Tons', subtitle: '% of capacity' },
    costPerTon: { value: '$238.50', subtitle: 'Pre: $285.20' },
    target: { value: '4.33 Tons', subtitle: '48% of capacity' },
    variance: { value: '-08%', isPositive: false },
    status: 'critical',
    cause: '—',
  },
  {
    facility: { name: 'Riverstone Harbor Docks', location: 'Riverstone, NY' },
    material: 'K-Row',
    currentStock: { value: '250 Tons', subtitle: '6% of capacity' },
    costPerTon: { value: '$238.50', subtitle: 'Pre: $285.20' },
    target: { value: '2,500 Tons', subtitle: '25% of capacity' },
    variance: { value: '+20%', isPositive: true },
    status: 'high',
    cause: '—',
  },
  {
    facility: { name: 'Cedar Valley Port', location: 'Cedar Valley, CA' },
    material: 'KTS',
    currentStock: { value: '500', subtitle: '50% of capacity' },
    costPerTon: { value: '$238.50', subtitle: 'Pre: $285.20' },
    target: { value: '4,000 Tons', subtitle: '40% of capacity' },
    variance: { value: '-60%', isPositive: false },
    status: 'low',
    cause: '—',
  },
  {
    facility: { name: 'Lakeside Distribution Center', location: 'Lakeside, IL' },
    material: 'NTS',
    currentStock: { value: '1,200 Tons', subtitle: '15% of capacity' },
    costPerTon: { value: '$238.50', subtitle: 'Pre: $285.20' },
    target: { value: '8,000 Tons', subtitle: '90% of capacity' },
    variance: { value: '+20%', isPositive: true },
    status: 'high',
    cause: '—',
  },
  {
    facility: { name: 'Mountain View Warehouse', location: 'Mountain View, CA' },
    material: 'CropMax',
    currentStock: { value: '900 Tons', subtitle: '25% of capacity' },
    costPerTon: { value: '$238.50', subtitle: 'Pre: $285.20' },
    target: { value: '3,600 Tons', subtitle: '75% of capacity' },
    variance: { value: '-98%', isPositive: false },
    status: 'critical',
    cause: '—',
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export const InventoryDetailsTable = React.forwardRef<HTMLDivElement, InventoryDetailsTableProps>(
  ({ className }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsFilter, setItemsFilter] = useState('All Items');
    const [statusFilter, setStatusFilter] = useState('All statuses');
    const [typesFilter, setTypesFilter] = useState('All types');
    const [currentPage, setCurrentPage] = useState(1);

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
          icon={<Package size={24} weight="regular" color="#1C58F7" />}
          title="Inventory Details"
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
              width: '600px',
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
              value={itemsFilter}
              options={[
                { value: 'All Items', label: 'All Items' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
              onChange={setItemsFilter}
              variant="secondary"
              width="130px"
            />
            <Dropdown
              value={statusFilter}
              options={[
                { value: 'All statuses', label: 'All statuses' },
                { value: 'Critical', label: 'Critical' },
                { value: 'High', label: 'High' },
                { value: 'Low', label: 'Low' },
              ]}
              onChange={setStatusFilter}
              variant="secondary"
              width="150px"
            />
            <Dropdown
              value={typesFilter}
              options={[
                { value: 'All types', label: 'All types' },
                { value: 'Type 1', label: 'Type 1' },
                { value: 'Type 2', label: 'Type 2' },
              ]}
              onChange={setTypesFilter}
              variant="secondary"
              width="130px"
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
          className="inventory-table-scroll"
        >
          <table
            style={{
              width: '1182px', // Fixed width from Figma
              minWidth: '1182px',
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
                <th style={headerCellStyle}>Facility</th>
                <th style={headerCellStyle}>Material</th>
                <th style={headerCellStyle}>Current Stock</th>
                <th style={headerCellStyle}>Cost/Ton</th>
                <th style={headerCellStyle}>Target</th>
                <th style={headerCellStyle}>Variance</th>
                <th style={headerCellStyle}>Status</th>
                <th style={{ ...headerCellStyle, width: '1px', padding: 0 }}></th>
                <th style={headerCellStyle}>Cause</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {INVENTORY_DATA.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < INVENTORY_DATA.length - 1 ? '1px solid #D9E0E9' : 'none',
                  }}
                >
                  {/* Facility */}
                  <td style={bodyCellStyle}>
                    <div>
                      <div
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: '22px',
                          color: '#17263D',
                        }}
                      >
                        {row.facility.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '20px',
                          color: '#7F8FA4',
                        }}
                      >
                        {row.facility.location}
                      </div>
                    </div>
                  </td>

                  {/* Material */}
                  <td style={bodyCellStyle}>
                    <div style={mainTextStyle}>{row.material}</div>
                  </td>

                  {/* Current Stock */}
                  <td style={bodyCellStyle}>
                    <div>
                      <div style={mainTextStyle}>{row.currentStock.value}</div>
                      <div style={subtextStyle}>{row.currentStock.subtitle}</div>
                    </div>
                  </td>

                  {/* Cost/Ton */}
                  <td style={bodyCellStyle}>
                    <div>
                      <div style={mainTextStyle}>{row.costPerTon.value}</div>
                      <div style={subtextStyle}>{row.costPerTon.subtitle}</div>
                    </div>
                  </td>

                  {/* Target */}
                  <td style={bodyCellStyle}>
                    <div>
                      <div style={mainTextStyle}>{row.target.value}</div>
                      <div style={subtextStyle}>{row.target.subtitle}</div>
                    </div>
                  </td>

                  {/* Variance */}
                  <td style={bodyCellStyle}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: row.variance.isPositive ? '#007AFF' : '#FF3B30',
                      }}
                    >
                      {row.variance.isPositive ? (
                        <CaretUp size={16} weight="bold" />
                      ) : (
                        <CaretDown size={16} weight="bold" />
                      )}
                      <span style={mainTextStyle}>{row.variance.value}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={bodyCellStyle}>
                    <StatusPill
                      variant={row.status === 'high' ? 'info' : row.status === 'low' ? 'warning' : row.status}
                      label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    />
                  </td>

                  {/* Separator */}
                  <td style={{ width: '1px', padding: 0 }}></td>

                  {/* Cause */}
                  <td style={bodyCellStyle}>
                    <div style={mainTextStyle}>{row.cause}</div>
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
          .inventory-table-scroll::-webkit-scrollbar {
            height: 8px;
          }

          .inventory-table-scroll::-webkit-scrollbar-track {
            background: #F3F6F9;
            border-radius: 4px;
          }

          .inventory-table-scroll::-webkit-scrollbar-thumb {
            background: #C3CDD9;
            border-radius: 4px;
          }

          .inventory-table-scroll::-webkit-scrollbar-thumb:hover {
            background: #7F8FA4;
          }
        `}</style>
      </div>
    );
  }
);

InventoryDetailsTable.displayName = 'InventoryDetailsTable';

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
  width: '140px',
  whiteSpace: 'nowrap',
};

const bodyCellStyle: React.CSSProperties = {
  padding: '16px',
  verticalAlign: 'top',
  width: '140px',
};

const mainTextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#17263D',
};

const subtextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '20px',
  color: '#7F8FA4',
};
