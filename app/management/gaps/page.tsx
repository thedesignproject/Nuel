'use client';

import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { Sidebar } from '../../components/Sidebar';
import { NotificationsPanel } from '../../components/NotificationsPanel';
import { MetricCard } from '../../components/MetricCard';
import { UntappedPotentialTable } from '../../components/UntappedPotentialTable';
import { useAuth } from '../../context/AuthContext';
import { LAYOUT_SPACING } from '../../design-tokens';

export default function ManagementGapsPage() {
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
            mode="management"
            variant="expanded"
            activeItem="gaps"
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
                title="Untapped Potential"
                subtitle="Track optimization opportunities and understand manager decision-making with comprehensive reason analysis"
              />
            </div>

            {/* Page Content */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* Metric Cards Section */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <MetricCard
                  icon="dollar"
                  title="Total Missed Savings"
                  value="$52,200"
                  trend={{
                    direction: 'up',
                    percentage: '+12%',
                    label: 'vs last month',
                  }}
                  comparison={{
                    preNuel: '$46,600',
                    postNuel: '$52,200',
                  }}
                />
                <MetricCard
                  icon="target"
                  title="Opportunities Tracked"
                  value="528"
                  trend={{
                    direction: 'down',
                    percentage: '-8%',
                    label: 'vs last month',
                  }}
                  comparison={{
                    preNuel: '574',
                    postNuel: '528',
                  }}
                />
                <MetricCard
                  icon="trending-down"
                  title="Justification Rate"
                  value="68%"
                  trend={{
                    direction: 'up',
                    percentage: '+5%',
                    label: 'vs last month',
                  }}
                  comparison={{
                    preNuel: '63%',
                    postNuel: '68%',
                  }}
                />
                <MetricCard
                  icon="package"
                  title="Avg Response Time"
                  value="2.4 days"
                  trend={{
                    direction: 'up',
                    percentage: '+0.3 days',
                    label: 'vs last month',
                  }}
                  comparison={{
                    preNuel: '2.1 days',
                    postNuel: '2.4 days',
                  }}
                />
              </div>

              {/* Untapped Potential Table Section */}
              <UntappedPotentialTable />
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
