'use client';

import React, { useState, useMemo } from 'react';
import { MagnifyingGlass, CaretUp, CaretDown, Buildings, TrainSimple, ArrowSquareOut, Check } from '@phosphor-icons/react';
import { StatusPill } from './StatusPill';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface RegionalData {
  location: string;
  plants: number;
  terminals: number;
  volume: number;
  costPerTon: number;
  costPerTonPre: number;
  currentCost: number;
  currentCostPre: number;
  preNuel: number;
  executionRate: number;
  untappedPotential: number;
  alerts: number;
  status: 'good' | 'warning' | 'excellent';
}

type SortDirection = 'asc' | 'desc' | null;
type SortableColumn = 'volume' | 'costPerTon' | 'currentCost' | 'preNuel' | 'executionRate' | 'untappedPotential' | 'alerts' | 'status';

export interface RegionalPerformanceTableProps {
  /** Table data */
  data: RegionalData[];

  /** Additional className */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

const formatCurrency = (num: number): string => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
};

const formatCostPerTon = (num: number): string => {
  return `$${num.toFixed(2)}`;
};

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * RegionalPerformanceTable Component
 * Searchable and sortable table showing regional performance metrics
 * Exact specifications from Figma
 */
export const RegionalPerformanceTable = React.forwardRef<HTMLDivElement, RegionalPerformanceTableProps>(
  ({ data, className }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // Filter data based on search query
    const filteredData = useMemo(() => {
      if (!searchQuery.trim()) return data;

      const query = searchQuery.toLowerCase();
      return data.filter(row =>
        row.location.toLowerCase().includes(query)
      );
    }, [data, searchQuery]);

    // Sort data
    const sortedData = useMemo(() => {
      if (!sortColumn || !sortDirection) return filteredData;

      return [...filteredData].sort((a, b) => {
        let aValue: any = a[sortColumn];
        let bValue: any = b[sortColumn];

        // Handle status sorting
        if (sortColumn === 'status') {
          const statusOrder = { excellent: 3, good: 2, warning: 1 };
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
        }

        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }, [filteredData, sortColumn, sortDirection]);

    // Handle column header click
    const handleSort = (column: SortableColumn) => {
      if (sortColumn === column) {
        // Toggle direction or clear sort
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          setSortColumn(null);
          setSortDirection(null);
        }
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    // Render sort indicator
    const renderSortIndicator = (column: SortableColumn) => {
      const isActive = sortColumn === column;
      const isAsc = isActive && sortDirection === 'asc';
      const isDesc = isActive && sortDirection === 'desc';

      return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
          <CaretUp
            size={10}
            weight="fill"
            color={isAsc ? '#1C58F7' : '#7F8FA4'}
            style={{ marginBottom: '-2px' }}
          />
          <CaretDown
            size={10}
            weight="fill"
            color={isDesc ? '#1C58F7' : '#7F8FA4'}
          />
        </div>
      );
    };

    return (
      <div ref={ref} className={className} style={{ width: '100%' }}>
        {/* Search Bar */}
        <div
          style={{
            marginBottom: SPACING[16],
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <MagnifyingGlass size={20} weight="regular" color={COLORS.text.secondary} />
          </div>
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '44px',
              paddingRight: '16px',
              backgroundColor: '#F3F6F9',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'DM Sans',
              fontSize: '14px',
              lineHeight: '22px',
              color: COLORS.text.primary,
              outline: 'none',
            }}
          />
        </div>

        {/* Table Container */}
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            borderRadius: CARD_CURVATURE,
            border: `0.5px solid ${COLORS.border.default}`,
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'DM Sans',
            }}
          >
            {/* Table Header */}
            <thead>
              <tr
                style={{
                  backgroundColor: '#17263D',
                  height: '64px',
                }}
              >
                <th style={{ ...headerCellStyle, cursor: 'default' }}>
                  <span>Location</span>
                </th>
                <th style={{ ...headerCellStyle, cursor: 'default' }}>
                  <span>Facilities</span>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('volume')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Volume</span>
                    {renderSortIndicator('volume')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('costPerTon')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Cost/Ton</span>
                    {renderSortIndicator('costPerTon')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('currentCost')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Current Cost</span>
                    {renderSortIndicator('currentCost')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('preNuel')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Pre-Nuel</span>
                    {renderSortIndicator('preNuel')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer', minWidth: '163px' }}
                  onClick={() => handleSort('executionRate')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Execution Rate</span>
                    {renderSortIndicator('executionRate')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('untappedPotential')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Untapped</span>
                    {renderSortIndicator('untappedPotential')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer' }}
                  onClick={() => handleSort('alerts')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Alerts</span>
                    {renderSortIndicator('alerts')}
                  </div>
                </th>
                <th
                  style={{ ...headerCellStyle, cursor: 'pointer', minWidth: '128px' }}
                  onClick={() => handleSort('status')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Status</span>
                    {renderSortIndicator('status')}
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={row.location}
                  style={{
                    height: '64px',
                    backgroundColor: '#FFFFFF',
                    borderTop: index > 0 ? `0.5px solid ${COLORS.border.default}` : 'none',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  {/* Location */}
                  <td style={bodyCellStyle}>
                    <span style={primaryTextStyle}>{row.location}</span>
                  </td>

                  {/* Facilities */}
                  <td style={bodyCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Buildings size={14} weight="regular" color={COLORS.text.secondary} />
                        <span style={secondaryTextStyle}>{row.plants}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrainSimple size={14} weight="regular" color={COLORS.text.secondary} />
                        <span style={secondaryTextStyle}>{row.terminals}</span>
                      </div>
                    </div>
                  </td>

                  {/* Volume */}
                  <td style={bodyCellStyle}>
                    <span style={primaryTextStyle}>{formatNumber(row.volume)}</span>
                  </td>

                  {/* Cost/Ton */}
                  <td style={bodyCellStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={primaryTextStyle}>{formatCostPerTon(row.costPerTon)}</span>
                      <span style={tertiaryTextStyle}>Pre: {formatCostPerTon(row.costPerTonPre)}</span>
                    </div>
                  </td>

                  {/* Current Cost */}
                  <td style={bodyCellStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={primaryTextStyle}>{formatCurrency(row.currentCost)}...</span>
                      <span style={tertiaryTextStyle}>{formatCurrency(row.currentCostPre)}...</span>
                    </div>
                  </td>

                  {/* Pre-Nuel */}
                  <td style={bodyCellStyle}>
                    <span style={secondaryTextStyle}>{formatCurrency(row.preNuel)}</span>
                  </td>

                  {/* Execution Rate */}
                  <td style={bodyCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Progress Bar */}
                      <div
                        style={{
                          width: '60px',
                          height: '6px',
                          backgroundColor: '#F3F6F9',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${row.executionRate}%`,
                            height: '100%',
                            backgroundColor: '#34C759',
                            borderRadius: '999px',
                          }}
                        />
                      </div>
                      {/* Percentage */}
                      <span style={primaryTextStyle}>{row.executionRate}%</span>
                    </div>
                  </td>

                  {/* Untapped Potential */}
                  <td style={bodyCellStyle}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#1C58F7',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontWeight: 400,
                          color: '#1C58F7',
                          textDecoration: 'underline',
                        }}
                      >
                        {formatCurrency(row.untappedPotential)}
                      </span>
                      <ArrowSquareOut size={14} weight="regular" color="#1C58F7" />
                    </div>
                  </td>

                  {/* Alerts */}
                  <td style={bodyCellStyle}>
                    {row.alerts > 0 ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#1C58F7',
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '14px',
                            lineHeight: '22px',
                            fontWeight: 400,
                            color: '#1C58F7',
                            textDecoration: 'underline',
                          }}
                        >
                          {row.alerts}
                        </span>
                        <ArrowSquareOut size={14} weight="regular" color="#1C58F7" />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={secondaryTextStyle}>All Clear</span>
                        <Check size={14} weight="regular" color={COLORS.text.secondary} />
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td style={bodyCellStyle}>
                    <StatusPill
                      variant={row.status}
                      label={row.status === 'good' ? 'Good' : row.status === 'warning' ? 'Warning' : 'Excellent'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

RegionalPerformanceTable.displayName = 'RegionalPerformanceTable';

// ============================================
// STYLES
// ============================================

const headerCellStyle: React.CSSProperties = {
  padding: '0 16px',
  textAlign: 'left',
  fontFamily: 'DM Sans',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 500,
  color: '#FFFFFF',
  whiteSpace: 'nowrap',
};

const bodyCellStyle: React.CSSProperties = {
  padding: '0 16px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
};

const primaryTextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 400,
  color: COLORS.text.primary,
};

const secondaryTextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 400,
  color: COLORS.text.secondary,
};

const tertiaryTextStyle: React.CSSProperties = {
  fontFamily: 'DM Sans',
  fontSize: '12px',
  lineHeight: '20px',
  fontWeight: 400,
  color: COLORS.text.secondary,
};
