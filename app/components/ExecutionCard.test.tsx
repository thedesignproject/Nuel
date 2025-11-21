'use client';

import React from 'react';
import { ExecutionCard, ExecutionCardProps } from './ExecutionCard';

// ============================================
// TEST DATA FROM FIGMA (PHASE 1)
// ============================================

export const executionCardTestData: ExecutionCardProps[] = [
  // Card 1: Critical Shortage Risk
  {
    id: 1,
    icon: 'bell',
    title: 'Critical Shortage Risk — Houston Terminal',
    status: 'critical',
    statusLabel: 'Critical',
    description:
      'Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks',
    dueDate: '7/9/2025',
    potentialSavings: '$125,000',
    actionOptionsCount: 2,
    defaultExpanded: true,
    actionOptions: [
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
    ],
  },

  // Card 2: Optimization Opportunity
  {
    id: 2,
    icon: 'bell',
    title: 'Optimization Opportunity — Midwest Region',
    status: 'warning',
    statusLabel: 'Warning',
    description:
      'Current inventory at 45% capacity with forecasted demand exceeding supply by 2,800 tons over next 8 weeks',
    dueDate: '7/3/2025',
    potentialSavings: '$125,000',
    actionOptionsCount: 2,
    defaultExpanded: false,
    quickActions: [
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
    ],
    actionOptions: [
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
    ],
  },
];

// ============================================
// TEST COMPONENT
// ============================================

export const ExecutionCardTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Execution Card Component Test
        </h1>
        <p className="text-gray-600 mb-8">
          Testing with exact data from Figma (Phase 1)
        </p>

        <div className="space-y-6">
          {executionCardTestData.map((cardData) => (
            <ExecutionCard key={cardData.id} {...cardData} />
          ))}
        </div>

        {/* Additional test cases */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Additional Test Cases
          </h2>

          {/* Completed status test */}
          <ExecutionCard
            id={3}
            icon="bell"
            title="Inventory Rebalancing — East Coast Network"
            status="completed"
            statusLabel="Completed"
            description="Successfully redistributed 5,000 tons across three facilities, improving capacity utilization by 15%"
            dueDate="6/28/2025"
            potentialSavings="$85,000"
            actionOptionsCount={0}
            defaultExpanded={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutionCardTest;
