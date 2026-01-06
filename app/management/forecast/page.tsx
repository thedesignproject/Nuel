'use client';

import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { Sidebar } from '../../components/Sidebar';
import { NotificationsPanel } from '../../components/NotificationsPanel';
import { CompactAlertBanner } from '../../components/CompactAlertBanner';
import { Tabs, Tab } from '../../components/Tabs';
import { ForecastChart } from '../../components/ForecastChart';
import { ForecastMetricCard } from '../../components/ForecastMetricCard';
import { SectionHeader } from '../../components/SectionHeader';
import { FadeInSection } from '../../components/FadeInSection';
import { HistoricalPerformanceTable } from '../../components/HistoricalPerformanceTable';
import { CalculationMethodology } from '../../components/CalculationMethodology';
import { CurrentStatusCard } from '../../components/CurrentStatusCard';
import { TargetComponentsCard } from '../../components/TargetComponentsCard';
import { MonthlyInsightCard } from '../../components/MonthlyInsightCard';
import { StatusPill } from '../../components/StatusPill';
import { BudgetPlanningChart } from '../../components/BudgetPlanningChart';
import { BudgetCard } from '../../components/BudgetCard';
import { ExecutionCard } from '../../components/ExecutionCard';
import { SandboxConfigModal } from '../../components/SandboxConfigModal';
import { SandboxResultsModal } from '../../components/SandboxResultsModal';
import { SandboxLoadingModal } from '../../components/SandboxLoadingModal';
import { useAuth } from '../../context/AuthContext';
import { LAYOUT_SPACING, COLORS, TYPOGRAPHY, SPACING } from '../../design-tokens';
import { calculateSimulationResults, SimulationResults } from '../../utils/sandboxCalculations';

