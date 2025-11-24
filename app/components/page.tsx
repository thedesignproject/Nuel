'use client';

import { useState } from 'react';
import { Button } from './Button';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { MetricCard } from './MetricCard';
import { KPICard } from './KPICard';
import { SectionHeader } from './SectionHeader';
import { PerformanceCard } from './PerformanceCard';
import { CostTrendChart } from './CostTrendChart';
import { OptimizationRejectionsChart } from './OptimizationRejectionsChart';
import { PieChart } from './PieChart';
import { BudgetPlanningChart } from './BudgetPlanningChart';
import { BudgetCard } from './BudgetCard';
import { MonthlyInsightCard } from './MonthlyInsightCard';
import { ExternalFactorsList } from './ExternalFactorsList';
import { StatusPill } from './StatusPill';
import { RegionalPerformanceTable } from './RegionalPerformanceTable';
import { ProgressBar } from './ProgressBar';
import { Input } from './Input';
import { Modal } from './Modal';
import { ExecutionCard } from './ExecutionCard';
import { executionCardTestData } from './ExecutionCard.test';
import { Cube, Factory, Package, GearSix } from '@phosphor-icons/react';

type TabType = 'buttons' | 'topbar' | 'sidebar' | 'metrics' | 'section-headers' | 'performance-cards' | 'charts' | 'lists' | 'status-pills' | 'tables' | 'progress-bars' | 'inputs' | 'modals' | 'execution-cards';

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('section-headers');
  const [activeToggle, setActiveToggle] = useState(0);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Active']);

  const handleFilterClick = (label: string) => {
    setActiveFilters(prev =>
      prev.includes(label)
        ? prev.filter(f => f !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="min-h-screen bg-white p-[80px]">
      <div className="w-full max-w-[1897px] mx-auto bg-white rounded-[24px] p-[80px] flex flex-col gap-[40px]">
        {/* Header */}
        <div className="bg-[#EAF1FF] rounded-[16px] p-[40px]">
          <h1 className="text-[48px] font-bold text-[#17263D] leading-normal tracking-[-1px]">
            Components
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="border-b-[2px] border-[#E5E7EB] flex gap-[8px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'buttons'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Buttons
            {activeTab === 'buttons' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('topbar')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'topbar'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Top Bar
            {activeTab === 'topbar' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('sidebar')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'sidebar'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Sidebar
            {activeTab === 'sidebar' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'metrics'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Metric Cards
            {activeTab === 'metrics' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('section-headers')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'section-headers'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Section Headers
            {activeTab === 'section-headers' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('performance-cards')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'performance-cards'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Performance Cards
            {activeTab === 'performance-cards' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'charts'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Charts
            {activeTab === 'charts' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'lists'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Lists
            {activeTab === 'lists' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('status-pills')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'status-pills'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Status Pills
            {activeTab === 'status-pills' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative ${
              activeTab === 'tables'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Tables
            {activeTab === 'tables' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('progress-bars')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative whitespace-nowrap ${
              activeTab === 'progress-bars'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Progress Bars
            {activeTab === 'progress-bars' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('inputs')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative whitespace-nowrap ${
              activeTab === 'inputs'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Inputs
            {activeTab === 'inputs' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('modals')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative whitespace-nowrap ${
              activeTab === 'modals'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Modals
            {activeTab === 'modals' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('execution-cards')}
            className={`px-[24px] py-[12px] text-[16px] font-semibold leading-[24px] transition-colors relative whitespace-nowrap ${
              activeTab === 'execution-cards'
                ? 'text-[#1C58F7]'
                : 'text-[#7F8FA4] hover:text-[#17263D]'
            }`}
          >
            Execution Cards
            {activeTab === 'execution-cards' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C58F7]" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col gap-[60px]">
          {activeTab === 'buttons' && (
            <>
              {/* Primary Buttons Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Primary Buttons
                </h2>

                {/* Size Variants */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Sizes
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Small</p>
                      <Button size="small" variant="primary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Medium</p>
                      <Button size="medium" variant="primary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Large</p>
                      <Button size="large" variant="primary">
                        Button Text
                      </Button>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    States
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Default</p>
                      <Button size="medium" variant="primary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Hover</p>
                      <Button size="medium" variant="primary" className="hover:bg-[#121D31]">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Disabled</p>
                      <Button size="medium" variant="primary" disabled>
                        Button Text
                      </Button>
                    </div>
                  </div>
                </div>

                {/* With Icon */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    With Icon
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <Button
                      size="small"
                      variant="primary"
                      icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                    <Button
                      size="medium"
                      variant="primary"
                      icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                    <Button
                      size="large"
                      variant="primary"
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                  </div>
                </div>
              </div>

              {/* Secondary Buttons Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Secondary Buttons
                </h2>

                {/* Size Variants */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Sizes
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Small</p>
                      <Button size="small" variant="secondary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Medium</p>
                      <Button size="medium" variant="secondary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Large</p>
                      <Button size="large" variant="secondary">
                        Button Text
                      </Button>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    States
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Default</p>
                      <Button size="medium" variant="secondary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Hover</p>
                      <Button size="medium" variant="secondary">
                        Button Text
                      </Button>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p className="text-[12px] font-medium text-[#7F8FA4]">Disabled</p>
                      <Button size="medium" variant="secondary" disabled>
                        Button Text
                      </Button>
                    </div>
                  </div>
                </div>

                {/* With Icon */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    With Icon
                  </h3>
                  <div className="flex gap-[24px] items-center">
                    <Button
                      size="small"
                      variant="secondary"
                      icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                    <Button
                      size="medium"
                      variant="secondary"
                      icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                    <Button
                      size="large"
                      variant="secondary"
                      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    >
                      Button Text
                    </Button>
                  </div>
                </div>
              </div>

              {/* Validation Table */}
              <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] mb-[24px] leading-[30px]">
                  Validation: Figma vs Implementation
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-white rounded-[8px]">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Small</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Medium</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Large</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Vertical Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">6px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">6px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">10px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Horizontal Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">10px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Font Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">18px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Line Height</td>
                        <td className="py-[12px] px-[16px] text-[12px]">20px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">26px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Font Weight</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500 (Medium) ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500 (Medium) ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500 (Medium) ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Letter Spacing</td>
                        <td className="py-[12px] px-[16px] text-[12px]">0px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">0.2px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">0px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">18px ✓</td>
                        <td className="py-[12px] px-[16px] text-[12px]">20px ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-primary-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>PRIMARY BUTTON COLORS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Default Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>Gradient Fill (#17263D → #0D245C → #02227B) ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Hover Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#121D31 ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Color</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#F9FAFB (Color/Neutral/50) ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Disabled State</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>50% Opacity ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-accent-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>SECONDARY BUTTON COLORS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Default Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#FFFFFF (Color/Neutral/0) ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Hover Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#F9FAFB (Color/Neutral/50) ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Color</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#17263D ✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Color</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>#1339A0 (Color/Accent/700) ✓</td>
                      </tr>
                      <tr>
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Disabled State</td>
                        <td className="py-[12px] px-[16px] text-[12px]" colSpan={3}>50% Opacity ✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'topbar' && (
            <>
              {/* Top Bar Component Display */}
              <div className="flex flex-col gap-[40px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Top Bar Component
                </h2>

                {/* Demo Container with Background */}
                <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px] flex justify-center">
                  <TopBar />
                </div>

                {/* Component Features */}
                <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] mb-[16px]">
                    Features
                  </h3>
                  <div className="flex flex-col gap-[12px] text-[14px] text-neutral-700">
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Glass Effect:</strong> Apple iOS 26 style backdrop blur with 35% white opacity</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Three Functional Dropdowns:</strong> Region, Time Frame, and Material selectors</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Click Outside to Close:</strong> Dropdowns automatically close when clicking elsewhere</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Gradient Buttons:</strong> Matches primary button style from Figma</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Icon Indicators:</strong> Each dropdown has a contextual icon (MapPin, Calendar, Package)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Table */}
              <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] mb-[24px] leading-[30px]">
                  Validation: Figma vs Implementation
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-white rounded-[8px]">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Figma Value</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Implemented</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 bg-primary-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>CONTAINER DIMENSIONS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1187px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1187px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px (all sides)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">rgba(255,255,255,0.35)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">rgba(255,255,255,0.35)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Backdrop Blur</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Applied (Glass Effect)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">backdrop-blur-md</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-accent-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>TYPOGRAPHY</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Main Title</td>
                        <td className="py-[12px] px-[16px] text-[12px]">28px / 40px / 600</td>
                        <td className="py-[12px] px-[16px] text-[12px]">28px / 40px / 600</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Subtitle</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px / 24px / 500</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px / 24px / 500</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Dropdown Labels</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Dropdown Button Text</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 22px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-success-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>DROPDOWNS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Dropdown Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">160px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">160px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Gap Between Dropdowns</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Label to Button Gap</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient Fill</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient Fill</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr>
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'sidebar' && (
            <>
              {/* Sidebar Component Display */}
              <div className="flex flex-col gap-[40px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Sidebar Navigation Component
                </h2>

                {/* Executive Mode - Expanded */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D]">
                    Executive Mode - Expanded
                  </h3>
                  <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px] flex justify-start">
                    <Sidebar mode="executive" variant="expanded" activeItem="dashboard" />
                  </div>
                </div>

                {/* Management Mode - Expanded */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D]">
                    Management Mode - Expanded
                  </h3>
                  <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px] flex justify-start">
                    <Sidebar mode="management" variant="expanded" activeItem="inventory" />
                  </div>
                </div>

                {/* Collapsed Mode (Icon-only) */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D]">
                    Collapsed Mode (Icon-only)
                  </h3>
                  <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px] flex justify-start">
                    <Sidebar mode="executive" variant="collapsed" activeItem="dashboard" />
                  </div>
                </div>

                {/* Component Features */}
                <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] mb-[16px]">
                    Features
                  </h3>
                  <div className="flex flex-col gap-[12px] text-[14px] text-neutral-700">
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Two Modes:</strong> Executive mode (6 nav items) and Management mode (4 nav items)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Golden Pill Toggle:</strong> Click to switch between Executive and Management modes</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Expand/Collapse:</strong> Toggle button with gradient blue background to switch between expanded (188px) and collapsed (80px) states</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Full Height:</strong> Sidebar spans 100vh (full viewport height) in both modes</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Lucide React Icons:</strong> All icons replaced with industry-standard Lucide React icons (consistent outlined/line style, strokeWidth: 1.5)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Dual Logo System:</strong> Full NUEL logo (Logo.svg) when expanded, Logo and Chip Container.svg when collapsed with smooth 500ms transitions</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Smart Tab Alignment:</strong> Navigation icons left-aligned with 12px gap when expanded, centered when collapsed with smooth transitions</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Enhanced Animations:</strong> 500ms ease-in-out transitions for collapse/expand with coordinated element movements (sidebar width, logo swap, icon repositioning, text fade)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Golden Pill Refinement:</strong> Smooth opacity and width transitions with pointer-events-none when collapsed to prevent unintended clicks</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Full Viewport Height:</strong> Sidebar spans 100vh (full window height) in both Executive and Management modes</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Active State Highlighting:</strong> Current page highlighted with blue gradient background (from-[#17263D] via-[#0D245C] to-[#02227B])</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Profile Section:</strong> User avatar, name, email with Settings and Logout actions (using Lucide Settings and LogOut icons)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Mode Toggle:</strong> Golden pill switches between Executive (6 nav items) and Management (4 nav items) modes with uppercase text</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Table */}
              <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] mb-[24px] leading-[30px]">
                  Validation: Figma vs Implementation
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-white rounded-[8px]">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Figma Value</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Implemented</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 bg-primary-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>CONTAINER DIMENSIONS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Expanded Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">188px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">188px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Collapsed Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">80px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">80px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FFFFFF</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FFFFFF</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Height</td>
                        <td className="py-[12px] px-[16px] text-[12px]">100vh (Full viewport height)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">100vh</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-accent-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>LOGO & BRANDING</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Logo Source</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Logo.svg (Full NUEL)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Logo.svg</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Collapsed Logo</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Logo and Chip Container.svg</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Logo and Chip Container.svg</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Logo Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-success-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>GOLDEN PILL (MODE TOGGLE)</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">125.84px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">125.84px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">2.2px 13.2px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">2.2px 13.2px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">999px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">999px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient #FFD170 to #937231</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient #FFD170 to #937231</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Size/Weight</td>
                        <td className="py-[12px] px-[16px] text-[12px]">11px / 700</td>
                        <td className="py-[12px] px-[16px] text-[12px]">11px / 700</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-success-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>NAVIGATION ITEMS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Height</td>
                        <td className="py-[12px] px-[16px] text-[12px]">38px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">38px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">8px 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px × 16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px × 16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Size/Weight</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px / 400</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Gap (Icon to Text)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Active Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Blue Gradient</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Blue Gradient</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Content Alignment (Expanded)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Left-aligned (justify-start)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Left-aligned</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Content Alignment (Collapsed)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Center-aligned (justify-center)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Center-aligned</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Library</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Lucide React (outlined)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Lucide React</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Stroke Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1.5</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1.5</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-info-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>COLLAPSE/EXPAND BUTTON</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px × 24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px × 24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Button Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient Blue (#17263D to #02227B)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Gradient Blue</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Arrow Icon Color</td>
                        <td className="py-[12px] px-[16px] text-[12px]">White (#FFFFFF)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">White</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Position</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Right -12px, Top 40px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Right -12px, Top 40px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-warning-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>PROFILE SECTION</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#17263D</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#17263D</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px 16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px 16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Avatar Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">40px × 40px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">40px × 40px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Container Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">32px × 32px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">32px × 32px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Container BG</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#0E1726</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#0E1726</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius (Bottom)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">24px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-primary-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ANIMATIONS & TRANSITIONS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Collapse/Expand Duration</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Easing Function</td>
                        <td className="py-[12px] px-[16px] text-[12px]">ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Sidebar Width Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Logo Swap Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Golden Pill Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out (opacity + width)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Navigation Alignment Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">300ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">300ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr>
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Arrow Icon Transition</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">500ms ease-in-out</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'metrics' && (
            <>
              {/* Metric Cards Component Display */}
              <div className="flex flex-col gap-[40px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Metric Cards (KPI Cards)
                </h2>

                {/* All 4 Metric Card Variants */}
                <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px]">
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
                </div>

                {/* Component Features */}
                <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] mb-[16px]">
                    Features
                  </h3>
                  <div className="flex flex-col gap-[12px] text-[14px] text-neutral-700">
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Counting Animation:</strong> Values animate from 0 to target with 1.5s ease-out cubic easing when card enters viewport</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Four Icon Variants:</strong> Dollar (cost savings), TrendingDown (cost per ton), Package (volume), Target (optimization rate)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Universal Card Curvature:</strong> Uses CARD_CURVATURE token (16px) from design tokens</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Responsive Width:</strong> Cards use 100% width (NOT hard-coded pixels) within flex container</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Trend Indicators:</strong> Up/down arrows with green (success) or red (error) colors</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Pre-Nuel vs Post-Nuel Comparison:</strong> Shows before/after values with chevron separator</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Format Support:</strong> Currency ($12,500,000), Currency with decimals ($245.80), Percentage (87.5%), Volume (2.45M Tons)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>IntersectionObserver:</strong> Animation triggers only when card scrolls into view (one-time)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Table */}
              <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] mb-[24px] leading-[30px]">
                  Validation: Figma vs Implementation
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-white rounded-[8px]">
                    <thead>
                      <tr className="border-b-2 border-neutral-300">
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Figma Value</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Implemented</th>
                        <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 bg-primary-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>CARD DIMENSIONS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">287.75px (Figma) / 100% (Responsive)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">100% (w-full)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Height</td>
                        <td className="py-[12px] px-[16px] text-[12px]">170px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">170px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px (all sides)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius (Card Curvature)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px (CARD_CURVATURE token)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FFFFFF</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FFFFFF</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Gap Between Cards</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-accent-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>TYPOGRAPHY</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Card Title</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 14px / 22px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 14px / 22px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Main Value</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Bold 18px / 26px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Bold 18px / 26px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Trend Text</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 10px / 16px (uppercase)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 10px / 16px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Comparison Labels</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 12px / 20px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 12px / 20px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Comparison Values</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 12px / 20px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 12px / 20px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-success-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>COLORS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Background</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#EAF1FF (Light Blue)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#EAF1FF</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Main Value Color</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#1C58F7 (Blue)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#1C58F7</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Primary</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#17263D</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#17263D</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Text Secondary</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#7F8FA4</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#7F8FA4</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Success (Up Trend)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#34C759 (Green)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#34C759</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Error (Down Trend)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FF3B30 (Red)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#FF3B30</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Border</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#D9E0E9 (0.5px)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">#D9E0E9 (0.5px)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-info-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ICONS</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Main Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px × 14px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px × 14px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Info Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px × 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">12px × 12px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Trend Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">10px × 10px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">10px × 10px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Chevron Icon Size</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px × 14px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">14px × 14px</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Library</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Lucide React</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Lucide React</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Stroke Width</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1.5</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1.5</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200 bg-warning-100">
                        <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ANIMATION</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Animation Duration</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1.5 seconds</td>
                        <td className="py-[12px] px-[16px] text-[12px]">1500ms</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Easing Function</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Ease-out cubic</td>
                        <td className="py-[12px] px-[16px] text-[12px]">Ease-out cubic (1 - (1-t)³)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr className="border-b border-neutral-200">
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Trigger Method</td>
                        <td className="py-[12px] px-[16px] text-[12px]">On viewport entry</td>
                        <td className="py-[12px] px-[16px] text-[12px]">IntersectionObserver</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                      <tr>
                        <td className="py-[12px] px-[16px] text-[12px] font-medium">Animation Frequency</td>
                        <td className="py-[12px] px-[16px] text-[12px]">One-time (on first view)</td>
                        <td className="py-[12px] px-[16px] text-[12px]">One-time</td>
                        <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPI Card Variants Section */}
              <div className="flex flex-col gap-[40px] mt-[60px]">
                <div>
                  <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px] mb-[8px]">
                    KPI Card Variants
                  </h2>
                  <p className="text-[14px] text-[#7F8FA4] leading-[22px]">
                    Fixed-width KPI cards with progress bars, comparisons, and alert status indicators
                  </p>
                </div>

                {/* Standard KPI Cards */}
                <div>
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px] mb-[16px]">
                    Standard Variant with Progress Bar
                  </h3>
                  <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px]">
                    <div className="flex gap-[12px]">
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
                    </div>
                  </div>
                </div>

                {/* Alert Variant KPI Card */}
                <div>
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px] mb-[16px]">
                    Alert Variant with Status Tags
                  </h3>
                  <div className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F8FC] rounded-[24px] p-[60px]">
                    <div className="flex gap-[12px]">
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
                  </div>
                </div>

                {/* Component Features */}
                <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] mb-[16px]">
                    Features
                  </h3>
                  <div className="flex flex-col gap-[12px] text-[14px] text-neutral-700">
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Two Variants:</strong> Standard (with progress bar + comparison) and Alert (with status tags + review link)</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Fixed Widths:</strong> 280.25px (standard) and 310.25px (alert) for consistent sizing</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Phosphor Icons:</strong> CheckCircle, Package, ClockCounterClockwise, Bell with 14px size</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Number Animation:</strong> Last 2 digits count up (e.g., 92% → 94%) with 800ms duration</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Progress Bar Animation:</strong> Width fills from 0 to target over 1s with ease-out timing</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Pre-Nuel vs Post-Nuel:</strong> Shows before/after comparison values with CaretRight separator</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Alert Status:</strong> Colored dots (red for critical, gold for warning) with uppercase labels</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>Review Link:</strong> Underlined text with ArrowSquareOut icon for alert variant</p>
                    </div>
                    <div className="flex gap-[8px]">
                      <span className="font-semibold">✓</span>
                      <p><strong>IntersectionObserver:</strong> Animations trigger on viewport entry (one-time)</p>
                    </div>
                  </div>
                </div>

                {/* Validation Table */}
                <div className="bg-neutral-100 rounded-[20px] p-[24px]">
                  <h2 className="text-[24px] font-semibold text-[#17263D] mb-[24px] leading-[30px]">
                    Validation: Figma vs Implementation
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white rounded-[8px]">
                      <thead>
                        <tr className="border-b-2 border-neutral-300">
                          <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Property</th>
                          <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Figma Value</th>
                          <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Implemented</th>
                          <th className="py-[12px] px-[16px] text-[14px] font-semibold text-neutral-800">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-neutral-200 bg-primary-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>CARD DIMENSIONS</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Standard Width</td>
                          <td className="py-[12px] px-[16px] text-[12px]">280.25px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">280.25px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Alert Width</td>
                          <td className="py-[12px] px-[16px] text-[12px]">310.25px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">310.25px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Alert Height</td>
                          <td className="py-[12px] px-[16px] text-[12px]">176px (fixed)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">176px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Border Radius</td>
                          <td className="py-[12px] px-[16px] text-[12px]">16px (CARD_CURVATURE)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Padding</td>
                          <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">16px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Gap between elements</td>
                          <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200 bg-secondary-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>TYPOGRAPHY</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Title Text</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 14px / 22px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 14px / 22px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Value Text</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Bold 18px / 26px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Bold 18px / 26px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Progress Label</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Inter Regular 14px / 22px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Inter Regular 14px / 22px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Comparison Labels</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 12px / 20px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Medium 12px / 20px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Comparison Values</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 12px / 20px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 12px / 20px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Alert Tags</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 10px / 16px UPPERCASE</td>
                          <td className="py-[12px] px-[16px] text-[12px]">DM Sans Regular 10px / 16px UPPERCASE</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Review Link</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Inter Regular 12px / 20px Underlined</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Inter Regular 12px / 20px Underlined</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200 bg-success-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>PROGRESS BAR</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Progress Bar Width</td>
                          <td className="py-[12px] px-[16px] text-[12px]">80px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">80px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Progress Bar Height</td>
                          <td className="py-[12px] px-[16px] text-[12px]">6px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">6px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Track Color</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#D9E0E9 (neutral-200)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#D9E0E9</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Fill Color</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#34C759 (success-500)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#34C759</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200 bg-info-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ICONS</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Library</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Phosphor Icons</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Phosphor Icons</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Main Icon Size</td>
                          <td className="py-[12px] px-[16px] text-[12px]">14px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">14px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Info Icon Size</td>
                          <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">12px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Background</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#EAF1FF (accent-100) rounded-full</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#EAF1FF rounded-full</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Icon Color</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#1C58F7 (accent-500)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#1C58F7</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200 bg-warning-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ALERT STATUS</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Status Dot Size</td>
                          <td className="py-[12px] px-[16px] text-[12px]">6px × 6px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">6px × 6px</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Critical Color</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#FF3B30 (error-500)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#FF3B30</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Warning Color</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#A58B00 (warning-700)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">#A58B00</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200 bg-error-100">
                          <td className="py-[12px] px-[16px] text-[12px] font-semibold" colSpan={4}>ANIMATION</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Number Animation Duration</td>
                          <td className="py-[12px] px-[16px] text-[12px]">800ms</td>
                          <td className="py-[12px] px-[16px] text-[12px]">800ms</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Number Animation Range</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Last 2 digits (subtle)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">Last 2% (targetNum - 2)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Progress Bar Animation</td>
                          <td className="py-[12px] px-[16px] text-[12px]">1s ease-out</td>
                          <td className="py-[12px] px-[16px] text-[12px]">1s ease-out</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Trigger Method</td>
                          <td className="py-[12px] px-[16px] text-[12px]">On viewport entry</td>
                          <td className="py-[12px] px-[16px] text-[12px]">IntersectionObserver</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                        <tr>
                          <td className="py-[12px] px-[16px] text-[12px] font-medium">Animation Frequency</td>
                          <td className="py-[12px] px-[16px] text-[12px]">One-time (on first view)</td>
                          <td className="py-[12px] px-[16px] text-[12px]">One-time</td>
                          <td className="py-[12px] px-[16px] text-[12px]">✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'section-headers' && (
            <>
              {/* Section Headers Content */}
              <div className="flex flex-col gap-[40px]">
                <div>
                  <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px] mb-[8px]">
                    Section Headers
                  </h2>
                  <p className="text-[14px] text-[#7F8FA4] leading-[22px]">
                    Three heading levels with optional elements: icons, tags, buttons, filters, toggles, and settings
                  </p>
                </div>

                {/* Variant 1: Primary with Icon and Buttons */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Primary with Icon & Action Buttons
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="primary"
                      title="Performance Metrics"
                      icon="chart-line"
                      buttons={[
                        { label: 'Export Data', onClick: () => console.log('Export clicked') },
                        { label: 'More Options', onClick: () => console.log('More clicked'), dropdown: true }
                      ]}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="primary" title="Performance Metrics" icon="chart-line" buttons={[...]} />`}
                    </p>
                  </div>
                </div>

                {/* Variant 2: Primary with Filters */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Primary with Filter Pills
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="primary"
                      title="Shipment Status"
                      icon="chart-line"
                      showFilters
                      filters={[
                        { label: 'Active', variant: 'success', active: activeFilters.includes('Active'), onClick: () => handleFilterClick('Active') },
                        { label: 'Delayed', variant: 'warning', active: activeFilters.includes('Delayed'), onClick: () => handleFilterClick('Delayed') },
                        { label: 'Failed', variant: 'error', active: activeFilters.includes('Failed'), onClick: () => handleFilterClick('Failed') }
                      ]}
                      buttons={[
                        { label: 'View All', onClick: () => console.log('View All clicked') }
                      ]}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="primary" title="Shipment Status" showFilters filters={[...]} />`}
                    </p>
                  </div>
                </div>

                {/* Variant 3: Secondary with Icon and Buttons */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Secondary with Icon & Buttons
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="secondary"
                      title="Recent Activity"
                      icon="image-square"
                      buttons={[
                        { label: 'Filter', onClick: () => console.log('Filter clicked') },
                        { label: 'Export', onClick: () => console.log('Export clicked') }
                      ]}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="secondary" title="Recent Activity" icon="image-square" buttons={[...]} />`}
                    </p>
                  </div>
                </div>

                {/* Variant 4: Secondary with Description */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Secondary with Description
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="secondary"
                      title="Image Gallery"
                      description="View and manage all uploaded images"
                      buttons={[
                        { label: 'Upload', onClick: () => console.log('Upload clicked') }
                      ]}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="secondary" title="Image Gallery" description="..." buttons={[...]} />`}
                    </p>
                  </div>
                </div>

                {/* Variant 5: Tertiary with Label and Buttons */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Tertiary with Tag & Buttons
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="tertiary"
                      title="Data Table"
                      tag="24"
                      buttons={[
                        { label: 'Add Row', onClick: () => console.log('Add Row clicked') }
                      ]}
                      showSettings
                      onSettingsClick={() => console.log('Settings clicked')}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="tertiary" title="Data Table" tag="24" showSettings />`}
                    </p>
                  </div>
                </div>

                {/* Variant 6: Tertiary with Toggle */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Tertiary with Toggle
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="tertiary"
                      title="View Mode"
                      showToggle
                      toggleOptions={['Grid', 'List']}
                      activeToggle={activeToggle}
                      onToggleChange={setActiveToggle}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="tertiary" showToggle toggleOptions={['Grid', 'List']} />`}
                    </p>
                  </div>
                </div>

                {/* Variant 7: Primary Simple */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Primary Simple (Title Only)
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="primary"
                      title="Overview"
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="primary" title="Overview" />`}
                    </p>
                  </div>
                </div>

                {/* Variant 8: All Features Combined */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Tertiary with All Features
                  </h3>
                  <div className="bg-transparent rounded-[16px] p-[24px] border border-transparent">
                    <SectionHeader
                      level="tertiary"
                      title="Advanced Dashboard"
                      tag="99+"
                      description="Real-time monitoring and analytics"
                      showFilters
                      filters={[
                        { label: 'All Systems', variant: 'info', active: true, onClick: () => console.log('All clicked') },
                        { label: 'Critical', variant: 'error', active: false, onClick: () => console.log('Critical clicked') }
                      ]}
                      buttons={[
                        { label: 'Refresh', onClick: () => console.log('Refresh clicked') }
                      ]}
                      showSettings
                      onSettingsClick={() => console.log('Settings clicked')}
                    />
                  </div>
                  <div className="bg-neutral-50 rounded-[8px] p-[16px] border border-neutral-200">
                    <p className="text-[12px] font-mono text-neutral-700">
                      {`<SectionHeader level="tertiary" title="..." tag="99+" description="..." showFilters filters={[...]} buttons={[...]} showSettings />`}
                    </p>
                  </div>
                </div>

                {/* Specifications Table */}
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-[18px] font-semibold text-[#17263D] leading-[26px]">
                    Specifications
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-[2px] border-neutral-300">
                          <th className="p-[12px] text-[14px] font-semibold text-neutral-900">Element</th>
                          <th className="p-[12px] text-[14px] font-semibold text-neutral-900">Primary</th>
                          <th className="p-[12px] text-[14px] font-semibold text-neutral-900">Secondary</th>
                          <th className="p-[12px] text-[14px] font-semibold text-neutral-900">Tertiary</th>
                        </tr>
                      </thead>
                      <tbody className="text-[14px]">
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Heading Size</td>
                          <td className="p-[12px] text-neutral-700">24px / 30px</td>
                          <td className="p-[12px] text-neutral-700">18px / 26px</td>
                          <td className="p-[12px] text-neutral-700">16px / 24px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Font Weight</td>
                          <td className="p-[12px] text-neutral-700">SemiBold (600)</td>
                          <td className="p-[12px] text-neutral-700">SemiBold (600)</td>
                          <td className="p-[12px] text-neutral-700">SemiBold (600)</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Icon Size</td>
                          <td className="p-[12px] text-neutral-700">24px</td>
                          <td className="p-[12px] text-neutral-700">16px</td>
                          <td className="p-[12px] text-neutral-700">16px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Container Gap</td>
                          <td className="p-[12px] text-neutral-700" colSpan={3}>24px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Title & Description Gap</td>
                          <td className="p-[12px] text-neutral-700" colSpan={3}>2px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Elements Gap</td>
                          <td className="p-[12px] text-neutral-700" colSpan={3}>8px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Button Padding</td>
                          <td className="p-[12px] text-neutral-700">16px × 8px</td>
                          <td className="p-[12px] text-neutral-700">16px × 8px</td>
                          <td className="p-[12px] text-neutral-700">12px × 6px</td>
                        </tr>
                        <tr className="border-b border-neutral-200">
                          <td className="p-[12px] font-medium text-neutral-900">Tag Size</td>
                          <td className="p-[12px] text-neutral-700">—</td>
                          <td className="p-[12px] text-neutral-700">—</td>
                          <td className="p-[12px] text-neutral-700">40px × 24px</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'performance-cards' && (
            <>
              {/* Performance Cards Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Performance Cards
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Regional performance cards displaying execution rates, savings, and untapped potential with status indicators.
                </p>

                {/* All Variants in Grid */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    All Status Variants
                  </h3>
                  <div className="grid grid-cols-2 gap-[12px]">
                    {/* Warning Status */}
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

                    {/* Good Status */}
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

                    {/* Good Status - Another Example */}
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

                    {/* Excellent Status */}
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
                </div>

                {/* Component Props Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Props
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Prop</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Required</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">region</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Region name (e.g., "Northeast")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">directionIcon</td>
                          <td className="p-[12px] text-neutral-700">"up-right" | "down-right" | "down-left" | "up-left"</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Direction arrow icon variant</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">alerts</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Number of alerts (0 if none)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">status</td>
                          <td className="p-[12px] text-neutral-700">"excellent" | "good" | "warning"</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Performance status (determines pill color)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">executionRate</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Execution rate percentage (e.g., "78.3%")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">volume</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Volume in tons (e.g., "420K Tons")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">savings</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Savings amount (e.g., "$2M")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">untappedPotential</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Untapped potential dollar amount (e.g., "$720K")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">facilities</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Number of facilities</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">plants</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Number of plants</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">terminals</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Number of terminals</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">onAlertsClick</td>
                          <td className="p-[12px] text-neutral-700">() =&gt; void</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Callback when alerts link is clicked</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">onReviewClick</td>
                          <td className="p-[12px] text-neutral-700">() =&gt; void</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Callback when review link is clicked</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Design Specifications Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Design Specifications
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Property</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Background</td>
                          <td className="p-[12px] text-neutral-700">#F3F6F9 (COLORS.neutral[100])</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Border Radius</td>
                          <td className="p-[12px] text-neutral-700">16px (CARD_CURVATURE)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Padding</td>
                          <td className="p-[12px] text-neutral-700">16px all sides</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Gap</td>
                          <td className="p-[12px] text-neutral-700">12px between sections</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Grid Gap</td>
                          <td className="p-[12px] text-neutral-700">11.5px (when used in 2-column grid)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Status Pills</td>
                          <td className="p-[12px] text-neutral-700">
                            Excellent: #D6F5E1 bg / #34C759 text<br/>
                            Good: #D6EDFF bg / #007AFF text<br/>
                            Warning: #FFF5CC bg / #FFD400 text
                          </td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-semibold text-neutral-900">Typography</td>
                          <td className="p-[12px] text-neutral-700">
                            Region Name: DM Sans SemiBold 16px/24px<br/>
                            Execution Rate: DM Sans SemiBold 24px/30px<br/>
                            Untapped Potential: DM Sans SemiBold 18px/26px
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<PerformanceCard
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
  onAlertsClick={() => console.log('View alerts')}
  onReviewClick={() => console.log('Review potential')}
/>`}</pre>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'charts' && (
            <>
              {/* Cost Trend Chart Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Cost Trend Chart
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Stacked area chart showing Pre-Nuel vs Nuel Optimization cost trends over time with animated transitions and interactive hover tooltips.
                </p>

                {/* Chart Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <CostTrendChart />
                  </div>
                </div>

                {/* Component Props Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Props
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Prop</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Required</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">className</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Additional className for custom styling</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-[8px] text-[14px] text-neutral-700">
                    <li>Stacked area chart showing Pre-Nuel and Nuel Optimization costs</li>
                    <li>Smooth animation on component load (1000ms duration)</li>
                    <li>Interactive hover tooltips with detailed cost breakdown</li>
                    <li>Automatic difference calculation showing savings</li>
                    <li>Responsive design with 100% width container</li>
                    <li>Centered legend with color indicators</li>
                    <li>Grid lines at $0, $70, $140, $210, $280 per ton</li>
                    <li>X-axis labels for Jul, Sep, Nov months</li>
                  </ul>
                </div>

                {/* Color Specifications */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Colors Used
                  </h3>
                  <div className="grid grid-cols-2 gap-[12px]">
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#CCD9F2]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Pre-Nuel</p>
                        <p className="text-[12px] text-neutral-600">#CCD9F2</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#365EC8]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Nuel Optimization</p>
                        <p className="text-[12px] text-neutral-600">#365EC8</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<CostTrendChart />`}</pre>
                  </div>
                </div>
              </div>

              {/* Optimization Rejections Chart Section */}
              <div className="flex flex-col gap-[24px] pt-[40px] border-t-[2px] border-[#E5E7EB]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Optimization Rejections Chart
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Combined bar and line chart showing quarterly rejection analysis by category with integrated summary cards and top 3 rankings. Features animated transitions for bars rising from zero and progressive line drawing.
                </p>

                {/* Chart Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <OptimizationRejectionsChart />
                  </div>
                </div>

                {/* Component Props Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Props
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Prop</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Required</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">className</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Additional className for custom styling</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-[8px] text-[14px] text-neutral-700">
                    <li>Combined bar and line chart with dual Y-axes</li>
                    <li>Bars animate from 0 to values with gravity-based easing (1400ms duration)</li>
                    <li>Line draws progressively from left to right (1600ms duration)</li>
                    <li>Intersection Observer triggers animation when chart enters viewport</li>
                    <li>Integrated summary cards showing total rejections and rejected value</li>
                    <li>Top 3 ranking cards with category details</li>
                    <li>Interactive hover tooltips with rejection counts and values</li>
                    <li>Gradient bar colors from darkest to lightest</li>
                    <li>Responsive design with 100% width container</li>
                  </ul>
                </div>

                {/* Color Specifications */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Bar Colors (Gradient)
                  </h3>
                  <div className="grid grid-cols-3 gap-[12px]">
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#0B1F57]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Accent 900</p>
                        <p className="text-[12px] text-neutral-600">#0B1F57</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#1339A0]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Accent 700</p>
                        <p className="text-[12px] text-neutral-600">#1339A0</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#1C58F7]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Accent 500</p>
                        <p className="text-[12px] text-neutral-600">#1C58F7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#A8C3FF]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Accent 300</p>
                        <p className="text-[12px] text-neutral-600">#A8C3FF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#EAF1FF]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Accent 100</p>
                        <p className="text-[12px] text-neutral-600">#EAF1FF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#F4F7FD]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Secondary 100</p>
                        <p className="text-[12px] text-neutral-600">#F4F7FD</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<OptimizationRejectionsChart />`}</pre>
                  </div>
                </div>
              </div>

              {/* Pie Chart Section */}
              <div className="flex flex-col gap-[24px] pt-[40px] border-t-[2px] border-[#E5E7EB]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Pie Chart
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Reusable donut-style pie chart component with legend and interactive tooltips. Perfect for displaying percentage-based data breakdowns with custom colors.
                </p>

                {/* Chart Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <PieChart
                      data={[
                        { label: 'Open Orders', value: 84250, percentage: 65.6, color: '#1C58F7' },
                        { label: 'Seasonal', value: 32892, percentage: 25.0, color: '#A8C3FF' },
                        { label: 'Safety', value: 12826, percentage: 9.4, color: '#E3ECFF' },
                      ]}
                      diameter={150}
                      showLegend={true}
                      showTooltip={true}
                    />
                  </div>
                </div>

                {/* Component Props Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Props
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Prop</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Required</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">data</td>
                          <td className="p-[12px] text-neutral-700">PieChartDataItem[]</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Array of data items with label, value, percentage, and color</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">diameter</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Chart diameter in pixels (default: 150)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">showLegend</td>
                          <td className="p-[12px] text-neutral-700">boolean</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Show legend below chart (default: true)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">showTooltip</td>
                          <td className="p-[12px] text-neutral-700">boolean</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Show tooltips on hover (default: true)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">className</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Additional className for custom styling</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Data Item Interface */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    PieChartDataItem Interface
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Property</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">label</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Display label for the segment</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">value</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">Numeric value (e.g., 84250 for tons)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">percentage</td>
                          <td className="p-[12px] text-neutral-700">number</td>
                          <td className="p-[12px] text-neutral-700">Percentage as number (e.g., 65.6 for 65.6%)</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">color</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Hex color for the segment (e.g., '#1C58F7')</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-[8px] text-[14px] text-neutral-700">
                    <li>Donut-style pie chart with 50% inner radius for center cutout</li>
                    <li>Configurable diameter (default 150px)</li>
                    <li>Interactive hover tooltips showing label, percentage, and formatted value</li>
                    <li>Legend below chart with colored dots and formatted text</li>
                    <li>Custom colors for each segment via data props</li>
                    <li>Automatic number formatting with commas (e.g., 84,250 Tons)</li>
                    <li>Uses Recharts library for rendering</li>
                    <li>All styling uses design tokens (COLORS, SPACING, TYPOGRAPHY)</li>
                    <li>TypeScript support with full type definitions</li>
                    <li>ForwardRef pattern for ref support</li>
                  </ul>
                </div>

                {/* Color Specifications */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Example Colors (Target Inventory)
                  </h3>
                  <div className="grid grid-cols-3 gap-[12px]">
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#1C58F7]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Open Orders</p>
                        <p className="text-[12px] text-neutral-600">#1C58F7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#A8C3FF]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Seasonal</p>
                        <p className="text-[12px] text-neutral-600">#A8C3FF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px] p-[12px] bg-[#F3F6F9] rounded-[8px]">
                      <div className="w-[40px] h-[40px] rounded-[4px] bg-[#E3ECFF]" />
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Safety</p>
                        <p className="text-[12px] text-neutral-600">#E3ECFF</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<PieChart
  data={[
    { label: 'Open Orders', value: 84250, percentage: 65.6, color: '#1C58F7' },
    { label: 'Seasonal', value: 32892, percentage: 25.0, color: '#A8C3FF' },
    { label: 'Safety', value: 12826, percentage: 9.4, color: '#E3ECFF' },
  ]}
  diameter={150}
  showLegend={true}
  showTooltip={true}
/>`}</pre>
                  </div>
                </div>
              </div>

              {/* Budget Planning Chart Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Budget Planning Chart
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Grouped vertical bar chart for Budget Planning section. Displays quarterly forecast vs budget data with interactive tooltips and legend.
                </p>

                {/* Chart Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <BudgetPlanningChart
                      data={[
                        { quarter: 'Q1 2026', forecast: 54000, budget: 50000 },
                        { quarter: 'Q2 2026', forecast: 61000, budget: 57000 },
                        { quarter: 'Q3 2026', forecast: 71000, budget: 68000 },
                        { quarter: 'Q4 2026', forecast: 57000, budget: 56000 },
                      ]}
                      width={1132}
                      height={268}
                    />
                  </div>
                </div>

                {/* Specifications Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Specifications
                  </h3>
                  <div className="overflow-hidden rounded-[16px] border border-[#E5E7EB]">
                    <table className="w-full">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Property
                          </th>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#E5E7EB]">
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Chart Width</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">1132px (default)</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Chart Height</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">268px (default)</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Bar Width</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">80px</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Bar Gap</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">8px</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Forecast Color</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#9db8ff</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Budget Color</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#1339a0</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Y-Axis Range</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">0 - 80,000 (20,000 intervals)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<BudgetPlanningChart
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
/>`}</pre>
                  </div>
                </div>
              </div>

              {/* Budget Card Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Budget Card
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Metric card variant for Budget Planning section. Features gradient text, optional tag, smart percentage highlighting, and vertical indicator line. Optimized for 3-column layouts.
                </p>

                {/* Card Previews */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - Total Forecast Card
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <BudgetCard
                      icon="trending-up"
                      title="Total Forecast"
                      tag="FY2026"
                      value="254,000 Tons"
                      insight="+5.8% vs. previous year"
                      highlightInsight={true}
                    />
                  </div>

                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - Budget Target Card
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <BudgetCard
                      icon="target"
                      title="Budget Target"
                      value="249,000 Tons"
                      insight="+3.7% vs. previous year"
                      highlightInsight={true}
                    />
                  </div>

                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - Variance Card
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <BudgetCard
                      icon="trending-down"
                      title="Variance"
                      value="+5,000 Tons"
                      insight="2.0% above budget"
                      showIndicatorLine={true}
                    />
                  </div>

                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - 3 Cards in Row Layout
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <BudgetCard
                        icon="trending-up"
                        title="Total Forecast"
                        tag="FY2026"
                        value="254,000 Tons"
                        insight="+5.8% vs. previous year"
                        highlightInsight={true}
                      />
                      <BudgetCard
                        icon="target"
                        title="Budget Target"
                        value="249,000 Tons"
                        insight="+3.7% vs. previous year"
                        highlightInsight={true}
                      />
                      <BudgetCard
                        icon="trending-down"
                        title="Variance"
                        value="+5,000 Tons"
                        insight="2.0% above budget"
                        showIndicatorLine={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Specifications Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Specifications
                  </h3>
                  <div className="overflow-hidden rounded-[16px] border border-[#E5E7EB]">
                    <table className="w-full">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Property
                          </th>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#E5E7EB]">
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Width</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">356px</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Background</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#f3f6f9</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Border Radius</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">16px (CARD_CURVATURE)</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Padding</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">16px (SPACING[16])</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Value Gradient</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#1C58F7 to #34C759</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Icon Size</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">20×20px</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Icon Color</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#1339a0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<BudgetCard
  icon="trending-up"
  title="Total Forecast"
  tag="FY2026"
  value="254,000 Tons"
  insight="+5.8% vs. previous year"
  highlightInsight={true}
/>

<BudgetCard
  icon="target"
  title="Budget Target"
  value="249,000 Tons"
  insight="+3.7% vs. previous year"
  highlightInsight={true}
/>

<BudgetCard
  icon="trending-down"
  title="Variance"
  value="+5,000 Tons"
  insight="2.0% above budget"
  showIndicatorLine={true}
/>`}</pre>
                  </div>
                </div>
              </div>

              {/* Monthly Insight Card Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Monthly Insight Card
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  Complex metric card designed for monthly target inventory insights. Displays month, status, alert count, main metric value, coverage ratio, progress bar, and actionable description. Used in the Monthly Applications & Insights section.
                </p>

                {/* Card Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - Warning State
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
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
                  </div>

                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview - Good State
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
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
                  </div>
                </div>

                {/* Specifications Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Specifications
                  </h3>
                  <div className="overflow-hidden rounded-[16px] border border-[#E5E7EB]">
                    <table className="w-full">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Property
                          </th>
                          <th className="text-left p-[16px] text-[14px] font-medium text-[#7F8FA4]">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#E5E7EB]">
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Width</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">365px</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Background</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">#f3f6f9 (COLORS.neutral[100])</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Border Radius</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">16px (CARD_CURVATURE)</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Padding</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">16px (SPACING[16])</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Header Font</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">16px DM Sans SemiBold</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Main Value Font</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">24px DM Sans SemiBold, #1c58f7</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Coverage Ratio</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">Green (&gt;=1.0X), Red (&lt;1.0X)</td>
                        </tr>
                        <tr>
                          <td className="p-[16px] text-[14px] text-[#17263D]">Progress Bar</td>
                          <td className="p-[16px] text-[14px] text-[#7F8FA4]">6px height, green fill, gray/light-green background</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Data Structure */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Props Interface
                  </h3>
                  <div className="bg-[#17263D] rounded-[16px] p-[24px] overflow-x-auto">
                    <pre className="text-[14px] text-[#D9E0E9] font-mono leading-[22px]">{`export interface MonthlyInsightCardProps {
  month: string;                  // Month name
  isCurrent?: boolean;            // Show "(Current)" suffix
  alertText?: string;             // e.g., "1 Alert", "2 Alerts"
  status: 'warning' | 'success' | 'error' | 'info';
  eyebrow: string;                // e.g., "Target vs Current"
  value: string;                  // e.g., "-2,049 Tons"
  coverageRatio: string;          // e.g., "0.7X", "1.2X"
  progressPercentage: number;     // 0-200
  progressText: string;           // e.g., "83% 9,752/11,801 Tons"
  description: string;            // Footer action text
  className?: string;
}`}</pre>
                  </div>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#17263D] rounded-[16px] p-[24px] overflow-x-auto">
                    <pre className="text-[14px] text-[#D9E0E9] font-mono leading-[22px]">{`import { MonthlyInsightCard } from './components/MonthlyInsightCard';

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
/>`}</pre>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'lists' && (
            <>
              {/* External Factors List Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  External Factors List
                </h2>
                <p className="text-[16px] text-[#7F8FA4] leading-[24px]">
                  List component displaying external factors with impact values, trend indicators, and descriptions. Features automatic color coding for positive/negative trends.
                </p>

                {/* List Preview */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Preview
                  </h3>
                  <div className="bg-white rounded-[16px] p-[24px] border border-[#E5E7EB]">
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
                </div>

                {/* Component Props Table */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Item Props
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#E5E7EB] rounded-[8px]">
                      <thead className="bg-[#F3F6F9]">
                        <tr>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Prop</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Type</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Required</th>
                          <th className="p-[12px] text-left text-[14px] font-semibold text-neutral-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">icon</td>
                          <td className="p-[12px] text-neutral-700">"gas-pump" | "trend-up" | "receipt" | "train" | "sparkle"</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Icon type to display</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">title</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Factor title</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">description</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Factor description</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">value</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Primary value (e.g., "+$12.5/Ton")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">secondaryValue</td>
                          <td className="p-[12px] text-neutral-700">string</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Secondary value (e.g., "+15.2%")</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">trend</td>
                          <td className="p-[12px] text-neutral-700">"up" | "down"</td>
                          <td className="p-[12px] text-neutral-700">Yes</td>
                          <td className="p-[12px] text-neutral-700">Trend direction for icon and color</td>
                        </tr>
                        <tr className="border-t border-[#E5E7EB]">
                          <td className="p-[12px] font-mono text-[14px] text-[#1C58F7]">isNetImpact</td>
                          <td className="p-[12px] text-neutral-700">boolean</td>
                          <td className="p-[12px] text-neutral-700">No</td>
                          <td className="p-[12px] text-neutral-700">Whether this is the net impact row (bold, no icon)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-[8px] text-[14px] text-neutral-700">
                    <li>Automatic trend icon display (up/down arrows)</li>
                    <li>Color-coded values: red for negative trends, green for positive</li>
                    <li>Optional icons from Phosphor library (gas-pump, trend-up, receipt, train, sparkle)</li>
                    <li>Special "Net Impact" row styling with bold text and no trend icon</li>
                    <li>Responsive layout with fixed 140px right column for values</li>
                    <li>0.5px bottom borders between items</li>
                    <li>16px border radius container with 24px horizontal padding</li>
                  </ul>
                </div>

                {/* Usage Example */}
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Usage Example
                  </h3>
                  <div className="bg-[#F3F6F9] rounded-[8px] p-[20px] font-mono text-[14px] overflow-x-auto">
                    <pre className="text-neutral-900">{`<ExternalFactorsList
  items={[
    {
      icon: 'gas-pump',
      title: 'Fuel Cost Impact',
      description: 'Rising diesel fuel costs',
      value: '+$12.5/Ton',
      secondaryValue: '+15.2%',
      trend: 'up',
    },
    {
      title: 'Net Impact:',
      description: '',
      value: '-$3.4/Ton',
      secondaryValue: 'Combined factors',
      trend: 'down',
      isNetImpact: true,
    },
  ]}
/>`}</pre>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Status Pills Tab */}
          {activeTab === 'status-pills' && (
            <>
              {/* All Variants Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Status Pill Variants
                </h2>
                <p className="text-[14px] font-normal text-[#7F8FA4] leading-[22px]">
                  Status pills display status with colored dot and text in a pill-shaped container. Used throughout the dashboard for status indicators.
                </p>

                {/* Variants Display */}
                <div className="flex flex-wrap gap-[16px] items-center">
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Good</p>
                    <StatusPill variant="good" label="Good" />
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Warning</p>
                    <StatusPill variant="warning" label="Warning" />
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Excellent</p>
                    <StatusPill variant="excellent" label="Excellent" />
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Error</p>
                    <StatusPill variant="error" label="Error" />
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Info</p>
                    <StatusPill variant="info" label="Info" />
                  </div>
                  <div className="flex flex-col gap-[8px] items-start">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Neutral</p>
                    <StatusPill variant="neutral" label="Neutral" />
                  </div>
                </div>
              </div>

              {/* Props Documentation */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Props
                </h2>
                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F3F6F9]">
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Prop</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Type</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Required</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#1C58F7]">variant</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">'good' | 'warning' | 'excellent' | 'error' | 'info' | 'neutral'</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Yes</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Status variant determining colors</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#1C58F7]">label</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Yes</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Label text to display</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#1C58F7]">className</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">No</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Optional className for custom styling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Example */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Usage Example
                </h2>
                <div className="bg-[#17263D] rounded-[12px] p-[24px]">
                  <pre className="text-[14px] text-white font-mono overflow-x-auto">
{`import { StatusPill } from './components/StatusPill';

<StatusPill variant="excellent" label="Excellent" />
<StatusPill variant="good" label="Good" />
<StatusPill variant="warning" label="Warning" />
<StatusPill variant="error" label="Error" />
<StatusPill variant="info" label="Info" />
<StatusPill variant="neutral" label="Neutral" />`}
                  </pre>
                </div>
              </div>

              {/* Color Specifications */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Color Specifications
                </h2>
                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F3F6F9]">
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Variant</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Background</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Text & Dot</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Good</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#D6EDFF</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#007AFF</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Warning</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#FFF5CC</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#FFD400</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Excellent</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#D6F5E1</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#34C759</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Error</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#FFD6DB</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#FF3B30</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Info</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#D6EDFF</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#007AFF</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Neutral</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#F3F6F9</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#7F8FA4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Tables Tab */}
          {activeTab === 'tables' && (
            <>
              {/* Regional Performance Table Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Regional Performance Table
                </h2>
                <p className="text-[14px] font-normal text-[#7F8FA4] leading-[22px]">
                  Searchable and sortable table showing regional performance metrics with facilities, volume, costs, execution rates, and status indicators.
                </p>

                {/* Live Table Demo */}
                <RegionalPerformanceTable
                  data={[
                    {
                      location: 'Midwest',
                      plants: 8,
                      terminals: 12,
                      volume: 680000,
                      costPerTon: 42.15,
                      costPerTonPre: 48.20,
                      currentCost: 2850000,
                      currentCostPre: 3275000,
                      preNuel: 3275000,
                      executionRate: 89.2,
                      untappedPotential: 425000,
                      alerts: 2,
                      status: 'good',
                    },
                    {
                      location: 'Southeast',
                      plants: 6,
                      terminals: 15,
                      volume: 750000,
                      costPerTon: 38.75,
                      costPerTonPre: 45.80,
                      currentCost: 2906250,
                      currentCostPre: 3435000,
                      preNuel: 3435000,
                      executionRate: 85.7,
                      untappedPotential: 528750,
                      alerts: 0,
                      status: 'good',
                    },
                    {
                      location: 'Northeast',
                      plants: 4,
                      terminals: 8,
                      volume: 420000,
                      costPerTon: 51.20,
                      costPerTonPre: 58.50,
                      currentCost: 2150400,
                      currentCostPre: 2457000,
                      preNuel: 2457000,
                      executionRate: 78.3,
                      untappedPotential: 306600,
                      alerts: 5,
                      status: 'warning',
                    },
                    {
                      location: 'West',
                      plants: 5,
                      terminals: 10,
                      volume: 600000,
                      costPerTon: 35.40,
                      costPerTonPre: 42.90,
                      currentCost: 2124000,
                      currentCostPre: 2574000,
                      preNuel: 2574000,
                      executionRate: 91.5,
                      untappedPotential: 450000,
                      alerts: 1,
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
                  ]}
                />
              </div>

              {/* Features Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Features
                </h2>
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Search Functionality</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Real-time filtering by location name with search icon</p>
                  </div>
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Sortable Columns</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Click column headers to sort ascending/descending with visual indicators</p>
                  </div>
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Progress Bars</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Visual execution rate indicators with percentage</p>
                  </div>
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Status Pills</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Color-coded status indicators (Good, Warning, Excellent)</p>
                  </div>
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Row Hover States</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Subtle background change on mouse hover</p>
                  </div>
                  <div className="bg-[#F3F6F9] rounded-[12px] p-[20px]">
                    <h3 className="text-[16px] font-semibold text-[#17263D] mb-[8px]">Linked Values</h3>
                    <p className="text-[14px] text-[#7F8FA4]">Untapped potential and alerts are clickable with external link icons</p>
                  </div>
                </div>
              </div>

              {/* Props Documentation */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Props
                </h2>
                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F3F6F9]">
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Prop</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Type</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Required</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#1C58F7]">data</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">RegionalData[]</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Yes</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Array of regional performance data</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#1C58F7]">className</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">No</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Optional className for custom styling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Data Interface */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  RegionalData Interface
                </h2>
                <div className="bg-[#17263D] rounded-[12px] p-[24px]">
                  <pre className="text-[14px] text-white font-mono overflow-x-auto">
{`interface RegionalData {
  location: string;
  plants: number;
  terminals: number;
  volume: number;
  costPerTon: number;
  costPerTonPre: number;
  currentCost: number;
  currentCostPre: number;
  preNuel: number;
  executionRate: number;
  untappedPotential: number;
  alerts: number;
  status: 'good' | 'warning' | 'excellent';
}`}
                  </pre>
                </div>
              </div>

              {/* Usage Example */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Usage Example
                </h2>
                <div className="bg-[#17263D] rounded-[12px] p-[24px]">
                  <pre className="text-[14px] text-white font-mono overflow-x-auto">
{`import { RegionalPerformanceTable } from './components/RegionalPerformanceTable';

<RegionalPerformanceTable
  data={[
    {
      location: 'Midwest',
      plants: 8,
      terminals: 12,
      volume: 680000,
      costPerTon: 42.15,
      costPerTonPre: 48.20,
      currentCost: 2850000,
      currentCostPre: 3275000,
      preNuel: 3275000,
      executionRate: 89.2,
      untappedPotential: 425000,
      alerts: 2,
      status: 'good',
    },
    // ... more rows
  ]}
/>`}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Progress Bars Tab */}
          {activeTab === 'progress-bars' && (
            <>
              {/* Progress Bar XL Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Progress Bar XL
                </h2>
                <p className="text-[14px] font-normal text-[#7F8FA4] leading-[22px]">
                  Large progress bar with material icon, showing current value, target, capacity, and status percentage. Includes settings icon and visual progress indicator.
                </p>

                {/* Material Icons */}
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Status Variants
                  </h3>

                  {/* Critical Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Critical (47%)</p>
                    <ProgressBar
                      size="xl"
                      name="KTS"
                      icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" fill="#FF3B30" opacity="0.2" />
                          <circle cx="12" cy="12" r="4" fill="#FF3B30" />
                        </svg>
                      }
                      current={13487}
                      target={18383}
                      capacity={25207}
                      percentage={47}
                      status="critical"
                    />
                  </div>

                  {/* Warning Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Warning (68%)</p>
                    <ProgressBar
                      size="xl"
                      name="KMS"
                      icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" fill="#FFD400" opacity="0.2" />
                          <circle cx="12" cy="12" r="4" fill="#FFD400" />
                        </svg>
                      }
                      current={16829}
                      target={16481}
                      capacity={23063}
                      percentage={68}
                      status="warning"
                    />
                  </div>

                  {/* Good Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Good (83%)</p>
                    <ProgressBar
                      size="xl"
                      name="Thio-Sul"
                      icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" fill="#34C759" opacity="0.2" />
                          <circle cx="12" cy="12" r="4" fill="#34C759" />
                        </svg>
                      }
                      current={25673}
                      target={26127}
                      capacity={29628}
                      percentage={83}
                      status="good"
                    />
                  </div>

                  {/* Excellent Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Excellent (91%)</p>
                    <ProgressBar
                      size="xl"
                      name="CropMax"
                      icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" fill="#007AFF" opacity="0.2" />
                          <circle cx="12" cy="12" r="4" fill="#007AFF" />
                        </svg>
                      }
                      current={28194}
                      target={26301}
                      capacity={28947}
                      percentage={91}
                      status="excellent"
                    />
                  </div>

                  {/* Warning Message State */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">No Data Warning</p>
                    <ProgressBar
                      size="xl"
                      name="Fertilizer X"
                      icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" fill="#7F8FA4" opacity="0.2" />
                          <circle cx="12" cy="12" r="4" fill="#7F8FA4" />
                        </svg>
                      }
                      current={0}
                      target={0}
                      capacity={0}
                      status="warning"
                      warningMessage="No data available for this material/facility"
                    />
                  </div>
                </div>
              </div>

              {/* Progress Bar LG Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Progress Bar LG
                </h2>
                <p className="text-[14px] font-normal text-[#7F8FA4] leading-[22px]">
                  Compact progress bar without icon, showing current value, target, capacity, and status percentage. Perfect for condensed layouts and summaries.
                </p>

                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[16px] font-medium text-[#7F8FA4] leading-[24px]">
                    Status Variants
                  </h3>

                  {/* Critical Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Critical (47%)</p>
                    <ProgressBar
                      size="lg"
                      name="KTS"
                      current={13487}
                      target={18383}
                      capacity={25207}
                      percentage={47}
                      status="critical"
                    />
                  </div>

                  {/* Warning Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Warning (68%)</p>
                    <ProgressBar
                      size="lg"
                      name="KMS"
                      current={16829}
                      target={16481}
                      capacity={23063}
                      percentage={68}
                      status="warning"
                    />
                  </div>

                  {/* Good Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Good (83%)</p>
                    <ProgressBar
                      size="lg"
                      name="Thio-Sul"
                      current={25673}
                      target={26127}
                      capacity={29628}
                      percentage={83}
                      status="good"
                    />
                  </div>

                  {/* Excellent Status */}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[12px] font-medium text-[#7F8FA4]">Excellent (91%)</p>
                    <ProgressBar
                      size="lg"
                      name="CropMax"
                      current={28194}
                      target={26301}
                      capacity={28947}
                      percentage={91}
                      status="excellent"
                    />
                  </div>
                </div>
              </div>

              {/* Usage Example */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Usage Example
                </h2>
                <div className="bg-[#17263D] rounded-[12px] p-[24px]">
                  <pre className="text-[14px] text-white font-mono overflow-x-auto">
{`import { ProgressBar } from './components/ProgressBar';

// XL variant with icon
<ProgressBar
  size="xl"
  name="KTS"
  icon={<MaterialIcon />}
  current={13487}
  target={18383}
  capacity={25207}
  percentage={47}
  status="critical"
  showSettings={true}
  onSettingsClick={() => console.log('Settings clicked')}
/>

// LG variant without icon
<ProgressBar
  size="lg"
  name="KTS"
  current={13487}
  target={18383}
  capacity={25207}
  status="critical"
/>

// Warning state
<ProgressBar
  size="xl"
  name="Material X"
  icon={<MaterialIcon />}
  current={0}
  target={0}
  capacity={0}
  status="warning"
  warningMessage="No data available for this material/facility"
/>`}
                  </pre>
                </div>
              </div>

              {/* Props Documentation */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Props
                </h2>
                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F3F6F9]">
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Prop</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Type</th>
                        <th className="text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">size</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">'xl' | 'lg'</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Size variant</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">name</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Material/item name</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">icon</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">React.ReactNode</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Material icon (for xl size only)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">current</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">number</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Current value</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">target</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">number</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Target value</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">capacity</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">number</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Total capacity</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">percentage</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">number</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Percentage (calculated if not provided)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">status</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">'critical' | 'warning' | 'good' | 'excellent'</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Status for color coding</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">showSettings</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Show settings icon (default: true)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">onSettingsClick</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">() =&gt; void</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Settings click handler</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">warningMessage</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Warning message (e.g., "No data available")</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Inputs Tab */}
          {activeTab === 'inputs' && (
            <>
              {/* Input States Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Input States
                </h2>

                <div className="grid grid-cols-2 gap-[24px]">
                  {/* Default State */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">Default</h3>
                    <Input placeholder="Enter text..." />
                  </div>

                  {/* With Label */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">With Label</h3>
                    <Input label="Target" placeholder="Enter value..." />
                  </div>

                  {/* With Helper Text */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">With Helper Text</h3>
                    <Input
                      label="Target"
                      helperText="Nuel Optimization: 21,920"
                      placeholder="21,920"
                    />
                  </div>

                  {/* Error State */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">Error State</h3>
                    <Input
                      label="Email"
                      errorMessage="Please enter a valid email"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Disabled State */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">Disabled</h3>
                    <Input
                      label="Disabled Input"
                      disabled
                      value="Cannot edit"
                    />
                  </div>

                  {/* With Value */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">With Value</h3>
                    <Input
                      label="Name"
                      value="John Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Textarea Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Textarea
                </h2>

                <div className="grid grid-cols-2 gap-[24px]">
                  {/* Default Textarea */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">Default</h3>
                    <Input
                      variant="textarea"
                      multiline
                      placeholder="Enter your text here..."
                    />
                  </div>

                  {/* With Label */}
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[16px] font-medium text-[#17263D]">With Label</h3>
                    <Input
                      variant="textarea"
                      multiline
                      label="Reason"
                      placeholder="Lorem Ipsum"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Specifications
                </h2>

                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F3F6F9]">
                      <tr>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Property</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Value</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">height</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">38px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Single-line input height</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">padding</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">8px 16px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Vertical and horizontal padding</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">borderRadius</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">8px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Corner radius</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">fontSize</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">14px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Font size for input text</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">defaultBg</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#F3F6F9</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Default background color</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">focusBorder</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#1C58F7</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Focused border color</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">errorBorder</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">#FF3B30</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Error state border color</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Props Table */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Props
                </h2>

                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F3F6F9]">
                      <tr>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Prop</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Type</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">label</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Label text above input</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">helperText</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Helper text below label</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">error</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Error state flag</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">errorMessage</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Error message to display</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">disabled</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Disabled state</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">variant</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">'input' | 'textarea'</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Input type variant</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">multiline</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Enable multiline textarea</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Modals Tab */}
          {activeTab === 'modals' && (
            <>
              {/* Modal Example Section */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Modal Component
                </h2>

                <div className="flex flex-col gap-[16px]">
                  <p className="text-[14px] text-[#7F8FA4] leading-[22px]">
                    Click the button below to open a modal dialog. The modal features:
                  </p>
                  <ul className="list-disc list-inside text-[14px] text-[#7F8FA4] leading-[22px] pl-[8px]">
                    <li>Backdrop blur effect with 40% opacity</li>
                    <li>Smooth entry/exit animations (250ms/200ms)</li>
                    <li>Close on backdrop click, X button, or ESC key</li>
                    <li>Body scroll lock when open</li>
                    <li>Focus trap for keyboard navigation</li>
                    <li>Responsive design (mobile-friendly)</li>
                  </ul>

                  <ModalExample />
                </div>
              </div>

              {/* Modal Specifications */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Specifications
                </h2>

                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F3F6F9]">
                      <tr>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Property</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Value</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">width</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">424px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Default modal width</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">padding</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">24px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Internal padding</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">borderRadius</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">24px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Corner radius</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">shadow</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">0px 4px 16px 8px rgba(0,0,0,0.06)</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Drop shadow</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">backdropBlur</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">8px</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Backdrop blur amount</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">backdropOpacity</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">40% (rgba(0,0,0,0.4))</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Backdrop darkness</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">entryAnimation</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">250ms ease-out</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Open animation duration</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">exitAnimation</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">200ms ease-in</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Close animation duration</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Props Table */}
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold text-[#17263D] leading-[30px]">
                  Props
                </h2>

                <div className="border border-[#D9E0E9] rounded-[12px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F3F6F9]">
                      <tr>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Prop</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Type</th>
                        <th className="px-[16px] py-[12px] text-left text-[14px] font-semibold text-[#17263D]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">isOpen</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Controls modal visibility</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">onClose</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">() =&gt; void</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Close handler function</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">title</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Modal title</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">icon</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">ReactNode</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Icon next to title</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">subtitle</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">string</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Subtitle below title</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">showCloseButton</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Show X button (default: true)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">closeOnBackdrop</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Close on backdrop click (default: true)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">closeOnEscape</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">boolean</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Close on ESC key (default: true)</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">children</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">ReactNode</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Modal content</td>
                      </tr>
                      <tr className="border-t border-[#D9E0E9]">
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">footer</td>
                        <td className="px-[16px] py-[12px] text-[14px] font-mono text-[#7F8FA4]">ReactNode</td>
                        <td className="px-[16px] py-[12px] text-[14px] text-[#7F8FA4]">Footer with action buttons</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal Example Component for showcase
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetValue, setTargetValue] = useState('21,920');
  const [reasonValue, setReasonValue] = useState('Lorem Ipsum');

  return (
    <>
      <Button size="medium" variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal Example
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Configuration"
        icon={<GearSix size={24} weight="regular" color="#1C58F7" />}
        subtitle="Updated: Michael Torres | July 14, 2025"
        footer={
          <>
            <Button
              size="medium"
              variant="secondary"
              onClick={() => setIsOpen(false)}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              size="medium"
              variant="primary"
              onClick={() => {
                console.log('Save clicked');
                setIsOpen(false);
              }}
              style={{ flex: 1 }}
            >
              Update
            </Button>
          </>
        }
      >
        {/* Modal Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              borderBottom: '1px solid #D9E0E9',
              paddingBottom: '16px',
            }}
          >
            <Input
              label="Target"
              helperText="Nuel Optimization: 21,920"
              value={targetValue}
              onChange={(e) => setTargetValue((e.target as HTMLInputElement).value)}
              placeholder="21,920"
            />
          </div>

          <div
            style={{
              borderBottom: '1px solid #D9E0E9',
              paddingBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Input
              variant="textarea"
              multiline
              label="Reason"
              value={reasonValue}
              onChange={(e) => setReasonValue((e.target as HTMLTextAreaElement).value)}
              placeholder="Enter reason..."
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
