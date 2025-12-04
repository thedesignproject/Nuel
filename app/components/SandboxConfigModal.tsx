'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Dropdown, DropdownOption } from './Dropdown';
import { Button } from './Button';
import { Slider } from './Slider';
import { Plus, X, ArrowClockwise, PlayCircle, ArrowLeft } from '@phosphor-icons/react';

// Parameter configurations for each variable
interface ParameterConfig {
  [key: string]: {
    label: string;
    min: number;
    max: number;
    step: number;
    unit: string;
    defaultValue: number;
  };
}

const PARAMETER_CONFIGS: { [category: string]: { [variable: string]: ParameterConfig } } = {
  'Supplier & Sourcing': {
    'Supplier Failure': {
      severity: { label: 'Severity', min: 0, max: 100, step: 5, unit: '%', defaultValue: 50 },
    },
    'Material Flow Disruption': {
      delayDays: { label: 'Delay Days', min: 1, max: 30, step: 1, unit: ' days', defaultValue: 7 },
    },
  },
  'Production & Manufacturing': {
    'Planned Shutdown': {
      shutdownDays: { label: 'Down Days (out of 30)', min: 1, max: 30, step: 1, unit: ' days', defaultValue: 30 },
    },
    'Unplanned Breakdown': {
      capacityLoss: { label: 'Capacity Loss', min: 10, max: 100, step: 5, unit: '%', defaultValue: 60 },
      recoveryTime: { label: 'Recovery Time', min: 1, max: 60, step: 1, unit: ' days', defaultValue: 14 },
    },
    'Capacity Adjustment': {
      changePercent: {
        label: 'Change Percent',
        min: -50,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 0,
      },
    },
    'Line Changeover': {
      downtimeHours: { label: 'Downtime Hours', min: 1, max: 48, step: 1, unit: ' hrs', defaultValue: 8 },
      efficiencyImpact: {
        label: 'Efficiency Impact',
        min: 0,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 20,
      },
    },
    'Multi-Plant Allocation': {
      redistributionPercent: {
        label: 'Redistribution',
        min: 0,
        max: 100,
        step: 5,
        unit: '%',
        defaultValue: 50,
      },
    },
  },
  'Demand & Customer Fulfillment': {
    'Peak Demand': {
      demandIncrease: {
        label: 'Demand Increase (%)',
        min: 5,
        max: 100,
        step: 5,
        unit: '%',
        defaultValue: 30,
      },
    },
    'Regional Demand Drop': {
      demandDecrease: {
        label: 'Demand Decrease',
        min: 5,
        max: 80,
        step: 5,
        unit: '%',
        defaultValue: 25,
      },
    },
    'Forecast Volatility': {
      accuracyReduction: {
        label: 'Accuracy Reduction',
        min: 5,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 20,
      },
      variabilityIncrease: {
        label: 'Variability Increase',
        min: 5,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 15,
      },
    },
    'Lead Time Acceleration': {
      daysReduction: { label: 'Days Reduction', min: 1, max: 14, step: 1, unit: ' days', defaultValue: 5 },
      orderPercentage: {
        label: 'Order Percentage',
        min: 10,
        max: 100,
        step: 10,
        unit: '%',
        defaultValue: 50,
      },
    },
  },
  'Inventory & Storage': {
    'Safety Stock Adjustment': {
      changePercent: {
        label: 'Change Percent',
        min: -50,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 0,
      },
    },
    'Reorder Frequency': {
      frequencyChange: {
        label: 'Frequency Change',
        min: -7,
        max: 14,
        step: 1,
        unit: ' days',
        defaultValue: 0,
      },
      minOrderQuantity: {
        label: 'Min Order Quantity',
        min: 100,
        max: 5000,
        step: 100,
        unit: ' units',
        defaultValue: 1000,
      },
    },
  },
  'Transportation & Logistics': {
    'Lane Closure': {
      duration: { label: 'Duration', min: 1, max: 60, step: 1, unit: ' days', defaultValue: 14 },
    },
    'Carrier Capacity': {
      capacityReduction: {
        label: 'Capacity Reduction',
        min: 10,
        max: 80,
        step: 5,
        unit: '%',
        defaultValue: 30,
      },
    },
    'Port Congestion': {
      delayDays: { label: 'Delay Days', min: 1, max: 30, step: 1, unit: ' days', defaultValue: 7 },
    },
    'Mode Switching': {
      costImpact: { label: 'Cost Impact', min: -20, max: 50, step: 5, unit: '%', defaultValue: 10 },
      timeImpact: { label: 'Time Impact', min: -10, max: 20, step: 1, unit: ' days', defaultValue: 3 },
    },
    'Routing Diversion': {
      detourDistance: {
        label: 'Detour Distance',
        min: 5,
        max: 100,
        step: 5,
        unit: '%',
        defaultValue: 25,
      },
      costIncrease: { label: 'Cost Increase', min: 5, max: 50, step: 5, unit: '%', defaultValue: 15 },
    },
    'Multi-Stop Optimization': {
      maxStopsPerRoute: {
        label: 'Max Stops Per Route',
        min: 2,
        max: 8,
        step: 1,
        unit: ' stops',
        defaultValue: 4,
      },
      consolidationLevel: {
        label: 'Consolidation Level',
        min: 30,
        max: 100,
        step: 5,
        unit: '%',
        defaultValue: 70,
      },
    },
    'Reverse Logistics': {
      returnVolume: { label: 'Return Volume', min: 1, max: 20, step: 1, unit: '%', defaultValue: 5 },
      processingTime: {
        label: 'Processing Time',
        min: 1,
        max: 14,
        step: 1,
        unit: ' days',
        defaultValue: 5,
      },
    },
  },
  'Network & Facility Structure': {
    'Facility Status': {
      partialCapacity: {
        label: 'Partial Capacity',
        min: 0,
        max: 100,
        step: 10,
        unit: '%',
        defaultValue: 50,
      },
    },
    'Network Rebalancing': {
      flowRedistribution: {
        label: 'Flow Redistribution',
        min: 10,
        max: 100,
        step: 10,
        unit: '%',
        defaultValue: 50,
      },
    },
    'New Facility Evaluation': {
      capacity: { label: 'Capacity', min: 1000, max: 10000, step: 500, unit: ' tons', defaultValue: 5000 },
      investmentCost: {
        label: 'Investment Cost',
        min: 100000,
        max: 5000000,
        step: 100000,
        unit: ' $',
        defaultValue: 1000000,
      },
    },
  },
  'Cost Structure': {
    'Freight Cost Variation': {
      costChange: { label: 'Cost Change', min: -30, max: 50, step: 5, unit: '%', defaultValue: 10 },
    },
    'Storage Cost Exposure': {
      costPerUnitChange: {
        label: 'Cost Per Unit Change',
        min: -20,
        max: 40,
        step: 5,
        unit: '%',
        defaultValue: 10,
      },
      duration: { label: 'Duration', min: 1, max: 12, step: 1, unit: ' months', defaultValue: 3 },
    },
    'Budget Implications': {
      salesBudgetChange: {
        label: 'Sales Budget Change',
        min: -30,
        max: 30,
        step: 5,
        unit: '%',
        defaultValue: 0,
      },
      productionBudgetChange: {
        label: 'Production Budget Change',
        min: -30,
        max: 30,
        step: 5,
        unit: '%',
        defaultValue: 0,
      },
    },
  },
};

