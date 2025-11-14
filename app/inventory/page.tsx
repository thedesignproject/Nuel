'use client';

import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { LAYOUT_SPACING } from '../design-tokens';

export default function InventoryPage() {
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
          <Sidebar mode="executive" variant="expanded" activeItem="inventory" />
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
            {/* Page Content */}
            <div className="flex flex-col gap-[24px]">
              {/* Inventory Top Bar */}
              <TopBar
                title="Inventory Management"
                subtitle="Complete visibility and control of fertilizer inventory across all facilities"
              />

              {/* Content Area - Coming Soon */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '48px',
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
                    fontWeight: 400,
                    color: '#7F8FA4',
                  }}
                >
                  Executive Inventory content coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
