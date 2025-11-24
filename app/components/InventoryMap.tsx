'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Dropdown } from './Dropdown';
import { MapPin, Plus, Minus, ArrowsOut, Crosshair } from '@phosphor-icons/react';
import { warning } from '../../lib/design-tokens/colors';

export interface InventoryMapProps {
  className?: string;
}

interface FacilityHoverData {
  name: string;
  type: 'Plant' | 'Terminal';
  capacity: number;
  current: number;
  target: number;
  percentage: number;
}

/**
 * InventoryMap Component
 * Displays interactive map with inventory status markers and zoom controls
 * Exactly replicates Figma specifications
 */
export const InventoryMap = React.forwardRef<HTMLDivElement, InventoryMapProps>(
  ({ className }, ref) => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [hoveredFacility, setHoveredFacility] = useState<FacilityHoverData | null>(null);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

    // Dropdown states
    const [selectedMaterial, setSelectedMaterial] = useState('All materials');
    const [selectedFacility, setSelectedFacility] = useState('All facilities');

    const materialOptions = [
      { value: 'All materials', label: 'All materials' },
      { value: 'KMS', label: 'KMS' },
      { value: 'Steel', label: 'Steel' },
      { value: 'Aluminum', label: 'Aluminum' },
    ];

    const facilityOptions = [
      { value: 'All facilities', label: 'All facilities' },
      { value: 'Plants only', label: 'Plants only' },
      { value: 'Terminals only', label: 'Terminals only' },
    ];

    const handleZoomIn = () => {
      setZoomLevel((prev) => Math.min(prev + 0.2, 2));
    };

    const handleZoomOut = () => {
      setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
    };

    const handleMapHover = (event: React.MouseEvent<HTMLDivElement>) => {
      // Example: Show hover popup (you can add logic to detect facility markers)
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Mock data - in real implementation, detect which facility is being hovered
      if (x > 100 && x < 300 && y > 50 && y < 150) {
        setHoveredFacility({
          name: 'Lake Opal Plant',
          type: 'Plant',
          capacity: 27400,
          current: 10761,
          target: 21930,
          percentage: 80,
        });
        setHoverPosition({ x, y });
      } else {
        setHoveredFacility(null);
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
          height: '504px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '1 0 0',
          minWidth: 0,
          position: 'relative',
        }}
      >
        {/* Section Header with Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%' }}>
          {/* Left: Title Section */}
          <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'start', paddingTop: '3px' }}>
              <MapPin size={24} weight="regular" className="text-[#1C58F7]" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h2 style={{ fontFamily: 'DM Sans', fontSize: '24px', lineHeight: '30px', fontWeight: 600, color: '#17263D' }}>
                Inventory Map
              </h2>
            </div>
          </div>

          {/* Right: Dropdowns */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Dropdown
              value={selectedMaterial}
              options={materialOptions}
              onChange={setSelectedMaterial}
              variant="secondary"
              width="160px"
            />
            <Dropdown
              value={selectedFacility}
              options={facilityOptions}
              onChange={setSelectedFacility}
              variant="secondary"
              width="160px"
            />
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Inventory Status Legend */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              paddingRight: '16px',
              borderRight: '0.5px solid #C3CDD9',
            }}
          >
            {/* Inventory Label */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 6L8 2L15 6V11C15 11.5304 14.7893 12.0391 14.4142 12.4142C14.0391 12.7893 13.5304 13 13 13H3C2.46957 13 1.96086 12.7893 1.58579 12.4142C1.21071 12.0391 1 11.5304 1 11V6Z"
                  stroke="#7F8FA4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={{ fontSize: '14px', lineHeight: '22px', color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                Inventory
              </p>
            </div>

            {/* Status Items */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#007AFF' }} />
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans' }}>
                  Excess
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#34C759' }} />
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans' }}>
                  Adequate
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: warning[500] }} />
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans' }}>
                  Low
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#FF3B30' }} />
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans' }}>
                  Critical
                </p>
              </div>
            </div>
          </div>

          {/* Facilities Legend */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Facilities Label */}
            <p style={{ fontSize: '14px', lineHeight: '22px', color: '#7F8FA4', fontFamily: 'DM Sans', width: '66px' }}>
              Facilities:
            </p>

            {/* Facility Types */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 14V6.5L8 2L14 6.5V14H9.5V9.5H6.5V14H2Z"
                    fill="#17263D"
                  />
                </svg>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans' }}>
                  Terminal
                </p>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '66px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 14V7L8 3L14 7V14H10V10H6V14H2Z"
                    fill="#17263D"
                  />
                </svg>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#17263D', fontFamily: 'DM Sans', flex: '1 0 0', minWidth: 0 }}>
                  Plant
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Popup - Outside map container */}
        {hoveredFacility && (
          <div
            style={{
              position: 'absolute',
              left: `${hoverPosition.x + 24}px`,
              top: `${hoverPosition.y + 150}px`,
              transform: 'translate(-50%, -100%)',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              minWidth: '200px',
              maxWidth: '240px',
              pointerEvents: 'none',
            }}
          >
            {/* Facility Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '1px 6px',
                  backgroundColor: '#D6F5E1',
                  borderRadius: '9999px',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 8V4L5 1.5L8.5 4V8H6V5.5H4V8H1.5Z" fill="#12441D" />
                </svg>
                <p style={{ fontSize: '9px', lineHeight: '14px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
                  {hoveredFacility.type}
                </p>
              </div>
              <div
                style={{
                  padding: '1px 6px',
                  backgroundColor: '#D6F5E1',
                  borderRadius: '4px',
                }}
              >
                <p style={{ fontSize: '9px', lineHeight: '14px', fontWeight: 600, color: '#34C759', fontFamily: 'DM Sans' }}>
                  {hoveredFacility.percentage}%
                </p>
              </div>
            </div>

            {/* Facility Name */}
            <h3 style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 600, color: '#17263D', marginBottom: '6px', fontFamily: 'DM Sans' }}>
              {hoveredFacility.name}
            </h3>

            {/* Description */}
            <p style={{ fontSize: '11px', lineHeight: '16px', color: '#7F8FA4', marginBottom: '8px', fontFamily: 'DM Sans' }}>
              Using 39% of total capacity — Target is at {hoveredFacility.percentage}% capacity
            </p>

            {/* Capacity Info */}
            <div style={{ marginBottom: '6px' }}>
              <p style={{ fontSize: '10px', lineHeight: '14px', color: '#7F8FA4', fontFamily: 'DM Sans', marginBottom: '2px' }}>
                Total Capacity: {hoveredFacility.capacity.toLocaleString()}
              </p>
              <p style={{ fontSize: '10px', lineHeight: '14px', color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                Current: {hoveredFacility.current.toLocaleString()}
              </p>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#F3F6F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px', position: 'relative' }}>
              <div
                style={{
                  width: `${(hoveredFacility.current / hoveredFacility.capacity) * 100}%`,
                  height: '100%',
                  backgroundColor: '#34C759',
                  borderRadius: '3px',
                }}
              />
              {/* Target marker */}
              <div
                style={{
                  position: 'absolute',
                  left: `${hoveredFacility.percentage}%`,
                  top: '-2px',
                  width: '2px',
                  height: '10px',
                  backgroundColor: '#17263D',
                }}
              />
            </div>

            {/* Target Label */}
            <p style={{ fontSize: '9px', lineHeight: '12px', color: '#7F8FA4', fontFamily: 'DM Sans', textAlign: 'center' }}>
              Target: {hoveredFacility.target.toLocaleString()}
            </p>

            {/* Show More Button */}
            <button
              style={{
                width: '100%',
                padding: '6px',
                backgroundColor: '#17263D',
                color: '#FFFFFF',
                borderRadius: '6px',
                border: 'none',
                fontSize: '11px',
                lineHeight: '16px',
                fontWeight: 500,
                fontFamily: 'DM Sans',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              Show More
            </button>
          </div>
        )}

        {/* Map Container */}
        <div
          style={{
            position: 'relative',
            flex: '1 0 0',
            minHeight: 0,
            minWidth: 0,
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: 0.88,
          }}
          onMouseMove={handleMapHover}
          onMouseLeave={() => setHoveredFacility(null)}
        >
          {/* Map Image */}
          <img
            src="/map.png"
            alt="Inventory Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '16px',
            }}
          />

          {/* Zoom Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            {/* Expand Button */}
            <button
              onClick={() => console.log('Expand map')}
              style={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.06)',
                borderRadius: '4px',
                width: '48px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 0',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.1s ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ArrowsOut size={16} weight="regular" className="text-[#17263D]" />
            </button>

            {/* Center Button */}
            <button
              onClick={() => console.log('Center map')}
              style={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.06)',
                borderRadius: '4px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.1s ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Crosshair size={16} weight="regular" className="text-[#17263D]" />
            </button>

            {/* Zoom In/Out Buttons */}
            <div
              style={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.06)',
                borderRadius: '4px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '6px 0',
              }}
            >
              <button
                onClick={handleZoomIn}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 16px',
                  height: '100%',
                  border: 'none',
                  borderRight: '0.5px solid #D9E0E9',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Plus size={16} weight="regular" className="text-[#17263D]" />
              </button>
              <button
                onClick={handleZoomOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 16px',
                  height: '100%',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Minus size={16} weight="regular" className="text-[#17263D]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InventoryMap.displayName = 'InventoryMap';
