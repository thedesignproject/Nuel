'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Bell,
  Database,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type SidebarMode = 'executive' | 'management';
export type SidebarVariant = 'expanded' | 'collapsed';

export interface SidebarProps {
  /** Additional className */
  className?: string;
  /** Current mode - Executive or Management */
  mode?: SidebarMode;
  /** Whether sidebar is collapsed or expanded */
  variant?: SidebarVariant;
  /** Active navigation item */
  activeItem?: string;
  /** Callback when mode changes */
  onModeChange?: (mode: SidebarMode) => void;
  /** Callback when variant changes */
  onVariantChange?: (variant: SidebarVariant) => void;
  /** Callback when navigation item is clicked */
  onNavigate?: (item: string) => void;
  /** Callback when notifications is clicked */
  onNotificationsClick?: () => void;
  /** Callback when settings is clicked */
  onSettings?: () => void;
  /** Callback when logout is clicked */
  onLogout?: () => void;
  /** User name */
  userName?: string;
  /** User email */
  userEmail?: string;
  /** User avatar URL */
  userAvatar?: string;
}

// Navigation items for Executive mode
const executiveNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'inventory', label: 'Inventory', icon: 'package' },
  { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
  { id: 'forecast', label: 'Forecast', icon: 'trending-up' },
  { id: 'gaps', label: 'Gaps', icon: 'alert-triangle' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
];

// Navigation items for Management mode
const managementNavItems = [
  { id: 'inventory', label: 'Inventory', icon: 'package' },
  { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
  { id: 'forecast', label: 'Forecast', icon: 'trending-up' },
  { id: 'gaps', label: 'Gaps', icon: 'alert-triangle' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
];

/**
 * Sidebar Component
 * Exactly replicates the Figma "Sidebar" design with three variants
 *
 * Specifications from Figma:
 * - Expanded Width: 188px
 * - Collapsed Width: 80px
 * - Height: 100% (full height)
 * - Background: White (#FFFFFF)
 * - Border Radius: 16px
 * - Two modes: Executive and Management
 * - Three variants: Executive Expanded, Management Expanded, Collapsed (both modes)
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      mode = 'executive',
      variant = 'expanded',
      activeItem = 'dashboard',
      onModeChange,
      onVariantChange,
      onNavigate,
      onNotificationsClick,
      onSettings,
      onLogout,
      userName = 'John Doe RM',
      userEmail = 'johndoe@nuel.com',
      userAvatar,
    },
    ref
  ) => {
    const router = useRouter();
    const [internalMode, setInternalMode] = useState(mode);
    const [internalVariant, setInternalVariant] = useState(variant);
    const [internalActiveItem, setInternalActiveItem] = useState(activeItem);

    const currentMode = onModeChange ? mode : internalMode;
    const currentVariant = onVariantChange ? variant : internalVariant;
    const currentActiveItem = onNavigate ? activeItem : internalActiveItem;

    const isExpanded = currentVariant === 'expanded';
    const navItems = currentMode === 'executive' ? executiveNavItems : managementNavItems;

    const handleModeToggle = () => {
      const newMode = currentMode === 'executive' ? 'management' : 'executive';
      if (onModeChange) {
        onModeChange(newMode);
      } else {
        setInternalMode(newMode);
      }
      // Navigate to the appropriate dashboard when mode changes
      if (newMode === 'management') {
        router.push('/management/dashboard');
      } else {
        router.push('/dashboard');
      }
    };

    const handleVariantToggle = () => {
      const newVariant = currentVariant === 'expanded' ? 'collapsed' : 'expanded';
      if (onVariantChange) {
        onVariantChange(newVariant);
      } else {
        setInternalVariant(newVariant);
      }
    };

    const handleNavigationClick = (itemId: string) => {
      if (onNavigate) {
        onNavigate(itemId);
      } else {
        setInternalActiveItem(itemId);
      }
    };

    // Icon helper function - Returns Lucide React icons
    const getIcon = (iconName: string) => {
      const iconProps = { size: 16, strokeWidth: 1.5 };

      switch (iconName) {
        case 'layout-dashboard':
          return <LayoutDashboard {...iconProps} />;
        case 'package':
          return <Package {...iconProps} />;
        case 'shopping-cart':
          return <ShoppingCart {...iconProps} />;
        case 'trending-up':
          return <TrendingUp {...iconProps} />;
        case 'alert-triangle':
          return <AlertTriangle {...iconProps} />;
        case 'bell':
          return <Bell {...iconProps} />;
        case 'database':
          return <Database {...iconProps} />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center gap-[10px] h-full', className)}
      >
        {/* Sidebar Container */}
        <div
          className={cn(
            'flex flex-col h-full overflow-clip rounded-[16px] bg-white/35 backdrop-blur-md transition-all duration-500 ease-in-out',
            isExpanded ? 'w-[188px]' : 'w-[80px]'
          )}
        >
          {/* Logo and Chip Container */}
          <div className="bg-transparent border-b-[0.5px] border-[#D9E0E9]/30 rounded-tl-[16px] rounded-tr-[16px]">
            <div className="flex items-center gap-[12px] px-[16px] pb-[24px]">
              <div className="flex flex-col items-center justify-center pb-[19.8px]">
                {/* NUEL Logo */}
                <div className="flex items-center justify-center h-[88px] py-[13.2px] mb-[-19.8px] transition-all duration-500 ease-in-out">
                  {isExpanded ? (
                    /* Full NUEL Logo when expanded */
                    <svg width="134" height="62" viewBox="0 0 134 88" fill="none" className="w-auto h-[62px] transition-all duration-500 ease-in-out">
                      <path d="M29.6132 32.4456C30.9038 32.7023 32.097 33.0513 33.2579 33.678C36.3695 35.3583 38.3779 38.6191 38.6128 42.149L38.609 55.5535H31.7911V42.2479C31.7911 41.0868 30.0772 39.2648 28.903 39.2648H22.3218V55.5544H15.5039V39.1697L15.591 38.9804L22.0377 38.9605V32.5587L22.2262 32.4456H29.6122H29.6132Z" fill="#17263D"/>
                      <path d="M49.8349 32.4465L50.0243 32.5119L50.0195 45.429C50.3917 48.1611 52.2666 48.6087 54.7078 48.5708C56.9094 48.5366 58.8004 48.0132 59.1195 45.5124L59.1148 32.5613L59.3042 32.4465H66.1221V46.0928C65.7367 50.2531 62.8069 53.9335 58.7777 55.1075C56.685 55.7173 52.3064 55.704 50.2174 55.062C46.229 53.8377 43.3389 50.1516 43.0132 46.0027L43.017 32.4456H49.8349V32.4465Z" fill="#17263D"/>
                      <path d="M93.6309 32.4456L93.612 40.7131L89.1441 45.231H79.6509L85.4129 39.2648H80.2649C79.3137 39.2648 77.9932 40.5162 77.6512 41.3787C77.2668 42.3477 77.2441 45.4288 77.5681 46.4197C77.8921 47.4106 79.2362 48.7352 80.2649 48.7352H93.6309V55.5544H79.6037C78.2917 55.5544 75.7167 54.3125 74.6521 53.5109C70.9031 50.6856 70.307 46.6042 70.5791 42.1499C70.8379 37.922 73.7331 34.1411 77.7655 32.8763L79.5565 32.4465H93.6309V32.4456Z" fill="#17263D"/>
                      <path d="M104.986 32.4456L105.179 32.5112L105.178 45.8246C105.451 47.2708 106.643 48.389 108.143 48.5421H118.008L118.125 48.7323V55.5506L107.543 55.5544C102.617 55.1228 98.592 51.2177 98.0327 46.4113L98.0308 32.4456H104.986Z" fill="#17263D"/>
                    </svg>
                  ) : (
                    /* Logo and Chip Container (N with golden pill) when collapsed */
                    <svg width="48" height="62" viewBox="0 0 80 95" fill="none" className="w-auto h-[62px] transition-all duration-500 ease-in-out">
                      <path d="M42.5555 32.4456C43.8462 32.7023 45.0393 33.0513 46.2003 33.678C49.3119 35.3583 51.3203 38.6191 51.5552 42.149L51.5514 55.5535H44.7335V42.2479C44.7335 41.0868 43.0195 39.2648 41.8453 39.2648H35.2642V55.5544H28.4463V39.1697L28.5334 38.9804L34.9801 38.9605V32.5587L35.1685 32.4456H42.5546H42.5555Z" fill="#17263D"/>
                    </svg>
                  )}
                </div>

                {/* Golden Pill - Mode Toggle */}
                <button
                  onClick={handleModeToggle}
                  className={cn(
                    'bg-gradient-to-r from-[#FFD170] to-[#937231] border border-[#FFD170] rounded-[999px] mb-[-19.8px] transition-all duration-500 ease-in-out',
                    isExpanded ? 'opacity-100 w-[125.84px]' : 'opacity-0 w-[48px] pointer-events-none'
                  )}
                >
                  <div className="flex items-center justify-center px-[13.2px] py-[2.2px]">
                    <p className="font-['DM_Sans'] font-bold text-[11px] leading-[22px] tracking-[0.55px] text-[#F9FAFB] text-center uppercase">
                      {currentMode === 'executive' ? 'EXECUTIVE' : 'MANAGEMENT'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 flex flex-col gap-[8px] px-[16px] py-[24px] min-h-0">
            {navItems.map((item) => {
              // Special handling for notifications item
              if (item.id === 'notifications' && onNotificationsClick) {
                return (
                  <button
                    key={item.id}
                    onClick={onNotificationsClick}
                    className={cn(
                      'flex items-center h-[38px] px-[12px] py-[8px] rounded-[12px] transition-all duration-300',
                      isExpanded ? 'justify-start' : 'justify-center',
                      'hover:bg-[#F3F6F9]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-[16px] h-[16px] flex-shrink-0',
                        'text-[#7F8FA4]'
                      )}
                    >
                      {getIcon(item.icon)}
                    </div>
                    {isExpanded && (
                      <p
                        className={cn(
                          'ml-[12px] font-["DM_Sans"] font-normal text-[14px] leading-[22px] whitespace-nowrap text-left',
                          'text-[#7F8FA4]'
                        )}
                      >
                        {item.label}
                      </p>
                    )}
                  </button>
                );
              }

              // Regular navigation items
              return (
                <Link
                  key={item.id}
                  href={currentMode === 'management' ? `/management/${item.id}` : `/${item.id}`}
                  className={cn(
                    'flex items-center h-[38px] px-[12px] py-[8px] rounded-[12px] transition-all duration-300',
                    isExpanded ? 'justify-start' : 'justify-center',
                    currentActiveItem === item.id
                      ? 'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]'
                      : 'hover:bg-[#F3F6F9]'
                  )}
                >
                  <div
                    className={cn(
                      'w-[16px] h-[16px] flex-shrink-0',
                      currentActiveItem === item.id ? 'text-white' : 'text-[#7F8FA4]'
                    )}
                  >
                    {getIcon(item.icon)}
                  </div>
                  {isExpanded && (
                    <p
                      className={cn(
                        'ml-[12px] font-["DM_Sans"] font-normal text-[14px] leading-[22px] whitespace-nowrap text-left',
                        currentActiveItem === item.id ? 'text-white' : 'text-[#7F8FA4]'
                      )}
                    >
                      {item.label}
                    </p>
                  )}
                </Link>
              );
            })}

            {/* Spacer and Divider */}
            <div className="flex-1 flex flex-col justify-end gap-[8px]">
              <div className="h-[0.5px] bg-[#D9E0E9] w-full" />

              {/* Data Hub - Available in both Executive and Management modes */}
              <Link
                href={currentMode === 'management' ? '/management/data-hub' : '/data-hub'}
                className={cn(
                  'flex items-center h-[38px] px-[12px] py-[8px] rounded-[12px] transition-all duration-300',
                  isExpanded ? 'justify-start' : 'justify-center',
                  currentActiveItem === 'data-hub'
                    ? 'bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B]'
                    : 'hover:bg-[#F3F6F9]'
                )}
              >
                <div
                  className={cn(
                    'w-[16px] h-[16px] flex-shrink-0',
                    currentActiveItem === 'data-hub' ? 'text-white' : 'text-[#7F8FA4]'
                  )}
                >
                  <Database size={16} strokeWidth={1.5} />
                </div>
                {isExpanded && (
                  <p
                    className={cn(
                      'ml-[12px] font-["DM_Sans"] font-normal text-[14px] leading-[22px] whitespace-nowrap text-left',
                      currentActiveItem === 'data-hub' ? 'text-white' : 'text-[#7F8FA4]'
                    )}
                  >
                    Data Hub
                  </p>
                )}
              </Link>
            </div>
          </div>

          {/* Profile/Settings/Logout Section */}
          <div className="bg-[#17263D] px-[16px] py-[24px] rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[24px] rounded-br-[24px]">
            <div className="flex flex-col gap-[8px]">
              {/* Profile Link */}
              <div
                className={cn(
                  'flex items-center gap-[8px] pb-[8px] border-b-[0.5px] border-[#C3CDD9]',
                  isExpanded ? '' : 'justify-center'
                )}
              >
                <div className="w-[40px] h-[40px] flex-shrink-0">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full rounded-[8px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[8px] bg-[#0E1726] flex items-center justify-center">
                      <span className="text-white text-[14px] font-medium">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                {isExpanded && (
                  <div className="flex flex-col">
                    <p className="font-['DM_Sans'] font-medium text-[14px] leading-[22px] text-white">
                      {userName}
                    </p>
                    <p className="font-['DM_Sans'] font-normal text-[12px] leading-[20px] text-[#F3F6F9]">
                      {userEmail}
                    </p>
                  </div>
                )}
              </div>

              {/* Settings Link */}
              <button
                onClick={onSettings}
                className={cn(
                  'flex items-center justify-start h-[38px] px-[6px] py-[8px] rounded-[8px] hover:bg-[#1C2B42] transition-colors'
                )}
              >
                <div className="w-[32px] h-[32px] bg-[#0E1726] rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-[16px] h-[16px] text-[#F3F6F9]">
                    <Settings size={16} strokeWidth={1.5} />
                  </div>
                </div>
                {isExpanded && (
                  <p className="ml-[12px] font-['DM_Sans'] font-normal text-[14px] leading-[22px] text-[#F3F6F9] text-left">
                    Settings
                  </p>
                )}
              </button>

              {/* Logout Link */}
              <button
                onClick={onLogout}
                className={cn(
                  'flex items-center justify-start h-[38px] px-[6px] py-[8px] rounded-[8px] hover:bg-[#1C2B42] transition-colors'
                )}
              >
                <div className="w-[32px] h-[32px] bg-[#0E1726] rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-[16px] h-[16px] text-[#F3F6F9]">
                    <LogOut size={16} strokeWidth={1.5} />
                  </div>
                </div>
                {isExpanded && (
                  <p className="ml-[12px] font-['DM_Sans'] font-normal text-[14px] leading-[22px] text-[#F3F6F9] text-left">
                    Log Out
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={handleVariantToggle}
          className="absolute right-[-12px] top-[40px] w-[24px] h-[24px] bg-gradient-to-r from-[#17263D] via-[#0D245C] to-[#02227B] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-300 ease-in-out"
        >
          <div className="w-[14px] h-[14px] text-white transition-transform duration-500 ease-in-out">
            {isExpanded ? (
              <ChevronLeft size={14} strokeWidth={1.5} />
            ) : (
              <ChevronRight size={14} strokeWidth={1.5} />
            )}
          </div>
        </button>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';