export default function ManagementForecastPage() {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState('forecast-vs-actuals');
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [sandboxScenarios, setSandboxScenarios] = useState<any[]>([]);
  const [simulationResults, setSimulationResults] = useState<SimulationResults | null>(null);
  const { logout } = useAuth();

  // Handle toggle change - open modal when turning on
  const handleSandboxToggle = (isOn: boolean) => {
    if (isOn) {
      setIsSandboxMode(true);
      setShowSandboxModal(true);
    } else {
      // Turn off sandbox mode
      setIsSandboxMode(false);
      setShowResultsModal(false);
      setSandboxScenarios([]);
      setSimulationResults(null);
    }
  };

  // Handle applying sandbox configurations
  const handleApplySandbox = (scenarios: any[]) => {
    setSandboxScenarios(scenarios);
    setIsSandboxMode(true);
    setShowSandboxModal(false);

    // Show loading modal
    setShowLoadingModal(true);

    // Calculate simulation results after a brief delay
    setTimeout(() => {
      const results = calculateSimulationResults(scenarios);
      setSimulationResults(results);

      // Hide loading and show results
      setShowLoadingModal(false);
      setShowResultsModal(true);
    }, 1500);
  };

  // Define tabs
  const tabs: Tab[] = [
    { id: 'forecast-vs-actuals', label: 'Forecast Vs Actuals' },
    { id: 'historical-performance', label: 'Historical Performance' },
    { id: 'target-inventory', label: 'Target Inventory' },
    { id: 'distribution-planning', label: 'Distribution Planning' },
    { id: 'budget-planning', label: 'Budget Planning' },
  ];

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
            activeItem="forecast"
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
                title="Forecast Management"
                subtitle="Track and manage inventory forecasts with precision across all terminals"
                onSandboxToggle={handleSandboxToggle}
                isSandboxMode={isSandboxMode}
              />
            </div>

            {/* Tabs Section */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* Tabs */}
              <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />

              {/* Tab Content */}
              {activeTabId === 'forecast-vs-actuals' && (
                <>
                  {/* Forecast Chart */}
                  <ForecastChart isSandboxMode={isSandboxMode} simulationResults={simulationResults} />

                  {/* Metrics Cards Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                    }}
                  >
                    <ForecastMetricCard
                      label="Avg forecast per terminal"
                      value="66.05k"
                      change={2.5}
                      changeLabel="+1.55k vs. last month"
                      isSandboxMode={isSandboxMode}
                      simulatedValue={simulationResults?.avgForecast}
                      simulatedChange={simulationResults?.avgForecastChange}
                    />
                    <ForecastMetricCard
                      label="Avg turnover rate"
                      value="5.1 days"
                      change={-8}
                      changeLabel="-0.4 days vs. last month"
                      variant="success"
                      isSandboxMode={isSandboxMode}
                      simulatedValue={simulationResults?.avgTurnover}
                      simulatedChange={simulationResults?.avgTurnoverChange}
                    />
                    <ForecastMetricCard
                      label="Cost per ton"
                      value="$448.56"
                      change={3.2}
                      changeLabel="+$13.92 vs. last month"
                      isSandboxMode={isSandboxMode}
                      simulatedValue={simulationResults?.costPerTon}
                      simulatedChange={simulationResults?.costPerTonChange}
                    />
                    <ForecastMetricCard
                      label="Predicted variance"
                      value="8.9%"
                      change={-12}
                      changeLabel="-1.2% vs. last month"
                      variant="success"
                      isSandboxMode={isSandboxMode}
                      simulatedValue={simulationResults?.predictedVariance}
                      simulatedChange={simulationResults?.predictedVarianceChange}
                    />
                  </div>
                </>
              )}

              {activeTabId === 'historical-performance' && (
                <FadeInSection>
                  <HistoricalPerformanceTable />
                </FadeInSection>
              )}

              {activeTabId === 'target-inventory' && (
                <FadeInSection>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Section Header */}
                    <SectionHeader
                      level="primary"
                      title="Target Inventory Overview"
                      subtitle="Methodology for calculating optimal inventory levels"
                    />

                    {/* Three Column Layout */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '16px',
                      }}
                    >
                      <CurrentStatusCard />
                      <TargetComponentsCard />
                      <MonthlyInsightCard />
                    </div>

                    {/* Calculation Methodology */}
                    <CalculationMethodology />

                    {/* Note */}
                    <div
                      style={{
                        backgroundColor: COLORS.surface.paper,
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '4px',
                          backgroundColor: COLORS.primary[500],
                          borderRadius: '2px',
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: TYPOGRAPHY.fontFamily.body,
                          fontSize: TYPOGRAPHY.fontSize.sm,
                          lineHeight: TYPOGRAPHY.lineHeight.sm,
                          color: COLORS.text.secondary,
                        }}
                      >
                        Target inventory levels are recalculated weekly based on rolling averages and updated demand
                        forecasts. The methodology incorporates seasonal adjustments and regional market conditions to
                        optimize inventory positioning.
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              )}

              {activeTabId === 'distribution-planning' && (
                <FadeInSection>
                  <div
                    style={{
                      backgroundColor: COLORS.surface.paper,
                      borderRadius: '24px',
                      padding: '48px',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.fontSize.md }}>
                      Distribution Planning content coming soon
                    </p>
                  </div>
                </FadeInSection>
              )}

              {activeTabId === 'budget-planning' && (
                <FadeInSection>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Budget Chart */}
                    <BudgetPlanningChart />

                    {/* Budget Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <BudgetCard
                        label="Total Budget"
                        amount="$12.4M"
                        change={8.2}
                        variant="neutral"
                        description="Allocated for Q1 2025"
                      />
                      <BudgetCard
                        label="Spent to Date"
                        amount="$7.8M"
                        change={12.5}
                        variant="warning"
                        description="63% of total budget"
                      />
                      <BudgetCard
                        label="Remaining"
                        amount="$4.6M"
                        change={-12.5}
                        variant="success"
                        description="37% available"
                      />
                    </div>

                    {/* Execution Summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <ExecutionCard
                        title="Budget Execution Rate"
                        percentage={63}
                        status="On Track"
                        statusVariant="success"
                        details="Spending aligns with timeline projections"
                      />
                      <ExecutionCard
                        title="Forecast Accuracy"
                        percentage={87}
                        status="Excellent"
                        statusVariant="info"
                        details="Within 5% variance of projections"
                      />
                    </div>
                  </div>
                </FadeInSection>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />

      {/* Compact Alert Banner */}
      <CompactAlertBanner />

      {/* Sandbox Modals */}
      <SandboxConfigModal
        isOpen={showSandboxModal}
        onClose={() => {
          setShowSandboxModal(false);
          setIsSandboxMode(false);
        }}
        onApply={handleApplySandbox}
      />

      <SandboxLoadingModal isOpen={showLoadingModal} />

      <SandboxResultsModal
        isOpen={showResultsModal}
        onClose={() => {
          setShowResultsModal(false);
          setIsSandboxMode(false);
          setSandboxScenarios([]);
          setSimulationResults(null);
        }}
        results={simulationResults}
      />
    </div>
  );
}
