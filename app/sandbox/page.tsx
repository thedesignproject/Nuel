'use client';

import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { ActivityAlertWidget } from '../components/ActivityAlertWidget';
import { Tabs, Tab } from '../components/Tabs';
import { ForecastChart } from '../components/ForecastChart';
import { ForecastMetricCard } from '../components/ForecastMetricCard';
import { SectionHeader } from '../components/SectionHeader';
import { FadeInSection } from '../components/FadeInSection';
import { HistoricalPerformanceTable } from '../components/HistoricalPerformanceTable';
import { CalculationMethodology } from '../components/CalculationMethodology';
import { CurrentStatusCard } from '../components/CurrentStatusCard';
import { TargetComponentsCard } from '../components/TargetComponentsCard';
import { MonthlyInsightCard } from '../components/MonthlyInsightCard';
import { StatusPill } from '../components/StatusPill';
import { BudgetPlanningChart } from '../components/BudgetPlanningChart';
import { BudgetCard } from '../components/BudgetCard';
import { ExecutionCard } from '../components/ExecutionCard';
import { Toggle } from '../components/Toggle';
import { SandboxConfigModal } from '../components/SandboxConfigModal';
import { SandboxResultsModal } from '../components/SandboxResultsModal';
import { SandboxLoadingModal } from '../components/SandboxLoadingModal';
import { useAuth } from '../context/AuthContext';
import { LAYOUT_SPACING, COLORS, TYPOGRAPHY, SPACING } from '../design-tokens';
import { calculateSimulationResults, SimulationResults } from '../utils/sandboxCalculations';

