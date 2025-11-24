'use client';

import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { useAuth } from '../context/AuthContext';
import { ActivityAlertWidget } from '../components/ActivityAlertWidget';
import { MetricCard } from '../components/MetricCard';
import { KPICard } from '../components/KPICard';
import { RegionalPerformanceHeader } from '../components/RegionalPerformanceHeader';
import { PerformanceCard } from '../components/PerformanceCard';
import { SectionHeader } from '../components/SectionHeader';
import { CostTrendChart } from '../components/CostTrendChart';
import { ExternalFactorsList } from '../components/ExternalFactorsList';
import { OptimizationRejectionsChart } from '../components/OptimizationRejectionsChart';
import { FadeInSection } from '../components/FadeInSection';
import { RegionalPerformanceTable } from '../components/RegionalPerformanceTable';
import { LAYOUT_SPACING } from '../design-tokens';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState(0); // 0 = Grid View, 1 = Table View
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const { logout } = useAuth();
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
            activeItem="dashboard"
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
                title="Overview Dashboard"
                subtitle="Company-wide performance metrics and supply chain optimization impact"
              />
            </div>

            {/* Dashboard Content */}
            <div className="flex flex-col gap-[24px]">
            {/* Active Alerts Section */}
            <FadeInSection delay={0}>
              <ActivityAlertWidget />
            </FadeInSection>

            {/* Metric Cards Section */}
            <FadeInSection delay={50}>
              <div className="flex gap-[12px] w-full">
              <MetricCard
                icon="dollar"
                title="Total Cost Savings"
                value="$12,500,000"
                trend={{
                  direction: 'up',
                  percentage: '+52.4%',
                  label: 'vs. previous year',
                }}
                comparison={{
                  preNuel: '$8,200,000',
                  postNuel: '$12,500,000',
                }}
              />
              <MetricCard
                icon="trending-down"
                title="Average Cost per Ton"
                value="$245.80"
                trend={{
                  direction: 'down',
                  percentage: '-17.6%',
                  label: 'improvement',
                }}
                comparison={{
                  preNuel: '$298.50',
                  postNuel: '$245.80',
                }}
              />
              <MetricCard
                icon="package"
                title="Total Volume Moved"
                value="2.45M Tons"
                trend={{
                  direction: 'up',
                  percentage: '+16.7%',
                  label: 'vs. previous year',
                }}
                comparison={{
                  preNuel: '2.10M',
                  postNuel: '2.45M',
                }}
              />
              <MetricCard
                icon="target"
                title="Optimization Rate"
                value="87.5%"
                trend={{
                  direction: 'up',
                  percentage: '+155.8%',
                  label: 'vs. previous year',
                }}
                comparison={{
                  preNuel: '34.2%',
                  postNuel: '87.5%',
                }}
              />
              </div>
            </FadeInSection>

            {/* Regional Performance Section */}
            <FadeInSection delay={100}>
              <div
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
              {/* Section Header with Tabs */}
              <RegionalPerformanceHeader
                activeView={activeView}
                onViewChange={setActiveView}
              />

              {/* Performance Cards Grid (only show in Grid View) */}
              {activeView === 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '11.5px',
                    width: '100%',
                  }}
                >
                  {/* Northeast Region - Warning */}
                  <PerformanceCard
                    region="Northeast"
                    directionIcon="down-left"
                    alerts={4}
                    status="warning"
                    executionRate="78.3%"
                    volume="420K Tons"
                    savings="$2M"
                    untappedPotential="$720K"
                    facilities={12}
                    plants={8}
                    terminals={4}
                    onAlertsClick={() => console.log('View Northeast alerts')}
                    onReviewClick={() => console.log('Review Northeast potential')}
                  />

                  {/* Midwest Region - Good */}
                  <PerformanceCard
                    region="Midwest"
                    directionIcon="up-right"
                    alerts={2}
                    status="good"
                    executionRate="89.2%"
                    volume="680K Tons"
                    savings="$3M"
                    untappedPotential="$420K"
                    facilities={18}
                    plants={12}
                    terminals={6}
                    onAlertsClick={() => console.log('View Midwest alerts')}
                    onReviewClick={() => console.log('Review Midwest potential')}
                  />

                  {/* Southeast Region - Good */}
                  <PerformanceCard
                    region="Southeast"
                    directionIcon="down-right"
                    alerts={1}
                    status="good"
                    executionRate="85.7%"
                    volume="750K Tons"
                    savings="$3M"
                    untappedPotential="$580K"
                    facilities={15}
                    plants={10}
                    terminals={5}
                    onAlertsClick={() => console.log('View Southeast alerts')}
                    onReviewClick={() => console.log('Review Southeast potential')}
                  />

                  {/* West Region - Excellent */}
                  <PerformanceCard
                    region="West"
                    directionIcon="up-right"
                    alerts={0}
                    status="excellent"
                    executionRate="91.5%"
                    volume="600K Tons"
                    savings="$3M"
                    untappedPotential="$280K"
                    facilities={14}
                    plants={9}
                    terminals={5}
                    onReviewClick={() => console.log('Review West potential')}
                  />
                </div>
              )}

              {/* Table View */}
              {activeView === 1 && (
                <RegionalPerformanceTable
                  data={[
                    {
                      location: 'Midwest',
                      plants: 12,
                      terminals: 6,
                      volume: 680000,
                      costPerTon: 42.15,
                      costPerTonPre: 48.20,
                      currentCost: 2850000,
                      currentCostPre: 3275000,
                      preNuel: 3275000,
                      executionRate: 89.2,
                      untappedPotential: 420000,
                      alerts: 2,
                      status: 'good',
                    },
                    {
                      location: 'Southeast',
                      plants: 10,
                      terminals: 5,
                      volume: 750000,
                      costPerTon: 38.75,
                      costPerTonPre: 45.80,
                      currentCost: 2906250,
                      currentCostPre: 3435000,
                      preNuel: 3435000,
                      executionRate: 85.7,
                      untappedPotential: 580000,
                      alerts: 1,
                      status: 'good',
                    },
                    {
                      location: 'Northeast',
                      plants: 8,
                      terminals: 4,
                      volume: 420000,
                      costPerTon: 51.20,
                      costPerTonPre: 58.50,
                      currentCost: 2150400,
                      currentCostPre: 2457000,
                      preNuel: 2457000,
                      executionRate: 78.3,
                      untappedPotential: 720000,
                      alerts: 4,
                      status: 'warning',
                    },
                    {
                      location: 'West',
                      plants: 9,
                      terminals: 5,
                      volume: 600000,
                      costPerTon: 35.40,
                      costPerTonPre: 42.90,
                      currentCost: 2124000,
                      currentCostPre: 2574000,
                      preNuel: 2574000,
                      executionRate: 91.5,
                      untappedPotential: 280000,
                      alerts: 0,
                      status: 'excellent',
                    },
                    {
                      location: 'Southwest',
                      plants: 7,
                      terminals: 11,
                      volume: 590000,
                      costPerTon: 44.80,
                      costPerTonPre: 52.30,
                      currentCost: 2643200,
                      currentCostPre: 3085700,
                      preNuel: 3085700,
                      executionRate: 82.5,
                      untappedPotential: 442500,
                      alerts: 3,
                      status: 'good',
                    },
                    {
                      location: 'Central',
                      plants: 6,
                      terminals: 8,
                      volume: 520000,
                      costPerTon: 46.30,
                      costPerTonPre: 53.10,
                      currentCost: 2407600,
                      currentCostPre: 2761200,
                      preNuel: 2761200,
                      executionRate: 84.8,
                      untappedPotential: 353600,
                      alerts: 2,
                      status: 'good',
                    },
                  ]}
                />
              )}
              </div>
            </FadeInSection>

            {/* Cost Trend Analysis Section */}
            <FadeInSection delay={150}>
              <div
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
                icon="chart-line"
                title="Cost Trend Analysis"
                description="Monthly cost trends showing Pre-Nuel vs Post-Nuel performance"
              />

              {/* Chart */}
              <CostTrendChart />
              </div>
            </FadeInSection>

            {/* External Factors Impact Section */}
            <FadeInSection delay={200}>
              <div
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
                icon="chart-line"
                title="External Factors Impact"
                description="Click factors to view detailed impact analysis and mitigation strategies"
              />

              {/* External Factors List */}
              <ExternalFactorsList
                items={[
                  {
                    icon: 'gas-pump',
                    title: 'Fuel Cost Impact',
                    description: 'Rising diesel fuel costs affecting transportation expenses',
                    value: '+$12.5/Ton',
                    secondaryValue: '+15.2%',
                    trend: 'up',
                  },
                  {
                    icon: 'trend-up',
                    title: 'Inflation Impact',
                    description: 'General inflation affecting operational costs',
                    value: '+$4.3/Ton',
                    secondaryValue: '+5.8%',
                    trend: 'up',
                  },
                  {
                    icon: 'receipt',
                    title: 'Tariff Impact',
                    description: 'Import tariffs on specialty fertilizer components',
                    value: '+$48.2/Ton',
                    secondaryValue: '+11.4%',
                    trend: 'up',
                  },
                  {
                    icon: 'train',
                    title: 'Rail Service Improvement',
                    description: 'Enhanced rail service reducing transportation costs',
                    value: '+$3.1/Ton',
                    secondaryValue: '4.2%',
                    trend: 'down',
                  },
                  {
                    icon: 'sparkle',
                    title: 'Nuel System Optimization',
                    description: 'AI-driven logistics optimization reducing operational costs',
                    value: '+$15.8/Ton',
                    secondaryValue: '18.7%',
                    trend: 'down',
                  },
                  {
                    title: 'Net Impact:',
                    description: '',
                    value: '-$3.4/Ton',
                    secondaryValue: 'Combined factors (Nuel optimized)',
                    trend: 'down',
                    isNetImpact: true,
                  },
                ]}
              />
              </div>
            </FadeInSection>

            {/* Optimization Rejections Analysis Section */}
            <FadeInSection delay={250}>
              <div
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
                icon="chart-line"
                title="Optimization Rejections Analysis"
                description="Quarterly analysis of rejected optimization recommendations by category"
              />

              {/* Chart with Integrated Cards */}
              <OptimizationRejectionsChart />
              </div>
            </FadeInSection>

            {/* KPI Cards Section */}
            <FadeInSection delay={300}>
              <div className="flex gap-[12px] w-full">
                <KPICard
                  icon="check-circle"
                  title="Order Fulfillment Rate"
                  value="94.2%"
                  progressBar={{
                    value: "94.2%",
                    label: "Target 95%"
                  }}
                  comparison={{
                    preNuel: "78.5%",
                    postNuel: "94.2%"
                  }}
                  variant="standard"
                />
                <KPICard
                  icon="package"
                  title="Inventory Optimization"
                  value="87.5%"
                  progressBar={{
                    value: "87.5%",
                    label: "Target 90%"
                  }}
                  comparison={{
                    preNuel: "62.3%",
                    postNuel: "87.5%"
                  }}
                  variant="standard"
                />
                <KPICard
                  icon="clock"
                  title="Seasonal Readiness"
                  value="92.8%"
                  progressBar={{
                    value: "92.8%",
                    label: "Peak: March-June"
                  }}
                  comparison={{
                    preNuel: "74.2%",
                    postNuel: "92.8%"
                  }}
                  variant="standard"
                />
                <KPICard
                  icon="bell"
                  title="Active Alerts"
                  value="2"
                  alertTags={[
                    { label: "1 critical", color: "error" },
                    { label: "1 warning", color: "warning" }
                  ]}
                  onReviewClick={() => console.log('Review alerts')}
                  variant="alert"
                />
              </div>
            </FadeInSection>

            {/* Regional Performance Summary Table Section */}
            <FadeInSection delay={350}>
              <div
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
                  icon="chart-line"
                  title="Regional Performance Summary"
                  description="Comprehensive performance metrics by operational region with Pre-Nuel vs Post-Nuel tracking"
                  buttons={[
                    {
                      label: "View Details",
                      onClick: () => console.log('View regional details'),
                      variant: 'secondary',
                    }
                  ]}
                />

                {/* Regional Performance Table */}
                <RegionalPerformanceTable
                  data={[
                    {
                      location: 'Midwest',
                      plants: 12,
                      terminals: 6,
                      volume: 680000,
                      costPerTon: 42.15,
                      costPerTonPre: 48.20,
                      currentCost: 2850000,
                      currentCostPre: 3275000,
                      preNuel: 3275000,
                      executionRate: 89.2,
                      untappedPotential: 420000,
                      alerts: 2,
                      status: 'good',
                    },
                    {
                      location: 'Southeast',
                      plants: 10,
                      terminals: 5,
                      volume: 750000,
                      costPerTon: 38.75,
                      costPerTonPre: 45.80,
                      currentCost: 2906250,
                      currentCostPre: 3435000,
                      preNuel: 3435000,
                      executionRate: 85.7,
                      untappedPotential: 580000,
                      alerts: 1,
                      status: 'good',
                    },
                    {
                      location: 'Northeast',
                      plants: 8,
                      terminals: 4,
                      volume: 420000,
                      costPerTon: 51.20,
                      costPerTonPre: 58.50,
                      currentCost: 2150400,
                      currentCostPre: 2457000,
                      preNuel: 2457000,
                      executionRate: 78.3,
                      untappedPotential: 720000,
                      alerts: 4,
                      status: 'warning',
                    },
                    {
                      location: 'West',
                      plants: 9,
                      terminals: 5,
                      volume: 600000,
                      costPerTon: 35.40,
                      costPerTonPre: 42.90,
                      currentCost: 2124000,
                      currentCostPre: 2574000,
                      preNuel: 2574000,
                      executionRate: 91.5,
                      untappedPotential: 280000,
                      alerts: 0,
                      status: 'excellent',
                    },
                    {
                      location: 'Southwest',
                      plants: 7,
                      terminals: 11,
                      volume: 590000,
                      costPerTon: 44.80,
                      costPerTonPre: 52.30,
                      currentCost: 2643200,
                      currentCostPre: 3085700,
                      preNuel: 3085700,
                      executionRate: 82.5,
                      untappedPotential: 442500,
                      alerts: 3,
                      status: 'good',
                    },
                    {
                      location: 'Central',
                      plants: 6,
                      terminals: 8,
                      volume: 520000,
                      costPerTon: 46.30,
                      costPerTonPre: 53.10,
                      currentCost: 2407600,
                      currentCostPre: 2761200,
                      preNuel: 2761200,
                      executionRate: 84.8,
                      untappedPotential: 353600,
                      alerts: 2,
                      status: 'good',
                    },
                  ]}
                />
              </div>
            </FadeInSection>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
      />
    </div>
  );
}
