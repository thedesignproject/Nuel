'use client';

import { useState } from 'react';
import { TopBar } from '../../components/TopBar';
import { Sidebar } from '../../components/Sidebar';
import { NotificationsPanel } from '../../components/NotificationsPanel';
import { InventoryAlerts } from '../../components/InventoryAlerts';
import { InventoryMap } from '../../components/InventoryMap';
import { RegionalTargets } from '../../components/RegionalTargets';
import { InventoryDetailsTable } from '../../components/InventoryDetailsTable';
import { LAYOUT_SPACING } from '../../design-tokens';

export default function ManagementInventoryPage() {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

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
            activeItem="inventory"
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
                title="Inventory Management"
                subtitle="Complete visibility and control of fertilizer inventory across all facilities"
              />
            </div>

            {/* Page Content */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* Inventory Alerts and Map Section */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  width: '100%',
                }}
              >
                <InventoryAlerts />
                <InventoryMap />
              </div>

              {/* Regional Targets Section */}
              <RegionalTargets />

              {/* Inventory Details Table Section */}
              <InventoryDetailsTable />
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
