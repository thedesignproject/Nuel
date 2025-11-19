'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TYPOGRAPHY, COLORS } from '../design-tokens';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onTabChange, children }) => {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    const newTabId = tabs[newIndex].id;
    onTabChange(newTabId);
    tabRefs.current[newTabId]?.focus();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Bar */}
      <div
        role="tablist"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '72px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderBottom: '0.5px solid #A8C3FF',
          width: '100%',
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                flex: '1 0 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '72px',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: '24px',
                paddingBottom: '24px',
                gap: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                borderBottom: isActive ? '2px solid #17263D' : 'none',
                marginBottom: '-0.5px', // Offset the container border
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? COLORS.text.primary : COLORS.text.secondary,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    margin: 0,
                    transition: 'color 150ms ease',
                  }}
                >
                  {tab.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        style={{
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
