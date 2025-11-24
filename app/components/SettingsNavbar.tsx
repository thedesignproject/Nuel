'use client';

import React from 'react';
import {
  User,
  ShieldCheck,
  UsersThree,
  Bell,
  Database,
  Question,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export type SettingsNavItem =
  | 'account'
  | 'security'
  | 'team'
  | 'notifications'
  | 'data'
  | 'support';

interface SettingsNavbarProps {
  activeItem: SettingsNavItem;
  onItemClick: (item: SettingsNavItem) => void;
}

const navItems: { id: SettingsNavItem; label: string; icon: React.ReactNode }[] = [
  { id: 'account', label: 'Account & Profile', icon: <User size={16} weight="regular" /> },
  { id: 'security', label: 'Security & Access', icon: <ShieldCheck size={16} weight="regular" /> },
  { id: 'team', label: 'Team Management', icon: <UsersThree size={16} weight="regular" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} weight="regular" /> },
  { id: 'data', label: 'Data & Privacy', icon: <Database size={16} weight="regular" /> },
  { id: 'support', label: 'Support & Help', icon: <Question size={16} weight="regular" /> },
];

export const SettingsNavbar: React.FC<SettingsNavbarProps> = ({
  activeItem,
  onItemClick,
}) => {
  return (
    <div
      className="flex flex-col gap-[8px] p-[16px] bg-white"
      style={{
        width: '240px',
        minWidth: '240px',
        borderRadius: '24px',
      }}
    >
      {navItems.map((item) => {
        const isActive = activeItem === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              'flex items-center gap-[12px]',
              'px-[12px] py-[8px]',
              'rounded-[8px]',
              'transition-all duration-150',
              'text-left w-full',
              isActive
                ? 'bg-[#D9E0E9]'
                : 'bg-transparent hover:bg-[#F3F6F9]'
            )}
          >
            <span
              className={cn(
                'flex-shrink-0',
                isActive ? 'text-[#17263D]' : 'text-[#7F8FA4]'
              )}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                'text-[14px] leading-[22px]',
                isActive
                  ? 'font-medium text-[#17263D]'
                  : 'font-normal text-[#7F8FA4]'
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

SettingsNavbar.displayName = 'SettingsNavbar';
