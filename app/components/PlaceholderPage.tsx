'use client';

import { useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { NotificationsPanel } from './NotificationsPanel';
import { LAYOUT_SPACING } from '../design-tokens';

export interface PlaceholderPageProps {
  /** Title of the page */
  title: string;
  /** Active navigation item ID */
  activeItem: string;
  /** Sidebar mode - executive or management */
  mode?: 'executive' | 'management';
}

/**
 * PlaceholderPage Component
 * Displays a "Coming Soon" page with consistent layout
 */
export function PlaceholderPage({ title, activeItem, mode = 'executive' }: PlaceholderPageProps) {
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
            mode={mode}
            variant="expanded"
            activeItem={activeItem}
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
                title={title}
                subtitle="This page is under development"
              />
            </div>

            {/* Page Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-[24px] p-[48px] text-center max-w-[600px]">
                <h2 className="font-['DM_Sans'] font-bold text-[32px] leading-[40px] text-[#17263D] mb-[16px]">
                  {title}
                </h2>
                <p className="font-['DM_Sans'] font-normal text-[18px] leading-[26px] text-[#7F8FA4]">
                  Coming Soon
                </p>
              </div>
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