interface ConfiguredScenario {
  id: string;
  facility: string;
  category: string;
  variable: string;
  parameters: { [key: string]: number };
}

interface SandboxConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (scenarios: ConfiguredScenario[]) => void;
}

export const SandboxConfigModal: React.FC<SandboxConfigModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  // Step state: 'selection' or 'parameters'
  const [step, setStep] = useState<'selection' | 'parameters'>('selection');

  // Form state
  const [facility, setFacility] = useState('Phoenix, AZ');
  const [category, setCategory] = useState('Production & Manufacturing');
  const [variable, setVariable] = useState('Select...');

  // Parameters state
  const [parameters, setParameters] = useState<{ [key: string]: number }>({});

  // Additional state for Planned Shutdown
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [shutdownConfigs, setShutdownConfigs] = useState<Array<{ plant: string; months: string[]; days: number }>>([]);
  const [tempPlant, setTempPlant] = useState('');
  const [tempShutdownMonths, setTempShutdownMonths] = useState<string[]>([]);
  const [tempDays, setTempDays] = useState(30);

  // Additional state for Peak Demand
  const [monthAllocations, setMonthAllocations] = useState<Array<{ months: string[]; demandPercent: number }>>([]);
  const [tempMonths, setTempMonths] = useState<string[]>([]);
  const [tempDemandPercent, setTempDemandPercent] = useState(30);

  // Configured scenarios state
  const [configuredScenarios, setConfiguredScenarios] = useState<ConfiguredScenario[]>([]);

  // Facility options
  const facilityOptions: DropdownOption[] = [
    { value: 'All Facilities', label: 'All Facilities' },
    { value: 'Phoenix, AZ', label: 'Phoenix, AZ' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Atlanta, GA', label: 'Atlanta, GA' },
    { value: 'Houston, TX', label: 'Houston, TX' },
    { value: 'Portland, OR', label: 'Portland, OR' },
    { value: 'Boston, MA', label: 'Boston, MA' },
    { value: 'Denver, CO', label: 'Denver, CO' },
  ];

  // Category options - only Production & Manufacturing and Demand & Customer Fulfillment are enabled
  const categoryOptions: DropdownOption[] = [
    { value: 'Production & Manufacturing', label: 'Production & Manufacturing' },
    { value: 'Demand & Customer Fulfillment', label: 'Demand & Customer Fulfillment' },
    { value: 'Supplier & Sourcing', label: 'Supplier & Sourcing (Coming Soon)' },
    { value: 'Inventory & Storage', label: 'Inventory & Storage (Coming Soon)' },
    { value: 'Transportation & Logistics', label: 'Transportation & Logistics (Coming Soon)' },
    { value: 'Network & Facility Structure', label: 'Network & Facility Structure (Coming Soon)' },
    { value: 'Cost Structure', label: 'Cost Structure (Coming Soon)' },
  ];

  // Check if category is disabled
  const isCategoryDisabled = (category: string) => {
    return !['Production & Manufacturing', 'Demand & Customer Fulfillment'].includes(category);
  };

  // Variable options based on category
  const getVariableOptions = (): DropdownOption[] => {
    const options = [{ value: 'Select...', label: 'Select...' }];

    // Only show variables if category is enabled
    if (!isCategoryDisabled(category) && PARAMETER_CONFIGS[category]) {
      const variables = Object.keys(PARAMETER_CONFIGS[category]);
      variables.forEach((v) => {
        options.push({ value: v, label: v });
      });
    }

    return options;
  };

  // Get parameter config for current selection
  const getParameterConfig = (): ParameterConfig | null => {
    if (variable === 'Select...' || !PARAMETER_CONFIGS[category]) return null;
    return PARAMETER_CONFIGS[category][variable] || null;
  };

  // Initialize parameters when moving to parameter screen
  const handleConfigure = () => {
    const paramConfig = getParameterConfig();
    if (!paramConfig) return;

    const initialParams: { [key: string]: number } = {};
    Object.keys(paramConfig).forEach((key) => {
      initialParams[key] = paramConfig[key].defaultValue;
    });

    setParameters(initialParams);
    setStep('parameters');
  };

  // Update a parameter value
  const handleParameterChange = (key: string, value: number) => {
    setParameters({ ...parameters, [key]: value });
  };

  // Save configuration and go back to selection screen
  const handleSaveConfiguration = () => {
    const newScenario: ConfiguredScenario = {
      id: Date.now().toString(),
      facility,
      category,
      variable,
      parameters: { ...parameters },
    };

    setConfiguredScenarios([...configuredScenarios, newScenario]);
    // Reset to selection screen
    setStep('selection');
    setVariable('Select...');
    setParameters({});
  };

  // Go back to selection screen without saving
  const handleBackToSelection = () => {
    setStep('selection');
    setParameters({});
    setSelectedMonths([]);
  };

  // Remove a scenario
  const handleRemoveScenario = (id: string) => {
    setConfiguredScenarios(configuredScenarios.filter((s) => s.id !== id));
  };

  // Clear all scenarios
  const handleClearAll = () => {
    setConfiguredScenarios([]);
  };

  // Apply configurations
  const handleApply = () => {
    onApply(configuredScenarios);
    onClose();
  };

  // Cancel and close
  const handleCancel = () => {
    setStep('selection');
    setVariable('Select...');
    setParameters({});
    setSelectedMonths([]);
    onClose();
  };

  const paramConfig = getParameterConfig();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 'selection' ? 'Configure Sandbox Parameters' : 'Adjust Parameters'}
      subtitle={
        step === 'selection'
          ? 'Add parameters to simulate different scenarios'
          : `${variable} - ${facility}`
      }
      width="720px"
      maxWidth="720px"
      footer={
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          {step === 'selection' ? (
            <>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                icon={<PlayCircle size={20} weight="fill" />}
                disabled={configuredScenarios.length === 0}
              >
                Apply to Sandbox
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleBackToSelection} icon={<ArrowLeft size={20} />}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveConfiguration}
                icon={<PlayCircle size={20} weight="fill" />}
              >
                Save Configuration
              </Button>
            </>
          )}
        </div>
      }
    >
      {step === 'selection' ? (
        <>
          {/* Configuration Form */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Dropdowns Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <Dropdown
                  label="Category"
                  value={category}
                  options={categoryOptions}
                  onChange={(value) => {
                    // Only allow selecting enabled categories
                    if (!isCategoryDisabled(value)) {
                      setCategory(value);
                      setVariable('Select...');
                    }
                  }}
                  variant="secondary"
                  width="100%"
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <Dropdown
                  label="Variable"
                  value={variable}
                  options={getVariableOptions()}
                  onChange={setVariable}
                  variant="secondary"
                  width="100%"
                />
              </div>
            </div>

            {/* Add Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="primary"
                onClick={handleConfigure}
                disabled={variable === 'Select...'}
                icon={<Plus size={20} weight="bold" />}
              >
                Add & Configure
              </Button>
            </div>
          </div>

          {/* Configured Scenarios Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#17263D',
                  margin: 0,
                }}
              >
                Configured ({configuredScenarios.length})
              </h3>
              {configuredScenarios.length > 0 && (
                <button
                  onClick={handleClearAll}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#6B7280',
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#17263D';
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6B7280';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArrowClockwise size={16} weight="bold" />
                  Clear All
                </button>
              )}
            </div>

            {/* Scenarios List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {configuredScenarios.length === 0 ? (
                <div
                  style={{
                    padding: '32px',
                    textAlign: 'center',
                    color: '#9CA3AF',
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                  }}
                >
                  No scenarios configured yet. Add parameters above to get started.
                </div>
              ) : (
                configuredScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    style={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#17263D',
                          margin: 0,
                        }}
                      >
                        {scenario.variable}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#6B7280',
                          margin: 0,
                        }}
                      >
                        {scenario.facility}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveScenario(scenario.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: '#EF4444',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FEE2E2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <X size={20} weight="bold" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        /* Parameter Adjustment Screen */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Info Text - moved to top */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#EFF6FF',
              borderRadius: '12px',
              border: '1px solid #BFDBFE',
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 400,
                color: '#1E40AF',
                margin: 0,
              }}
            >
              Configure the parameters below to define your scenario. Add multiple configurations to model different conditions.
            </p>
          </div>

          {/* Planned Shutdown Configuration */}
          {variable === 'Planned Shutdown' && (
            <div
              style={{
                padding: '24px',
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Shutdown Configuration */}
              <div>
                <label
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Shutdown Configuration
                </label>

                {/* Add New Configuration */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#6B7280',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Plant
                      </label>
                      <select
                        value={tempPlant}
                        onChange={(e) => setTempPlant(e.target.value)}
                        style={{
                          width: '100%',
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#374151',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select plant...</option>
                        {facilityOptions
                          .filter(opt => opt.value !== 'All Facilities')
                          .map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#6B7280',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Shutdown Days
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={tempDays}
                        onChange={(e) => setTempDays(Number(e.target.value))}
                        style={{
                          width: '100%',
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#374151',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#6B7280',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Select Months
                    </label>
                    <div
                      style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        padding: '8px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {[
                        { value: 'Jan', label: 'Jan', disabled: false },
                        { value: 'Feb', label: 'Feb', disabled: false },
                        { value: 'Mar', label: 'Mar', disabled: false },
                        { value: 'Apr', label: 'Apr', disabled: false },
                        { value: 'May', label: 'May', disabled: false },
                        { value: 'Jun', label: 'Jun', disabled: false },
                        { value: 'Jul', label: 'Jul', disabled: false },
                        { value: 'Aug', label: 'Aug', disabled: false },
                        { value: 'Sep', label: 'Sep', disabled: false },
                        { value: 'Oct', label: 'Oct', disabled: false },
                        { value: 'Nov', label: 'Nov', disabled: true },
                        { value: 'Dec', label: 'Dec', disabled: true },
                      ].map((month) => {
                        const isSelected = tempShutdownMonths.includes(month.value);
                        return (
                          <button
                            key={month.value}
                            type="button"
                            disabled={month.disabled}
                            onClick={() => {
                              if (month.disabled) return;
                              if (isSelected) {
                                setTempShutdownMonths(tempShutdownMonths.filter((m) => m !== month.value));
                              } else {
                                setTempShutdownMonths([...tempShutdownMonths, month.value]);
                              }
                            }}
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '12px',
                              fontWeight: isSelected ? 600 : 400,
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: month.disabled ? '1px solid #E5E7EB' : isSelected ? '1px solid #3B82F6' : '1px solid #D1D5DB',
                              backgroundColor: month.disabled ? '#F9FAFB' : isSelected ? '#EFF6FF' : '#FFFFFF',
                              color: month.disabled ? '#9CA3AF' : isSelected ? '#1E40AF' : '#374151',
                              cursor: month.disabled ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {month.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (tempPlant && tempShutdownMonths.length > 0 && tempDays >= 1) {
                        setShutdownConfigs([...shutdownConfigs, { plant: tempPlant, months: [...tempShutdownMonths], days: tempDays }]);
                        setTempPlant('');
                        setTempShutdownMonths([]);
                        setTempDays(30);
                      }
                    }}
                    disabled={!tempPlant || tempShutdownMonths.length === 0}
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '14px',
                      fontWeight: 600,
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: (tempPlant && tempShutdownMonths.length > 0) ? '#1C58F7' : '#E5E7EB',
                      color: (tempPlant && tempShutdownMonths.length > 0) ? '#FFFFFF' : '#9CA3AF',
                      cursor: (tempPlant && tempShutdownMonths.length > 0) ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    Add Configuration
                  </button>
                </div>

                {/* Display Added Configurations */}
                {shutdownConfigs.length > 0 && (
                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {shutdownConfigs.map((config, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            padding: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ marginBottom: '8px' }}>
                                <span
                                  style={{
                                    fontFamily: 'DM Sans',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    color: '#374151',
                                  }}
                                >
                                  {config.plant}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                  {config.months.map((month, mIdx) => (
                                    <span
                                      key={mIdx}
                                      style={{
                                        fontFamily: 'DM Sans',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#1E40AF',
                                        backgroundColor: '#EFF6FF',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        border: '1px solid #3B82F6',
                                      }}
                                    >
                                      {month}
                                    </span>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: '#FEF3C7',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid #F59E0B',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: 'DM Sans',
                                      fontSize: '12px',
                                      fontWeight: 700,
                                      color: '#92400E',
                                    }}
                                  >
                                    {config.days} days
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setShutdownConfigs(shutdownConfigs.filter((_, i) => i !== idx));
                              }}
                              style={{
                                fontFamily: 'DM Sans',
                                padding: '4px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: '#EF4444',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Peak Demand Configuration */}
          {variable === 'Peak Demand' && (
            <div
              style={{
                padding: '24px',
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Month-Demand Allocation */}
              <div>
                <label
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Month-Demand Allocation
                </label>

                {/* Add New Allocation */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <label
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#6B7280',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Select Months
                    </label>
                    <div
                      style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        padding: '8px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {[
                        { value: 'Jan', label: 'Jan', disabled: false },
                        { value: 'Feb', label: 'Feb', disabled: false },
                        { value: 'Mar', label: 'Mar', disabled: false },
                        { value: 'Apr', label: 'Apr', disabled: false },
                        { value: 'May', label: 'May', disabled: false },
                        { value: 'Jun', label: 'Jun', disabled: false },
                        { value: 'Jul', label: 'Jul', disabled: false },
                        { value: 'Aug', label: 'Aug', disabled: false },
                        { value: 'Sep', label: 'Sep', disabled: false },
                        { value: 'Oct', label: 'Oct', disabled: false },
                        { value: 'Nov', label: 'Nov', disabled: true },
                        { value: 'Dec', label: 'Dec', disabled: true },
                      ].map((month) => {
                        const isSelected = tempMonths.includes(month.value);
                        return (
                          <button
                            key={month.value}
                            type="button"
                            disabled={month.disabled}
                            onClick={() => {
                              if (month.disabled) return;
                              if (isSelected) {
                                setTempMonths(tempMonths.filter((m) => m !== month.value));
                              } else {
                                setTempMonths([...tempMonths, month.value]);
                              }
                            }}
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '12px',
                              fontWeight: isSelected ? 600 : 400,
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: month.disabled ? '1px solid #E5E7EB' : isSelected ? '1px solid #3B82F6' : '1px solid #D1D5DB',
                              backgroundColor: month.disabled ? '#F9FAFB' : isSelected ? '#EFF6FF' : '#FFFFFF',
                              color: month.disabled ? '#9CA3AF' : isSelected ? '#1E40AF' : '#374151',
                              cursor: month.disabled ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {month.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }}>
                    <div>
                      <label
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#6B7280',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Demand Increase %
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        step="5"
                        value={tempDemandPercent}
                        onChange={(e) => setTempDemandPercent(Number(e.target.value))}
                        style={{
                          width: '100%',
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#374151',
                        }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (tempMonths.length > 0 && tempDemandPercent >= 5) {
                          setMonthAllocations([...monthAllocations, { months: [...tempMonths], demandPercent: tempDemandPercent }]);
                          setTempMonths([]);
                          setTempDemandPercent(30);
                        }
                      }}
                      disabled={tempMonths.length === 0}
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: tempMonths.length > 0 ? '#1C58F7' : '#E5E7EB',
                        color: tempMonths.length > 0 ? '#FFFFFF' : '#9CA3AF',
                        cursor: tempMonths.length > 0 ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Plus size={16} weight="bold" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Display Added Allocations */}
                {monthAllocations.length > 0 && (
                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {monthAllocations.map((alloc, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', flex: 1 }}>
                              {alloc.months.map((month, mIdx) => (
                                <span
                                  key={mIdx}
                                  style={{
                                    fontFamily: 'DM Sans',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#1E40AF',
                                    backgroundColor: '#EFF6FF',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    border: '1px solid #3B82F6',
                                  }}
                                >
                                  {month}
                                </span>
                              ))}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#EFF6FF',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                border: '1px solid #3B82F6',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'DM Sans',
                                  fontSize: '13px',
                                  fontWeight: 700,
                                  color: '#1E40AF',
                                }}
                              >
                                +{alloc.demandPercent}%
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setMonthAllocations(monthAllocations.filter((_, i) => i !== idx));
                            }}
                            style={{
                              fontFamily: 'DM Sans',
                              padding: '4px',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                            }}
                          >
                            <X size={16} weight="bold" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other Variables - Standard Parameters Grid */}
          {variable !== 'Planned Shutdown' && variable !== 'Peak Demand' && paramConfig && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                padding: '24px',
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
              }}
            >
              {Object.keys(paramConfig).map((key) => (
                <Slider
                  key={key}
                  label={paramConfig[key].label}
                  value={parameters[key] || paramConfig[key].defaultValue}
                  onChange={(value) => handleParameterChange(key, value)}
                  min={paramConfig[key].min}
                  max={paramConfig[key].max}
                  step={paramConfig[key].step}
                  unit={paramConfig[key].unit}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
