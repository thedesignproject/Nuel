'use client';

import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { ActivityAlertWidget } from '../components/ActivityAlertWidget';
import { Tabs, Tab } from '../components/Tabs';
import { ForecastChart } from '../components/ForecastChart';
import { SectionHeader } from '../components/SectionHeader';
import { FadeInSection } from '../components/FadeInSection';
import { LAYOUT_SPACING } from '../design-tokens';

export default function ForecastPage() {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState('forecast-vs-actuals');

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
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 500,
                              color: '#7F8FA4',
                            }}
                          >
                            Historical Performance content coming soon
                          </p>
                        </div>
                      )}

                      {activeTabId === 'target-inventory' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 500,
                              color: '#7F8FA4',
                            }}
                          >
                            Target Inventory content coming soon
                          </p>
                        </div>
                      )}

                      {activeTabId === 'distribution-planning' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 500,
                              color: '#7F8FA4',
                            }}
                          >
                            Distribution Planning content coming soon
                          </p>
                        </div>
                      )}

                      {activeTabId === 'budget-planning' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'DM Sans',
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontWeight: 500,
                              color: '#7F8FA4',
                            }}
                          >
                            Budget Planning content coming soon
                          </p>
                        </div>
                      )}
                    </div>
                  </Tabs>
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
