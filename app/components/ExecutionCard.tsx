'use client';

import React, { useState } from 'react';
import { COLORS, CARD_CURVATURE, BORDER_RADIUS, TYPOGRAPHY, SPACING } from '../design-tokens';
import { Button } from './Button';
import { StatusPill } from './StatusPill';
import { ExecutionModal } from './ExecutionModal';
import {
  Bell,
  Calendar,
  Target,
  ChevronUp,
  ChevronDown,
  Check,
  Clock,
  DollarSign,
  Truck,
} from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ActionOption {
  id: string;
  title: string;
  recommended?: boolean;
  description: string;
  cost: string;
  delivery: string;
  impact: string;
  buttonVariant: 'primary' | 'secondary';
  onExecute?: () => void;
  executed?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon?: 'check' | 'clock';
  variant: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
}

export interface ExecutionCardProps {
  id: number | string;
  icon?: 'bell';
  title: string;
  status: 'critical' | 'warning' | 'completed';
  statusLabel: string;
  description: string;
  dueDate: string;
  potentialSavings: string;
  actionOptionsCount: number;
  defaultExpanded?: boolean;
  actionOptions?: ActionOption[];
  quickActions?: QuickAction[];
}

// ============================================
// SUB-COMPONENT: ACTION OPTION CARD
// ============================================

interface ActionOptionCardProps {
  option: ActionOption;
}