export default function ForecastPage() {
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
    setIsSandboxMode(isOn);
    if (isOn) {
      setShowSandboxModal(true);
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
            mode="executive"
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
                title="Operational Forecasting & Optimization"
                subtitle="Real-time, adaptive forecast that continuously optimizes based on live orders, inventory, and capacity."
              />

              {/* Sandbox Mode Toggle */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 'fit-content',
                }}
              >
                <Toggle
                  label="Sandbox Mode"
                  isOn={isSandboxMode}
                  onChange={handleSandboxToggle}
                />
              </div>
            </div>

            {/* Forecast Content */}
            <div className="flex flex-col gap-[24px]">
              {/* Active Alerts Section */}
              <FadeInSection delay={0}>
                <ActivityAlertWidget />
              </FadeInSection>

              {/* Tabs and Chart Section */}
              <FadeInSection delay={50}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {/* Tabs */}
                  <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={setActiveTabId}>
                    {/* Tab Content */}
                    <div
                      style={{
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      {activeTabId === 'forecast-vs-actuals' && (
                        <>
                          {/* Section Header */}
                          <SectionHeader
                            level="primary"
                            icon="chart-line"
                            title="Operational Forecast: Orders vs Actuals (9-12 Weeks)"
                            description="Unlike traditional annual forecasts, this view updates constantly with new data inputs."
                            buttons={[
                              {
                                label: 'Detailed View',
                                onClick: () => console.log('View details'),
                                variant: 'secondary',
                              },
                            ]}
                          />

                          {/* Chart */}
                          <ForecastChart />
                        </>
                      )}

                      {activeTabId === 'historical-performance' && (
                        <>
                          {/* Section Header */}
                          <SectionHeader
                            level="secondary"
                            title="Current Forecast Accuracy & Target Progress"
                            tag="KTS"
                            description="Focus on current performance vs 90% accuracy targets with issue tracking"
                          />

                          {/* Subtitle */}
                          <div style={{ marginTop: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'DM Sans',
                                fontSize: '18px',
                                lineHeight: '26px',
                                fontWeight: 400,
                                color: COLORS.text.primary,
                                margin: 0,
                              }}
                            >
                              Current Performance vs 90% Target
                            </p>
                          </div>

                          {/* Historical Performance Table */}
                          <div style={{ marginTop: '24px' }}>
                            <HistoricalPerformanceTable />
                          </div>
                        </>
                      )}

                      {activeTabId === 'target-inventory' && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            width: '100%',
                          }}
                        >
                          {/* Top Row - Calculations and Status Cards */}
                          <div
                            style={{
                              display: 'flex',
                              gap: '24px',
                              width: '100%',
                              alignItems: 'flex-start',
                            }}
                          >
                            {/* Left Column - Calculation Methodology */}
                            <CalculationMethodology />

                            {/* Right Column - Status Cards */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                                flex: 1,
                              }}
                            >
                              {/* Current Status Card */}
                              <CurrentStatusCard
                                status="warning"
                                productionRequired="34,548 Tons"
                                capacityUtilization={88}
                                footerText="Current inventory covers 73% of target"
                              />

                              {/* Target Components Card with Pie Chart */}
                              <TargetComponentsCard
                                subtitle="Current inventory covers 73% of target"
                                data={[
                                  { label: 'Open Orders', value: 84250, percentage: 65.6, color: '#1C58F7' },
                                  { label: 'Seasonal', value: 32892, percentage: 25.0, color: '#A8C3FF' },
                                  { label: 'Safety', value: 12826, percentage: 9.4, color: '#E3ECFF' },
                                ]}
                              />
                            </div>
                          </div>

                          {/* Monthly Applications & Insights Section */}
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: '24px',
                              padding: SPACING[24],
                              display: 'flex',
                              flexDirection: 'column',
                              gap: SPACING[16],
                            }}
                          >
                            {/* Section Header */}
                            <SectionHeader
                              level="primary"
                              icon="chart-line"
                              title="Monthly Applications & Insights"
                              description="How this calculation applies across different months with actionable insights"
                              buttons={[
                                {
                                  label: 'Jul 2025 - Dec 2025',
                                  onClick: () => console.log('Date range'),
                                  variant: 'secondary',
                                },
                              ]}
                            />

                            {/* Status Pills */}
                            <div style={{ display: 'flex', gap: SPACING[12] }}>
                              <StatusPill label="1 Critical" variant="error" />
                              <StatusPill label="4 Warning" variant="warning" />
                              <StatusPill label="1 Good" variant="success" />
                            </div>

                            {/* Metric Cards Grid */}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 365px)',
                                gap: SPACING[16],
                                paddingTop: SPACING[8],
                              }}
                            >
                              {/* July */}
                              <MonthlyInsightCard
                                month="July"
                                isCurrent={true}
                                alertText="1 Alert"
                                status="warning"
                                eyebrow="Target vs Current"
                                value="-2,049 Tons"
                                coverageRatio="0.7X"
                                progressPercentage={83}
                                progressText="83% 9,752/11,801 Tons"
                                description="Monitor weekly and prepare backup supply"
                              />

                              {/* August */}
                              <MonthlyInsightCard
                                month="August"
                                isCurrent={false}
                                alertText="2 Alerts"
                                status="warning"
                                eyebrow="Target vs Current"
                                value="-3,097 Tons"
                                coverageRatio="0.8X"
                                progressPercentage={75}
                                progressText="75% 9,054/12,151 Tons"
                                description="Plan additional production"
                              />

                              {/* September */}
                              <MonthlyInsightCard
                                month="September"
                                isCurrent={false}
                                alertText="1 Alert"
                                status="warning"
                                eyebrow="Target vs Current"
                                value="-2,364 Tons"
                                coverageRatio="0.8X"
                                progressPercentage={82}
                                progressText="82% 10,972/13,336 Tons"
                                description="Plan additional production"
                              />

                              {/* October */}
                              <MonthlyInsightCard
                                month="October"
                                isCurrent={false}
                                status="success"
                                eyebrow="Target vs Projected"
                                value="+1,663 Tons"
                                coverageRatio="1.2X"
                                progressPercentage={120}
                                progressText="120% 9,867/8,204 Tons"
                                description="Continue current operation"
                              />

                              {/* November */}
                              <MonthlyInsightCard
                                month="November"
                                isCurrent={false}
                                status="success"
                                eyebrow="Target vs Projected"
                                value="+2,497 Tons"
                                coverageRatio="1.2X"
                                progressPercentage={133}
                                progressText="133% 10,179/7,682 Tons"
                                description="Continue current operation"
                              />

                              {/* December */}
                              <MonthlyInsightCard
                                month="December"
                                isCurrent={false}
                                status="success"
                                eyebrow="Target vs Projected"
                                value="+1,392 Tons"
                                coverageRatio="1.2X"
                                progressPercentage={119}
                                progressText="119% 8,690/7,298 Tons"
                                description="Continue current operation"
                              />
                            </div>
                          </div>

                          {/* Execution Card: Optimization Opportunity */}
                          <ExecutionCard
                            id={3}
                            icon="bell"
                            title="Optimization Opportunity — Southeast Distribution"
                            status="warning"
                            statusLabel="Warning"
                            description="Excess capacity at Charleston with opportunity to optimize distribution routes and reduce transportation costs"
                            dueDate="7/15/2025"
                            potentialSavings="$95,000"
                            actionOptionsCount={2}
                            defaultExpanded={false}
                            quickActions={[
                              {
                                id: 'execute',
                                label: 'Execute Recommended',
                                icon: 'check',
                                variant: 'primary',
                                onClick: () => console.log('Execute Recommended'),
                              },
                              {
                                id: 'schedule',
                                label: 'Schedule for later',
                                icon: 'clock',
                                variant: 'secondary',
                                onClick: () => console.log('Schedule for later'),
                              },
                              {
                                id: 'dismiss',
                                label: 'Dismiss',
                                variant: 'text',
                                onClick: () => console.log('Dismiss'),
                              },
                            ]}
                            actionOptions={[
                              {
                                id: 'option1',
                                title: 'Route Optimization',
                                recommended: true,
                                description: 'Optimize delivery routes using Charleston excess capacity',
                                cost: '$6,500',
                                delivery: '2-3 days',
                                impact: 'Cost reduction',
                                buttonVariant: 'primary',
                                onExecute: () => console.log('Execute Route Optimization'),
                              },
                              {
                                id: 'option2',
                                title: 'Consolidation Strategy',
                                recommended: false,
                                description: 'Consolidate shipments through Charleston hub',
                                cost: '$9,000',
                                delivery: '4-5 days',
                                impact: 'Network efficiency',
                                buttonVariant: 'secondary',
                                onExecute: () => console.log('Execute Consolidation Strategy'),
                              },
                            ]}
                          />
                        </div>
                      )}

                      {activeTabId === 'distribution-planning' && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            width: '100%',
                          }}
                        >
                          {/* Section Header with Filters */}
                          <SectionHeader
                            level="primary"
                            title="Priority Distribution Actions"
                            tag="KTS"
                            description="Enhanced action cards with multiple solution options and status tracking"
                            showFilters={true}
                            filters={[
                              {
                                label: 'Critical (1)',
                                variant: 'error',
                                active: true,
                                onClick: () => console.log('Filter: Critical'),
                              },
                              {
                                label: 'Warning (2)',
                                variant: 'warning',
                                active: true,
                                onClick: () => console.log('Filter: Warning'),
                              },
                              {
                                label: 'Completed (1)',
                                variant: 'success',
                                active: false,
                                onClick: () => console.log('Filter: Completed'),
                              },
                            ]}
                          />

                          {/* Execution Cards */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '8px' }}>
                            {/* Card 1: Critical Shortage Risk */}
                            <ExecutionCard
                              id={1}
                              icon="bell"
                              title="Critical Shortage Risk — Houston Terminal"
                              status="critical"
                              statusLabel="Critical"
                              description="Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks"
                              dueDate="7/9/2025"
                              potentialSavings="$125,000"
                              actionOptionsCount={2}
                              defaultExpanded={true}
                              actionOptions={[
                                {
                                  id: 'option1',
                                  title: 'Emergency Transfer',
                                  recommended: true,
                                  description:
                                    'Transfer 3,000 tons from Donaldsonville via Priority Rail',
                                  cost: '$15,000',
                                  delivery: '2-3 days',
                                  impact: 'Complete resolution',
                                  buttonVariant: 'primary',
                                  onExecute: () => console.log('Execute Emergency Transfer'),
                                },
                                {
                                  id: 'option2',
                                  title: 'Split Transfer',
                                  recommended: false,
                                  description:
                                    '1,500 tons from Donaldsonville + 1,500 tons from Augusta',
                                  cost: '$22,000',
                                  delivery: '4-5 days',
                                  impact: 'With redundancy',
                                  buttonVariant: 'secondary',
                                  onExecute: () => console.log('Execute Split Transfer'),
                                },
                              ]}
                            />

                            {/* Card 2: Optimization Opportunity */}
                            <ExecutionCard
                              id={2}
                              icon="bell"
                              title="Optimization Opportunity — Midwest Region"
                              status="warning"
                              statusLabel="Warning"
                              description="Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks"
                              dueDate="7/3/2025"
                              potentialSavings="$125,000"
                              actionOptionsCount={2}
                              defaultExpanded={false}
                              quickActions={[
                                {
                                  id: 'execute',
                                  label: 'Execute Recommended',
                                  icon: 'check',
                                  variant: 'primary',
                                  onClick: () => console.log('Execute Recommended'),
                                },
                                {
                                  id: 'schedule',
                                  label: 'Schedule for later',
                                  icon: 'clock',
                                  variant: 'secondary',
                                  onClick: () => console.log('Schedule for later'),
                                },
                                {
                                  id: 'dismiss',
                                  label: 'Dismiss',
                                  variant: 'text',
                                  onClick: () => console.log('Dismiss'),
                                },
                              ]}
                              actionOptions={[
                                {
                                  id: 'option1',
                                  title: 'Optimization Plan A',
                                  recommended: true,
                                  description: 'Redistribute inventory using existing network capacity',
                                  cost: '$8,000',
                                  delivery: '3-4 days',
                                  impact: 'Balanced distribution',
                                  buttonVariant: 'primary',
                                  onExecute: () => console.log('Execute Plan A'),
                                },
                                {
                                  id: 'option2',
                                  title: 'Optimization Plan B',
                                  recommended: false,
                                  description: 'Consolidate shipments and optimize routing',
                                  cost: '$12,000',
                                  delivery: '5-6 days',
                                  impact: 'Long-term efficiency',
                                  buttonVariant: 'secondary',
                                  onExecute: () => console.log('Execute Plan B'),
                                },
                              ]}
                            />
                          </div>
                        </div>
                      )}

                      {activeTabId === 'budget-planning' && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            width: '100%',
                          }}
                        >
                          {/* Section Header */}
                          <SectionHeader
                            level="primary"
                            icon="chart-line"
                            title="8-12 Week Forecast: Orders vs Actuals"
                            tag="KTS"
                            description="Compare forecasts against actual orders entered and orders shipped for KTS"
                            buttons={[
                              {
                                label: 'Detailed View',
                                onClick: () => console.log('Detailed view'),
                                variant: 'secondary',
                              },
                              {
                                label: 'Configure',
                                onClick: () => console.log('Configure'),
                                variant: 'secondary',
                              },
                            ]}
                          />

                          {/* Budget Planning Chart */}
                          <div style={{ marginTop: '24px', width: '100%' }}>
                            <BudgetPlanningChart
                              data={[
                                { quarter: 'Q1 2026', forecast: 54000, budget: 50000 },
                                { quarter: 'Q2 2026', forecast: 61000, budget: 57000 },
                                { quarter: 'Q3 2026', forecast: 71000, budget: 68000 },
                                { quarter: 'Q4 2026', forecast: 57000, budget: 56000 },
                              ]}
                              width={1132}
                              height={268}
                              showLegend={true}
                              showTooltip={true}
                            />
                          </div>

                          {/* Budget Cards Section */}
                          <div
                            style={{
                              display: 'flex',
                              gap: '16px',
                              width: '100%',
                              marginTop: '24px',
                            }}
                          >
                            {/* Total Forecast Card */}
                            <BudgetCard
                              icon="trending-up"
                              title="Total Forecast"
                              tag="FY2026"
                              value="254,000 Tons"
                              insight="+5.8% vs. previous year"
                              highlightInsight={true}
                            />

                            {/* Budget Target Card */}
                            <BudgetCard
                              icon="target"
                              title="Budget Target"
                              value="249,000 Tons"
                              insight="+3.7% vs. previous year"
                              highlightInsight={true}
                            />

                            {/* Variance Card */}
                            <BudgetCard
                              icon="trending-down"
                              title="Variance"
                              value="+5,000 Tons"
                              insight="2.0% above budget"
                              showIndicatorLine={true}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Tabs>
                </div>
              </FadeInSection>

              {/* Forecast Metric Cards - Separate Section with No Background */}
              {activeTabId === 'forecast-vs-actuals' && (
                <FadeInSection delay={100}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      width: '100%',
                    }}
                  >
                    {/* Orders to Ship */}
                    <ForecastMetricCard
                      variant="bullet-list"
                      icon="truck"
                      iconBgColor="blue"
                      title="Orders to Ship"
                      value="$9,857 Tons"
                      showInfoIcon={true}
                      bulletItems={[
                        { label: 'New Orders', color: 'blue' },
                        { label: 'Distributed Carryover', color: 'black' },
                      ]}
                    />

                    {/* Orders Shipped */}
                    <ForecastMetricCard
                      variant="simple-text"
                      icon="package"
                      iconBgColor="gray"
                      title="Orders Shipped"
                      value="$3,874 Tons"
                      showInfoIcon={false}
                      description="Delivered this period"
                    />

                    {/* Distributed Carryover */}
                    <ForecastMetricCard
                      variant="simple-text"
                      icon="git-diff"
                      iconBgColor="black"
                      title="Distributed Carryover"
                      value="$315 Tons"
                      showInfoIcon={true}
                      description="Gap redistributed to future periods"
                    />

                    {/* Forecast Accuracy */}
                    <ForecastMetricCard
                      variant="trend-comparison"
                      icon="crosshair"
                      iconBgColor="blue"
                      title="Forecast Accuracy"
                      value="87.5%"
                      showInfoIcon={false}
                      trend={{
                        percentage: '+2.3%',
                        label: 'vs last period',
                      }}
                    />
                  </div>
                </FadeInSection>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
      />

      {/* Sandbox Configuration Modal */}
      <SandboxConfigModal
        isOpen={showSandboxModal}
        onClose={() => setShowSandboxModal(false)}
        onApply={handleApplySandbox}
      />

      {/* Sandbox Loading Modal */}
      <SandboxLoadingModal isOpen={showLoadingModal} />

      {/* Sandbox Results Modal */}
      <SandboxResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        results={simulationResults}
      />
    </div>
  );
}
