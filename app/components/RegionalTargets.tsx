'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { ProgressBar } from './ProgressBar';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { ChartLine, CaretDown, CaretUp, Factory, Cube, GearSix } from '@phosphor-icons/react';
import { warning } from '../../lib/design-tokens/colors';

export interface RegionalTargetsProps {
  className?: string;
}

type TabType = 'facility' | 'material';

/**
 * RegionalTargets Component
 * Displays regional performance targets with detailed progress bars
 * Exactly replicates Figma specifications with XL and LG progress bar variants
 */
export const RegionalTargets = React.forwardRef<HTMLDivElement, RegionalTargetsProps>(
  ({ className }, ref) => {
    const [activeTab, setActiveTab] = useState<TabType>('facility');
    const [expandedFacilities, setExpandedFacilities] = useState<Set<string>>(new Set(['Lake Opal Terminal']));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<{ name: string; current: number; target: number; capacity: number } | null>(null);
    const [targetValue, setTargetValue] = useState('');
    const [reasonValue, setReasonValue] = useState('');

    const toggleFacility = (facility: string) => {
      const newExpanded = new Set(expandedFacilities);
      if (newExpanded.has(facility)) {
        newExpanded.delete(facility);
      } else {
        newExpanded.add(facility);
      }
      setExpandedFacilities(newExpanded);
    };

    const handleSettingsClick = (name: string, current: number, target: number, capacity: number) => {
      setSelectedMaterial({ name, current, target, capacity });
      setTargetValue(target.toString());
      setReasonValue('');
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
      setSelectedMaterial(null);
      setTargetValue('');
      setReasonValue('');
    };

    const handleSave = () => {
      console.log('Saving configuration:', {
        material: selectedMaterial?.name,
        target: targetValue,
        reason: reasonValue,
      });
      handleModalClose();
    };

    // Material icons
    const materialIcons = {
      KTS: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill="#FF3B30" opacity="0.2" />
          <circle cx="12" cy="12" r="4" fill="#FF3B30" />
        </svg>
      ),
      KMS: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill={warning[500]} opacity="0.2" />
          <circle cx="12" cy="12" r="4" fill={warning[500]} />
        </svg>
      ),
      'Thio-Sul': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill="#34C759" opacity="0.2" />
          <circle cx="12" cy="12" r="4" fill="#34C759" />
        </svg>
      ),
      CropMax: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" fill="#7F8FA4" opacity="0.2" />
          <circle cx="12" cy="12" r="4" fill="#7F8FA4" />
        </svg>
      ),
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
        {/* Section Header with ALL filter pills active */}
        <SectionHeader
          level="primary"
          icon={<ChartLine size={24} weight="regular" className="text-[#1C58F7]" />}
          title="Regional Targets"
          showFilters={true}
          filters={[
            { label: 'Critical', variant: 'error', active: true },
            { label: 'Warning', variant: 'warning', active: true },
            { label: 'Good', variant: 'success', active: true },
            { label: 'Excellent', variant: 'info', active: true },
          ]}
        />

        {/* Tab Structure */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderBottom: '1px solid #E8EDF2',
            paddingBottom: '0px',
          }}
        >
          <button
            onClick={() => setActiveTab('facility')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px 0',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600,
              fontFamily: 'DM Sans',
              color: activeTab === 'facility' ? '#17263D' : '#7F8FA4',
              borderBottom: activeTab === 'facility' ? '2px solid #1C58F7' : '2px solid transparent',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Factory size={16} weight="regular" />
            By Facility
          </button>
          <button
            onClick={() => setActiveTab('material')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px 0',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600,
              fontFamily: 'DM Sans',
              color: activeTab === 'material' ? '#17263D' : '#7F8FA4',
              borderBottom: activeTab === 'material' ? '2px solid #1C58F7' : '2px solid transparent',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Cube size={16} weight="regular" />
            By Material
          </button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'facility' ? (
            // By Facility View
            <>
              {/* Lake Opal Terminal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Facility Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => toggleFacility('Lake Opal Terminal')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {expandedFacilities.has('Lake Opal Terminal') ? (
                      <CaretUp size={16} weight="bold" color="#7F8FA4" />
                    ) : (
                      <CaretDown size={16} weight="bold" color="#7F8FA4" />
                    )}
                  </button>
                  <Factory size={20} weight="regular" color="#1C58F7" />
                  <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
                    Lake Opal Terminal
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                    Using 68% of total capacity — Target is at 85% capacity
                  </p>

                  {/* Alert Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: '#FFD6DB', borderRadius: '6px', marginLeft: 'auto' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF3B30' }} />
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: '#FF3B30', fontFamily: 'DM Sans' }}>
                      2 Alerts
                    </p>
                  </div>

                  {/* See Less Link */}
                  <button
                    onClick={() => toggleFacility('Lake Opal Terminal')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                    }}
                  >
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: '#1C58F7', fontFamily: 'DM Sans' }}>
                      {expandedFacilities.has('Lake Opal Terminal') ? 'See Less' : 'See more'}
                    </p>
                    {expandedFacilities.has('Lake Opal Terminal') ? (
                      <CaretUp size={12} weight="bold" color="#1C58F7" />
                    ) : (
                      <CaretDown size={12} weight="bold" color="#1C58F7" />
                    )}
                  </button>
                </div>

                {/* Material Progress Bars (XL) */}
                {expandedFacilities.has('Lake Opal Terminal') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '28px' }}>
                    <ProgressBar
                      size="xl"
                      name="KTS"
                      icon={materialIcons.KTS}
                      current={13487}
                      target={18383}
                      capacity={25207}
                      percentage={47}
                      status="critical"
                      onSettingsClick={() => handleSettingsClick('KTS', 13487, 18383, 25207)}
                    />
                    <ProgressBar
                      size="xl"
                      name="KMS"
                      icon={materialIcons.KMS}
                      current={16829}
                      target={16481}
                      capacity={23063}
                      percentage={68}
                      status="warning"
                      onSettingsClick={() => handleSettingsClick('KMS', 16829, 16481, 23063)}
                    />
                    <ProgressBar
                      size="xl"
                      name="Thio-Sul"
                      icon={materialIcons['Thio-Sul']}
                      current={25673}
                      target={26127}
                      capacity={29628}
                      percentage={83}
                      status="good"
                      onSettingsClick={() => handleSettingsClick('Thio-Sul', 25673, 26127, 29628)}
                    />
                    <ProgressBar
                      size="xl"
                      name="CropMax"
                      icon={materialIcons.CropMax}
                      current={0}
                      target={0}
                      capacity={0}
                      status="warning"
                      warningMessage="No data available for this material/facility"
                      onSettingsClick={() => handleSettingsClick('CropMax', 0, 0, 0)}
                    />
                  </div>
                )}
              </div>

              {/* Lake Opal Plant */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Facility Header with "All clear" badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => toggleFacility('Lake Opal Plant')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {expandedFacilities.has('Lake Opal Plant') ? (
                      <CaretUp size={16} weight="bold" color="#7F8FA4" />
                    ) : (
                      <CaretDown size={16} weight="bold" color="#7F8FA4" />
                    )}
                  </button>
                  <Factory size={20} weight="regular" color="#1C58F7" />
                  <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
                    Lake Opal Plant
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                    Using 91% of total capacity — Target is at 93% capacity
                  </p>

                  {/* All Clear Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: '#D6F5E1', borderRadius: '6px', marginLeft: 'auto' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34C759' }} />
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: '#34C759', fontFamily: 'DM Sans' }}>
                      All clear
                    </p>
                  </div>

                  {/* See more Link */}
                  <button
                    onClick={() => toggleFacility('Lake Opal Plant')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                    }}
                  >
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: '#1C58F7', fontFamily: 'DM Sans' }}>
                      {expandedFacilities.has('Lake Opal Plant') ? 'See Less' : 'See more'}
                    </p>
                    {expandedFacilities.has('Lake Opal Plant') ? (
                      <CaretUp size={12} weight="bold" color="#1C58F7" />
                    ) : (
                      <CaretDown size={12} weight="bold" color="#1C58F7" />
                    )}
                  </button>
                </div>

                {/* Single XL Progress Bar */}
                {!expandedFacilities.has('Lake Opal Plant') && (
                  <div style={{ paddingLeft: '28px' }}>
                    <ProgressBar
                      size="xl"
                      name=""
                      current={17204}
                      target={17684}
                      capacity={21413}
                      percentage={91}
                      status="good"
                      showSettings={false}
                    />
                  </div>
                )}
              </div>

              {/* Second Lake Opal Terminal (collapsed) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Facility Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => toggleFacility('Lake Opal Terminal 2')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CaretDown size={16} weight="bold" color="#7F8FA4" />
                  </button>
                  <Factory size={20} weight="regular" color="#1C58F7" />
                  <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: '#17263D', fontFamily: 'DM Sans' }}>
                    Lake Opal Terminal
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 400, color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                    Using 62% of total capacity — Target is at 85% capacity
                  </p>

                  {/* Alert Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: warning[100], borderRadius: '6px', marginLeft: 'auto' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: warning[500] }} />
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: warning[500], fontFamily: 'DM Sans' }}>
                      1 Alert
                    </p>
                  </div>

                  {/* See more Link */}
                  <button
                    onClick={() => toggleFacility('Lake Opal Terminal 2')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                    }}
                  >
                    <p style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 500, color: '#1C58F7', fontFamily: 'DM Sans' }}>
                      See more
                    </p>
                    <CaretDown size={12} weight="bold" color="#1C58F7" />
                  </button>
                </div>

                {/* Single XL Progress Bar */}
                <div style={{ paddingLeft: '28px' }}>
                  <ProgressBar
                    size="xl"
                    name=""
                    current={11761}
                    target={16402}
                    capacity={18609}
                    percentage={62}
                    status="warning"
                    showSettings={false}
                  />
                </div>
              </div>
            </>
          ) : (
            // By Material View (Placeholder)
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                color: '#7F8FA4',
                fontSize: '14px',
                lineHeight: '22px',
                fontFamily: 'DM Sans',
              }}
            >
              By Material view coming soon
            </div>
          )}
        </div>

        {/* Configuration Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Configuration"
          icon={<GearSix size={24} weight="regular" color="#1C58F7" />}
          subtitle={selectedMaterial ? `Material: ${selectedMaterial.name}` : ''}
          footer={
            <>
              <Button
                size="medium"
                variant="secondary"
                onClick={handleModalClose}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                size="medium"
                variant="primary"
                onClick={handleSave}
                style={{ flex: 1 }}
              >
                Update
              </Button>
            </>
          }
        >
          {/* Modal Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                borderBottom: '1px solid #D9E0E9',
                paddingBottom: '16px',
              }}
            >
              <Input
                label="Target"
                helperText={selectedMaterial ? `Nuel Optimization: ${selectedMaterial.target.toLocaleString()}` : ''}
                value={targetValue}
                onChange={(e) => setTargetValue((e.target as HTMLInputElement).value)}
                placeholder={selectedMaterial?.target.toString() || '0'}
              />
            </div>

            <div
              style={{
                borderBottom: '1px solid #D9E0E9',
                paddingBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Input
                variant="textarea"
                multiline
                label="Reason"
                value={reasonValue}
                onChange={(e) => setReasonValue((e.target as HTMLTextAreaElement).value)}
                placeholder="Enter reason for configuration change..."
              />
            </div>

            {selectedMaterial && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#F3F6F9',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                    Current:
                  </span>
                  <span style={{ fontSize: '12px', color: '#17263D', fontFamily: 'DM Sans', fontWeight: 500 }}>
                    {selectedMaterial.current.toLocaleString()} tons
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#7F8FA4', fontFamily: 'DM Sans' }}>
                    Capacity:
                  </span>
                  <span style={{ fontSize: '12px', color: '#17263D', fontFamily: 'DM Sans', fontWeight: 500 }}>
                    {selectedMaterial.capacity.toLocaleString()} tons
                  </span>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
);

RegionalTargets.displayName = 'RegionalTargets';