const ActionOptionCard: React.FC<ActionOptionCardProps> = ({ option }) => {
  return (
    <div
      className="border transition-all duration-200"
      style={{
        borderRadius: BORDER_RADIUS.md,
        borderColor: option.recommended ? COLORS.primary[500] : COLORS.border.subtle,
        backgroundColor: option.recommended ? COLORS.neutral[0] : COLORS.neutral[50],
        padding: SPACING[16],
      }}
    >

      {/* Header with title and recommended badge */}
      <div className="flex items-start justify-between mb-6">
        <h4
          className="font-semibold"
          style={{
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
            lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
            fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
          }}
        >
          {option.title}
        </h4>
        {option.recommended && (
          <span
            className="px-3 py-1 text-white whitespace-nowrap ml-2"
            style={{
              backgroundColor: COLORS.primary[500],
              borderRadius: BORDER_RADIUS.full,
              fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
              fontWeight: TYPOGRAPHY.bodyExtraSmallMedium.fontWeight,
              opacity: option.executed ? 0.5 : 1,
            }}
          >
            Recommended
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="mb-6"
        style={{
          color: COLORS.text.secondary,
          fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
        }}
      >
        {option.description}
      </p>

      {/* Metadata - Horizontal Layout */}
      <div className="flex items-center gap-4 flex-wrap mb-6">
        {/* Cost */}
        <div className="flex items-center gap-2">
          <DollarSign
            size={16}
            style={{ color: COLORS.text.secondary }}
            aria-hidden="true"
          />
          <span
            style={{
              color: COLORS.text.secondary,
              fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
            }}
          >
            Cost: <span className="font-medium">{option.cost}</span>
          </span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2">
          <Truck
            size={16}
            style={{ color: COLORS.text.secondary }}
            aria-hidden="true"
          />
          <span
            style={{
              color: COLORS.text.secondary,
              fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
            }}
          >
            Delivery: <span className="font-medium">{option.delivery}</span>
          </span>
        </div>

        {/* Impact */}
        <div className="flex items-center gap-2">
          <Target
            size={16}
            style={{ color: COLORS.text.secondary }}
            aria-hidden="true"
          />
          <span
            style={{
              color: COLORS.text.secondary,
              fontSize: TYPOGRAPHY.bodyExtraSmallMedium.fontSize,
            }}
          >
            Impact: <span className="font-medium">{option.impact}</span>
          </span>
        </div>
      </div>

      {/* Execute Button - Always Primary, Disabled when executed */}
      <div className="w-full mt-8">
        <Button
          onClick={option.executed ? undefined : option.onExecute}
          variant="primary"
          size="medium"
          className="w-full justify-center"
          disabled={option.executed}
          aria-label={`Execute ${option.title} option`}
          icon={option.executed ? <Check size={18} /> : undefined}
        >
          {option.executed ? 'Executed' : 'Execute this option'}
        </Button>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT: EXECUTION CARD
// ============================================

export const ExecutionCard: React.FC<ExecutionCardProps> = ({
  id,
  icon = 'bell',
  title,
  status,
  statusLabel,
  description,
  dueDate,
  potentialSavings,
  actionOptionsCount,
  defaultExpanded = false,
  actionOptions = [],
  quickActions = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ActionOption | null>(null);
  const [executedOptions, setExecutedOptions] = useState<Set<string>>(new Set());

  // Map status to StatusPill variant
  const getStatusPillVariant = () => {
    switch (status) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'completed':
        return 'excellent';
      default:
        return 'info';
    }
  };

  // Handle execute button click - opens ExecutionModal
  const handleExecute = (option: ActionOption) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle execution complete - marks option as executed
  const handleExecutionComplete = () => {
    if (selectedOption) {
      setExecutedOptions((prev) => new Set(prev).add(selectedOption.id));
    }
  };

  // Icon rendering
  const renderIcon = () => {
    const IconComponent = Bell;
    return (
      <div
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: COLORS.accent[100],
        }}
        aria-hidden="true"
      >
        <IconComponent size={20} style={{ color: COLORS.primary[500] }} />
      </div>
    );
  };

  // Quick action button rendering
  const renderQuickAction = (action: QuickAction) => {
    const isPrimary = action.variant === 'primary';
    const isSecondary = action.variant === 'secondary';
    const isText = action.variant === 'text';

    const IconComponent =
      action.icon === 'check' ? Check : action.icon === 'clock' ? Clock : null;

    if (isText) {
      return (
        <button
          key={action.id}
          onClick={action.onClick}
          className="hover:underline transition-all"
          style={{
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          }}
          aria-label={action.label}
        >
          {action.label}
        </button>
      );
    }

    return (
      <Button
        key={action.id}
        onClick={action.onClick}
        variant={action.variant as 'primary' | 'secondary'}
        size="medium"
        icon={IconComponent ? <IconComponent size={16} /> : undefined}
        aria-label={action.label}
      >
        {action.label}
      </Button>
    );
  };

  return (
    <article
      className="bg-white"
      style={{
        borderRadius: CARD_CURVATURE,
      }}
      role="article"
      aria-labelledby={`execution-card-title-${id}`}
    >
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 mb-6">
        {/* Icon */}
        {renderIcon()}

        {/* Title */}
        <h3
          id={`execution-card-title-${id}`}
          className="flex-1"
          style={{
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.bodyLargeBold.fontSize,
            lineHeight: TYPOGRAPHY.bodyLargeBold.lineHeight,
            fontWeight: TYPOGRAPHY.bodyLargeBold.fontWeight,
          }}
        >
          {title}
        </h3>

        {/* Status Badge */}
        <StatusPill
          variant={getStatusPillVariant() as any}
          label={statusLabel}
        />
      </div>

      {/* BODY SECTION */}
      <div className="mb-6">
        {/* Description */}
        <p
          className="mb-4"
          style={{
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
            lineHeight: TYPOGRAPHY.bodySmallMedium.lineHeight,
          }}
        >
          {description}
        </p>

        {/* Metadata Row */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* Due Date */}
          <div className="flex items-center gap-1.5">
            <Calendar
              size={14}
              style={{ color: COLORS.text.secondary }}
              aria-hidden="true"
            />
            <span
              className="uppercase"
              style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              }}
            >
              DUE: {dueDate}
            </span>
          </div>

          {/* Potential Savings */}
          <div className="flex items-center gap-1.5">
            <Target
              size={14}
              style={{ color: COLORS.text.secondary }}
              aria-hidden="true"
            />
            <span
              style={{
                color: COLORS.text.secondary,
                fontSize: TYPOGRAPHY.bodyExtraSmallText.fontSize,
              }}
            >
              {potentialSavings} POTENTIAL SAVINGS
            </span>
          </div>
        </div>
      </div>

      {/* ACTION OPTIONS TOGGLE */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mb-6 mt-6 hover:underline transition-all"
        style={{
          color: COLORS.primary[500],
          fontSize: TYPOGRAPHY.bodySmallMedium.fontSize,
          fontWeight: TYPOGRAPHY.bodySmallMedium.fontWeight,
        }}
        aria-expanded={isExpanded}
        aria-controls={`action-options-${id}`}
        aria-label={`${isExpanded ? 'Hide' : 'Show'} action options`}
      >
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span>
          {isExpanded ? 'Hide' : 'Review'} Action Options ({actionOptionsCount}{' '}
          available)
        </span>
      </button>

      {/* ACTION OPTIONS SECTION (Expandable) */}
      {isExpanded && actionOptions.length > 0 && (
        <div
          id={`action-options-${id}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          role="region"
          aria-label="Available action options"
        >
          {actionOptions.map((option) => {
            const optionWithHandlers = {
              ...option,
              executed: executedOptions.has(option.id) || option.executed,
              onExecute: () => handleExecute(option),
            };
            return <ActionOptionCard key={option.id} option={optionWithHandlers} />;
          })}
        </div>
      )}

      {/* FOOTER ACTION BUTTONS (When Collapsed) */}
      {!isExpanded && quickActions.length > 0 && (
        <div
          className="flex items-center justify-end gap-3 flex-wrap"
          role="group"
          aria-label="Quick actions"
        >
          {quickActions.map(renderQuickAction)}
        </div>
      )}

      {/* EXECUTION MODAL - Using existing Modal component */}
      <ExecutionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onComplete={handleExecutionComplete}
        selectedOption={selectedOption}
      />
    </article>
  );
};

export default ExecutionCard;
