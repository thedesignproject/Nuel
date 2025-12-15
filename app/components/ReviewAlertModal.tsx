'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { StatusPill } from './StatusPill';

interface AlertData {
  id: string;
  title: string;
  description: string;
  status: 'critical' | 'warning' | 'success';
  statusLabel: string;
  region?: string;
  impact?: string;
  reported?: string;
}

interface ReviewAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: AlertData | null;
  onComplete?: (data: {
    priority: string;
    assignedTo: string;
    notes: string;
  }) => void;
  onMarkUnread?: () => void;
}

export const ReviewAlertModal: React.FC<ReviewAlertModalProps> = ({
  isOpen,
  onClose,
  alert,
  onComplete,
  onMarkUnread,
}) => {
  const [priority, setPriority] = useState('Medium Priority');
  const [assignedTo, setAssignedTo] = useState('');
  const [notes, setNotes] = useState('');

  if (!alert) return null;

  const handleComplete = () => {
    onComplete?.({
      priority,
      assignedTo,
      notes,
    });
    // Reset form
    setPriority('Medium Priority');
    setAssignedTo('');
    setNotes('');
    onClose();
  };

  const handleMarkUnread = () => {
    onMarkUnread?.();
    onClose();
  };

  // Alert icon
  const alertIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 9V13"
        stroke="#FF3B30"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke="#FF3B30"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3L3 21H21L12 3Z"
        stroke="#FF3B30"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Footer with action buttons
  const footer = (
    <div className="flex items-center gap-[12px] justify-end w-full">
      <button
        onClick={handleMarkUnread}
        className="px-[16px] py-[8px] rounded-[12px] text-[12px] leading-[20px] font-normal text-[#17263D] hover:bg-[#F3F6F9] transition-colors"
        style={{ fontFamily: 'DM Sans' }}
      >
        Mark as Unread
      </button>
      <button
        onClick={handleComplete}
        className="px-[16px] py-[8px] rounded-[8px] text-[12px] leading-[20px] font-normal text-[#F9FAFB] transition-colors"
        style={{
          fontFamily: 'DM Sans',
          background: 'linear-gradient(135deg, #17263D 0%, #0D245C 50%, #02227B 100%)',
        }}
      >
        Complete Review
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alerts Review"
      icon={alertIcon}
      subtitle="Review alert details and assign follow-up questions"
      footer={footer}
      width="800px"
      maxWidth="800px"
    >
      {/* Content */}
      <div className="flex flex-col gap-[12px] p-[16px] bg-[#F3F6F9] rounded-[16px]">
        {/* Alert Card */}
        <div className="flex flex-col gap-[12px] bg-[#F3F6F9] rounded-[16px]">
          <div className="flex flex-col gap-[4px] pb-[12px]">
            <div className="flex items-center gap-[24px]">
              <div className="flex items-center gap-[8px] flex-1">
                <StatusPill
                  label={alert.statusLabel}
                  variant={alert.status}
                  showDot={true}
                />
                <p
                  className="text-[16px] leading-[24px] font-semibold text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {alert.title}
                </p>
              </div>
            </div>
            <p
              className="text-[14px] leading-[22px] font-normal text-[#7F8FA4]"
              style={{ fontFamily: 'DM Sans' }}
            >
              {alert.description}
            </p>
          </div>

          {/* Info Sections */}
          <div className="flex flex-col gap-[8px]">
            {alert.region && (
              <div className="flex items-center gap-[8px]">
                <p
                  className="text-[12px] leading-[20px] font-normal text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Region:
                </p>
                <p
                  className="text-[14px] leading-[22px] font-medium text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {alert.region}
                </p>
              </div>
            )}
            {alert.impact && (
              <div className="flex items-center gap-[8px]">
                <p
                  className="text-[12px] leading-[20px] font-normal text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Impact:
                </p>
                <p
                  className="text-[14px] leading-[22px] font-medium text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {alert.impact}
                </p>
              </div>
            )}
            {alert.reported && (
              <div className="flex items-center gap-[8px]">
                <p
                  className="text-[12px] leading-[20px] font-normal text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  Reported:
                </p>
                <p
                  className="text-[14px] leading-[22px] font-medium text-[#17263D]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {alert.reported}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex gap-[12px]">
          {/* Priority Level Dropdown */}
          <div className="flex flex-col gap-[8px] flex-1">
            <label
              className="text-[14px] leading-[22px] font-normal text-[#17263D]"
              style={{ fontFamily: 'DM Sans' }}
            >
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-[12px] py-[8px] bg-white rounded-[8px] text-[14px] leading-[22px] font-normal text-[#7F8FA4] border-0 outline-none"
              style={{ fontFamily: 'DM Sans' }}
            >
              <option value="Low Priority">Low Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="High Priority">High Priority</option>
              <option value="Critical Priority">Critical Priority</option>
            </select>
          </div>

          {/* Assigned To Dropdown */}
          <div className="flex flex-col gap-[8px] flex-1">
            <label
              className="text-[14px] leading-[22px] font-normal text-[#17263D]"
              style={{ fontFamily: 'DM Sans' }}
            >
              Assigned To
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-[12px] py-[8px] bg-white rounded-[8px] text-[14px] leading-[22px] font-normal text-[#7F8FA4] border-0 outline-none"
              style={{ fontFamily: 'DM Sans' }}
            >
              <option value="">Select team member</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Sarah Williams">Sarah Williams</option>
            </select>
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="flex flex-col gap-[8px]">
          <label
            className="text-[14px] leading-[22px] font-normal text-[#17263D]"
            style={{ fontFamily: 'DM Sans' }}
          >
            Review Notes and Action Items
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe your review findings, recommended actions and any follow ups required."
            rows={4}
            className="w-full px-[12px] py-[8px] bg-white rounded-[8px] text-[14px] leading-[22px] font-normal text-[#17263D] placeholder:text-[#7F8FA4] border-0 outline-none resize-none"
            style={{ fontFamily: 'DM Sans' }}
          />
        </div>
      </div>
    </Modal>
  );
};
