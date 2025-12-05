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
import {
  ImpactSummaryCard,
  RevisitScheduleCard,
  OpportunityCard,
  RiskWarningCard,
  PlantCapacityCard,
} from './sandbox-components';

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

  // Prepare breakdown items based on scenario type
  const getBreakdownItems = () => {
    if (results.scenarioType === 'Peak Demand' || results.scenarioType === 'Seasonal Spike') {
      return [
        { label: 'Increased Production', value: `$${Math.round(costDifference * 0.45).toLocaleString()}`, color: '#3B82F6' },
        { label: 'Logistics & Distribution', value: `$${Math.round(costDifference * 0.30).toLocaleString()}`, color: '#8B5CF6' },
        { label: 'Inventory Holding', value: `$${Math.round(costDifference * 0.25).toLocaleString()}`, color: '#F59E0B' },
      ];
    } else if (results.scenarioType === 'Planned Shutdown' || results.scenarioType === 'Planned Maintenance') {
      return [
        { label: 'Lost Production Time', value: `$${Math.round(costDifference * 0.40).toLocaleString()}`, color: '#EF4444' },
        { label: 'Reallocation to Other Plants', value: `$${Math.round(costDifference * 0.35).toLocaleString()}`, color: '#F59E0B' },
        { label: 'Expedited Shipping', value: `$${Math.round(costDifference * 0.25).toLocaleString()}`, color: '#8B5CF6' },
      ];
    } else {
      return [
        { label: 'Reduced Production Costs', value: `-$${Math.round(costDifference * 0.50).toLocaleString()}`, color: '#10B981' },
        { label: 'Lower Distribution Expenses', value: `-$${Math.round(costDifference * 0.30).toLocaleString()}`, color: '#10B981' },
        { label: 'Inventory Optimization', value: `-$${Math.round(costDifference * 0.20).toLocaleString()}`, color: '#10B981' },
      ];
    }
  };

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

            {/* NEW: Impact Summary Card - Figma Design */}
            {(results.scenarioType === 'Peak Demand' ||
              results.scenarioType === 'Seasonal Spike' ||
              results.scenarioType === 'Planned Shutdown' ||
              results.scenarioType === 'Planned Maintenance' ||
              results.scenarioType === 'Regional Demand Drop') && (
              <ImpactSummaryCard
                label={results.scenarioType === 'Regional Demand Drop' ? 'COST REDUCTION' : 'ADDITIONAL COST'}
                value={`${results.scenarioType === 'Regional Demand Drop' ? '-' : '+'}$${costDifference.toLocaleString()}`}
                trend={`${Math.abs(costChangePercent).toFixed(1)}%`}
                trendDirection={results.scenarioType === 'Regional Demand Drop' ? 'down' : 'up'}
                description={
                  results.scenarioType === 'Regional Demand Drop'
                    ? 'Projected savings from reduced operations'
                    : 'Incremental cost to execute this scenario'
                }
                breakdownItems={getBreakdownItems()}
              />
            )}

            {/* NEW: Plant Capacity Card - Shows locations at max capacity for Peak Demand */}
            {(results.scenarioType === 'Peak Demand' || results.scenarioType === 'Seasonal Spike') &&
              results.plantsAtCapacity &&
              results.plantsAtCapacity.length > 0 && (
                <PlantCapacityCard locations={results.plantsAtCapacity} />
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

            {/* NEW: Revisit Schedule Card - Figma Design */}
            {results.bestMonth && (results.scenarioType === 'Planned Shutdown' || results.scenarioType === 'Planned Maintenance') && (
              <RevisitScheduleCard
                label="REVISIT SCHEDULE"
                date={results.bestMonth}
                description="Revisit schedule within this date"
              />
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[12] }}>
            {hasOpportunities ? (
              opportunities.slice(0, 3).map((opp, idx) => {
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

                // Determine impact color based on opportunity type
                // Recommended cards always show green, others color-coded by type
                const getImpactColor = () => {
                  if (idx === 0) {
                    // Recommended card always uses green semantic color
                    return COLORS.semantic.success[500];
                  }

                  // Non-recommended cards color-coded by type
                  switch (opp.type) {
                    case 'cost_saving':
                      return COLORS.semantic.success[500];
                    case 'capacity':
                      return COLORS.semantic.error[500];
                    case 'efficiency':
                      return COLORS.accent[500];
                    case 'risk_mitigation':
                      return COLORS.semantic.warning[500];
                    default:
                      return COLORS.semantic.success[500];
                  }
                };

                return (
                  <OpportunityCard
                    key={idx}
                    title={opp.title}
                    description={displayDescription}
                    impact={opp.savings}
                    impactColor={getImpactColor()}
                    isRecommended={idx === 0}
                    variant={idx === 0 ? 'prominent' : 'subtle'}
                    onViewDetails={() => {
                      // Handle navigation to the linked section
                      console.log(`Navigate to ${opp.link}`);
                    }}
                  />
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

          {/* NEW: Risk Warning Cards - Figma Design */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hasRisks ? (
              risks.map((risk, idx) => (
                <RiskWarningCard
                  key={idx}
                  title={risk.title}
                  description={risk.description}
                  severity={risk.severity === 'MEDIUM' ? 'warning' : 'critical'}
                />
              ))
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
