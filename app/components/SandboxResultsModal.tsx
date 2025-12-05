'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { StatusPill } from './StatusPill';
import {
  CheckCircle,
  Lightbulb,
  Warning,
  ArrowRight,
  FileText,
  MapPin,
  Factory,
  ShieldWarning,
  ChartLine,
  CurrencyDollar,
  TrendUp,
  TrendDown,
} from '@phosphor-icons/react';
import { SimulationResults } from '@/app/utils/sandboxCalculations';
import { COLORS, SPACING, CARD_CURVATURE } from '../design-tokens';

interface SandboxResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: SimulationResults | null;
}

export const SandboxResultsModal: React.FC<SandboxResultsModalProps> = ({
  isOpen,
  onClose,
  results,
}) => {
  if (!results) {
    return null;
  }

  const opportunities = results.opportunities;
  const risks = results.risks;
  const hasOpportunities = opportunities.length > 0;
  const hasRisks = risks.length > 0;

  // Determine disclaimer state based on scenario
  const getDisclaimerState = (): 'success' | 'warning' | 'error' | null => {
    if (results.scenarioType === 'Peak Demand' || results.scenarioType === 'Seasonal Spike') {
      if (results.canMeetDemand === false) return 'error';
      if (results.plantsAtCapacity && results.plantsAtCapacity.length > 0 && results.canMeetDemand === true) return 'warning';
      if (results.canMeetDemand === true) return 'success';
    }
    return null;
  };

  const disclaimerState = getDisclaimerState();

  // Get disclaimer config based on state
  const getDisclaimerConfig = () => {
    switch (disclaimerState) {
      case 'success':
        return {
          bgColor: '#D1FAE5',
          borderColor: '#10B981',
          titleColor: '#047857',
          textColor: '#065F46',
          icon: <CheckCircle size={14} weight="fill" color="#047857" />,
          title: 'Capacity Assessment: YES',
          message: 'Current network capacity is sufficient to handle the projected demand increase.',
        };
      case 'warning':
        return {
          bgColor: '#FEF3C7',
          borderColor: '#F59E0B',
          titleColor: '#D97706',
          textColor: '#92400E',
          icon: <Warning size={14} weight="fill" color="#D97706" />,
          title: 'Capacity Assessment: CAUTION',
          message: 'Demand can be met, but some facilities will operate at maximum capacity.',
        };
      case 'error':
        return {
          bgColor: '#FEE2E2',
          borderColor: '#EF4444',
          titleColor: '#DC2626',
          textColor: '#991B1B',
          icon: <ShieldWarning size={14} weight="fill" color="#DC2626" />,
          title: 'Capacity Assessment: NO',
          message: 'Current network capacity is insufficient. Additional capacity required.',
        };
      default:
        return null;
    }
  };

  const disclaimerConfig = getDisclaimerConfig();

  // Calculate cost difference for display
  const costDifference = Math.abs(results.impactMetrics.cost.after - results.impactMetrics.cost.before);
  const costChangePercent = results.impactMetrics.cost.before > 0
    ? (((results.impactMetrics.cost.after - results.impactMetrics.cost.before) / results.impactMetrics.cost.before) * 100)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sandbox Simulation Complete"
      subtitle={`Analysis of ${results.totalScenarios} scenario${results.totalScenarios > 1 ? 's' : ''}`}
      icon={<CheckCircle size={22} weight="fill" color={COLORS.semantic.success[500]} />}
      width="650px"
      maxWidth="650px"
      footer={
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" icon={<FileText size={16} weight="fill" />}>
            Export Report
          </Button>
        </div>
      }
    >
      {/* Scrollable Content Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>

        {/* ==================== IMPACT SUMMARY SECTION ==================== */}
        <div>
          <h2
            style={{
              fontFamily: 'DM Sans',
              fontSize: '15px',
              fontWeight: 700,
              color: COLORS.text.primary,
              margin: '0 0 14px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Impact Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Three-State Disclaimer for Peak Demand */}
            {disclaimerConfig && (
              <div
                style={{
                  padding: '14px 16px',
                  backgroundColor: disclaimerConfig.bgColor,
                  borderRadius: '16px',
                  border: `2px solid ${disclaimerConfig.borderColor}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ flexShrink: 0, marginTop: '1px' }}>
                    {disclaimerConfig.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: disclaimerConfig.titleColor,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {disclaimerConfig.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        color: disclaimerConfig.textColor,
                        margin: 0,
                        lineHeight: '18px',
                      }}
                    >
                      {disclaimerConfig.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Numbers Card - Cost Metrics (Locked Format) */}
            {(results.scenarioType === 'Peak Demand' ||
              results.scenarioType === 'Seasonal Spike' ||
              results.scenarioType === 'Planned Shutdown' ||
              results.scenarioType === 'Planned Maintenance' ||
              results.scenarioType === 'Regional Demand Drop') && (
              <div
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '2px solid #3B82F6',
                  borderRadius: '16px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#DBEAFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CurrencyDollar size={18} weight="bold" color="#1D4ED8" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: COLORS.text.primary,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                    }}
                  >
                    {results.scenarioType === 'Regional Demand Drop' ? 'Cost Reduction' : 'Additional Cost'}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '36px',
                      fontWeight: 800,
                      color: COLORS.text.primary,
                      lineHeight: 1,
                      letterSpacing: '-1px',
                    }}
                  >
                    {results.scenarioType === 'Regional Demand Drop' ? '-' : '+'}${costDifference.toLocaleString()}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      backgroundColor: results.scenarioType === 'Regional Demand Drop' ? COLORS.semantic.success[100] : COLORS.semantic.error[100],
                      border: `2px solid ${results.scenarioType === 'Regional Demand Drop' ? COLORS.semantic.success[300] : COLORS.semantic.error[300]}`,
                    }}
                  >
                    {results.scenarioType === 'Regional Demand Drop' ? (
                      <TrendDown size={14} weight="bold" color={COLORS.semantic.success[700]} />
                    ) : (
                      <TrendUp size={14} weight="bold" color={COLORS.semantic.error[700]} />
                    )}
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '12px',
                        fontWeight: 800,
                        color: results.scenarioType === 'Regional Demand Drop' ? COLORS.semantic.success[800] : COLORS.semantic.error[800],
                      }}
                    >
                      {Math.abs(costChangePercent).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    color: COLORS.text.secondary,
                    margin: '0 0 12px 0',
                    lineHeight: '18px',
                  }}
                >
                  {results.scenarioType === 'Regional Demand Drop'
                    ? 'Projected savings from reduced operations'
                    : 'Incremental cost to execute this scenario'}
                </p>

                {/* Cost Breakdown Indicators */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'DM Sans', fontSize: '10px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Cost Breakdown
                    </span>
                  </div>

                  {results.scenarioType === 'Peak Demand' || results.scenarioType === 'Seasonal Spike' ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Increased Production
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.45).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Logistics & Distribution
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.30).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Inventory Holding
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.25).toLocaleString()}
                        </span>
                      </div>
                    </>
                  ) : results.scenarioType === 'Planned Shutdown' || results.scenarioType === 'Planned Maintenance' ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Lost Production Time
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.40).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Reallocation to Other Plants
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.35).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Expedited Shipping
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          ${Math.round(costDifference * 0.25).toLocaleString()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Reduced Production Costs
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          -${Math.round(costDifference * 0.50).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Lower Distribution Expenses
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          -${Math.round(costDifference * 0.30).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: '#374151' }}>
                            Inventory Optimization
                          </span>
                        </div>
                        <span style={{ fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>
                          -${Math.round(costDifference * 0.20).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Card - Before/After Values (for Regional Demand Drop) */}
            {results.scenarioType === 'Regional Demand Drop' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F3F4F6',
                    border: '2px solid #9CA3AF',
                    borderRadius: '16px',
                    padding: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: COLORS.text.secondary,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: COLORS.text.secondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Before
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: COLORS.text.primary,
                      }}
                    >
                      ${results.impactMetrics.cost.before.toLocaleString()}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '11px',
                      color: COLORS.text.secondary,
                      marginTop: '6px',
                      display: 'block',
                    }}
                  >
                    Current cost
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: '#D1FAE5',
                    border: '2px solid #10B981',
                    borderRadius: '16px',
                    padding: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: COLORS.semantic.success[600],
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: COLORS.semantic.success[700],
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      After
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: COLORS.semantic.success[700],
                      }}
                    >
                      ${results.impactMetrics.cost.after.toLocaleString()}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '11px',
                      color: COLORS.semantic.success[700],
                      marginTop: '6px',
                      display: 'block',
                    }}
                  >
                    Optimized cost
                  </span>
                </div>
              </div>
            )}

            {/* Plants at Capacity - Location Cards */}
            {results.plantsAtCapacity && results.plantsAtCapacity.length > 0 && (
              <div
                style={{
                  backgroundColor: COLORS.semantic.warning[50],
                  border: `2px solid ${COLORS.semantic.warning[400]}`,
                  borderRadius: '16px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: COLORS.semantic.warning[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Factory size={14} weight="fill" color={COLORS.semantic.warning[700]} />
                  </div>
                  <h4
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: COLORS.semantic.warning[800],
                      margin: 0,
                    }}
                  >
                    Facilities at Max Capacity
                  </h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {results.plantsAtCapacity.map((plant, idx) => {
                    // Extract just the city name (before comma)
                    const cityName = plant.split(',')[0].trim();
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: `2px solid ${COLORS.border.default}`,
                          borderRadius: '8px',
                          padding: '6px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <MapPin size={12} weight="fill" color={COLORS.text.secondary} />
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: COLORS.text.primary,
                          }}
                        >
                          {cityName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Best Month Recommendation (for Planned Shutdown) */}
            {results.bestMonth && (results.scenarioType === 'Planned Shutdown' || results.scenarioType === 'Planned Maintenance') && (
              <div
                style={{
                  backgroundColor: '#F3F4F6',
                  border: '2px solid #6B7280',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ChartLine size={16} weight="bold" color="#374151" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#374151',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Revisit Schedule
                  </h4>
                  <p
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1F2937',
                      margin: '0 0 2px 0',
                    }}
                  >
                    {results.bestMonth}
                  </p>
                  <p
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '11px',
                      color: '#4B5563',
                      margin: 0,
                    }}
                  >
                    Revisit schedule within this date
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==================== OPPORTUNITIES SECTION ==================== */}
        <div>
          <h2
            style={{
              fontFamily: 'DM Sans',
              fontSize: '15px',
              fontWeight: 700,
              color: COLORS.text.primary,
              margin: '0 0 14px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Opportunities ({opportunities.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hasOpportunities ? (
              opportunities.map((opp, idx) => {
                // Skip opportunities that repeat location information already shown
                const shouldShowFullDescription = !(
                  results.plantsAtCapacity &&
                  results.plantsAtCapacity.length > 0 &&
                  opp.description.includes('maximum capacity')
                );

                // Modify description to avoid repetition
                let displayDescription = opp.description;
                if (!shouldShowFullDescription && results.plantsAtCapacity) {
                  displayDescription = 'Consider implementing overflow routing or partnering with co-manufacturers to handle excess demand during peak periods.';
                }

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #1C58F7',
                      borderRadius: '16px',
                      padding: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Lightbulb size={14} weight="fill" color="#3B82F6" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <h3
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: COLORS.text.primary,
                              margin: 0,
                              flex: 1,
                            }}
                          >
                            {opp.title}
                          </h3>
                          <div
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              backgroundColor: COLORS.semantic.success[50],
                              border: `2px solid ${COLORS.semantic.success[200]}`,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'DM Sans',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: COLORS.semantic.success[700],
                              }}
                            >
                              {opp.savings}
                            </span>
                          </div>
                        </div>
                        <p
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '12px',
                            color: COLORS.text.secondary,
                            margin: '0 0 10px 0',
                            lineHeight: '18px',
                          }}
                        >
                          {displayDescription}
                        </p>
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#3B82F6',
                            fontFamily: 'DM Sans',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          View in {opp.link}
                          <ArrowRight size={12} weight="bold" color="#3B82F6" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  backgroundColor: COLORS.neutral[100],
                  border: `2px solid ${COLORS.border.default}`,
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={32} weight="fill" color={COLORS.text.secondary} style={{ marginBottom: '8px' }} />
                <p style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600, color: COLORS.text.secondary, margin: 0 }}>
                  No major opportunities identified
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ==================== RISKS SECTION ==================== */}
        <div>
          <h2
            style={{
              fontFamily: 'DM Sans',
              fontSize: '15px',
              fontWeight: 700,
              color: COLORS.text.primary,
              margin: '0 0 14px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Risks ({risks.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hasRisks ? (
              risks.map((risk, idx) => {
                // Determine severity-based styling
                const getSeverityStyle = () => {
                  switch (risk.severity) {
                    case 'CRITICAL':
                      return {
                        cardBg: COLORS.semantic.error[50],
                        borderColor: COLORS.semantic.error[200],
                        badgeColor: COLORS.semantic.error[600],
                        badgeBg: COLORS.semantic.error[50],
                        iconBg: COLORS.semantic.error[100],
                        iconColor: COLORS.semantic.error[600],
                      };
                    case 'HIGH':
                      return {
                        cardBg: COLORS.semantic.error[50],
                        borderColor: COLORS.semantic.error[300],
                        badgeColor: COLORS.semantic.error[500],
                        badgeBg: COLORS.semantic.error[50],
                        iconBg: COLORS.semantic.error[100],
                        iconColor: COLORS.semantic.error[500],
                      };
                    case 'MEDIUM':
                      return {
                        cardBg: COLORS.semantic.warning[50],
                        borderColor: COLORS.semantic.warning[200],
                        badgeColor: COLORS.semantic.warning[700],
                        badgeBg: COLORS.semantic.warning[50],
                        iconBg: COLORS.semantic.warning[100],
                        iconColor: COLORS.semantic.warning[600],
                      };
                    default:
                      return {
                        cardBg: COLORS.neutral[50],
                        borderColor: COLORS.border.subtle,
                        badgeColor: COLORS.text.secondary,
                        badgeBg: COLORS.neutral[100],
                        iconBg: COLORS.neutral[100],
                        iconColor: COLORS.text.secondary,
                      };
                  }
                };

                const style = getSeverityStyle();

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: style.cardBg,
                      border: `2px solid ${style.borderColor}`,
                      borderRadius: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: style.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <ShieldWarning size={16} weight="fill" color={style.iconColor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <h3
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: COLORS.text.primary,
                              margin: 0,
                              flex: 1,
                            }}
                          >
                            {risk.title}
                          </h3>
                          <span
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '10px',
                              fontWeight: 700,
                              color: style.badgeColor,
                              backgroundColor: style.badgeBg,
                              padding: '4px 8px',
                              borderRadius: '8px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              border: `2px solid ${style.borderColor}`,
                            }}
                          >
                            {risk.severity}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: '12px',
                            color: COLORS.text.secondary,
                            margin: '0 0 10px 0',
                            lineHeight: '18px',
                          }}
                        >
                          {risk.description}
                        </p>
                        <div
                          style={{
                            backgroundColor: COLORS.neutral[100],
                            border: `2px solid ${COLORS.border.default}`,
                            borderRadius: '12px',
                            padding: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                            <CheckCircle size={12} weight="fill" color={COLORS.semantic.info[600]} />
                            <span
                              style={{
                                fontFamily: 'DM Sans',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: COLORS.text.secondary,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                              }}
                            >
                              Mitigation
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '11px',
                              color: COLORS.text.secondary,
                              margin: 0,
                              lineHeight: '16px',
                            }}
                          >
                            {risk.mitigation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  backgroundColor: COLORS.semantic.success[50],
                  border: `2px solid ${COLORS.semantic.success[200]}`,
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={36} weight="fill" color={COLORS.semantic.success[600]} style={{ marginBottom: '12px' }} />
                <p style={{ fontFamily: 'DM Sans', fontSize: '15px', fontWeight: 700, color: COLORS.semantic.success[700], margin: '0 0 4px 0' }}>
                  No Critical Risks Detected
                </p>
                <p style={{ fontFamily: 'DM Sans', fontSize: '13px', color: COLORS.semantic.success[600], margin: 0 }}>
                  The simulation shows no major risk factors
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
