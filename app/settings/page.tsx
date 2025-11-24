'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { NotificationsPanel } from '@/app/components/NotificationsPanel';
import { useAuth } from '@/app/context/AuthContext';
import { Image as ImageIcon } from '@phosphor-icons/react';
import { SettingsNavbar, SettingsNavItem } from '@/app/components/SettingsNavbar';
import { Input } from '@/app/components/Input';
import { Dropdown } from '@/app/components/Dropdown';
import { Button } from '@/app/components/Button';
import { COLORS, BORDER_RADIUS, LAYOUT_SPACING } from '@/app/design-tokens';

// Industry options for dropdown
const industryOptions = [
  { value: 'Fertilizers & Agriculture', label: 'Fertilizers & Agriculture' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Chemical Processing', label: 'Chemical Processing' },
  { value: 'Food & Beverage', label: 'Food & Beverage' },
  { value: 'Other', label: 'Other' },
];

export default function SettingsPage() {
  const [activeNavItem, setActiveNavItem] = useState<SettingsNavItem>('account');
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const { logout } = useAuth();

  // Company Information form state
  const [companyName, setCompanyName] = useState('Tessendro Kerley inc');
  const [industry, setIndustry] = useState('Fertilizers & Agriculture');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [website, setWebsite] = useState('https://tessenderlo.com');
  const [address, setAddress] = useState('2255 N. Dobson Rd, Suite 105, Chandler, AZ 85224');

  // Profile Settings form state
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@tessenderlo.com');
  const [role] = useState('Executive manager');

  const renderAccountProfile = () => (
    <div className="flex flex-col gap-[24px]">
      {/* Company Information Card */}
      <div
        className="flex flex-col bg-white p-[24px]"
        style={{ borderRadius: BORDER_RADIUS.lg }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] mb-[16px]">
          <h3
            className="text-[18px] leading-[26px] font-semibold"
            style={{ color: COLORS.text.primary }}
          >
            Company information
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Update your company&apos;s profile and contact details
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px]">
          {/* Row 1: Company Name & Industry */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <Input
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Dropdown
                label="Industry"
                value={industry}
                options={industryOptions}
                onChange={setIndustry}
                variant="secondary"
                width="100%"
              />
            </div>
          </div>

          {/* Row 2: Phone Number & Website */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <Input
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Address (full width) */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex">
            <Button size="small" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Settings Card */}
      <div
        className="flex flex-col bg-white p-[24px]"
        style={{ borderRadius: BORDER_RADIUS.lg }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] mb-[16px]">
          <h3
            className="text-[18px] leading-[26px] font-semibold"
            style={{ color: COLORS.text.primary }}
          >
            Profile Settings
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Manage your profile and settings
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px]">
          {/* Profile Image Section */}
          <div className="flex items-center gap-[16px]">
            <div
              className="flex items-center justify-center"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#E8EDF2',
              }}
            >
              <ImageIcon size={32} color={COLORS.text.secondary} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Button size="small" variant="secondary">
                Change Photo
              </Button>
              <p
                className="text-[12px] leading-[20px] font-normal"
                style={{ color: COLORS.text.secondary }}
              >
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Row 1: First Name & Last Name */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Email & Role */}
          <div className="flex gap-[16px]">
            <div className="flex-1">
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input label="Role" value={role} disabled />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex">
            <Button size="small" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Account Card */}
      <div
        className="flex flex-col bg-white p-[24px]"
        style={{ borderRadius: BORDER_RADIUS.lg }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[4px] mb-[16px]">
          <h3
            className="text-[18px] leading-[26px] font-semibold"
            style={{ color: COLORS.text.primary }}
          >
            Delete Account
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Permanently delete your account and all its data. This action cannot be undone.
          </p>
        </div>

        {/* Delete Button */}
        <div>
          <button
            className="px-[12px] py-[6px] rounded-[8px] text-[12px] leading-[20px] font-medium text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#FF3B30' }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderComingSoon = (title: string) => (
    <div
      className="flex-1 flex items-center justify-center bg-white"
      style={{ borderRadius: BORDER_RADIUS.lg, minHeight: '400px' }}
    >
      <div className="text-center">
        <h3
          className="text-[24px] leading-[32px] font-semibold mb-[8px]"
          style={{ color: COLORS.text.primary }}
        >
          {title}
        </h3>
        <p
          className="text-[16px] leading-[24px]"
          style={{ color: COLORS.text.secondary }}
        >
          Coming Soon
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNavItem) {
      case 'account':
        return renderAccountProfile();
      case 'security':
        return renderComingSoon('Security & Access');
      case 'team':
        return renderComingSoon('Team Management');
      case 'notifications':
        return renderComingSoon('Notifications');
      case 'data':
        return renderComingSoon('Data & Privacy');
      case 'support':
        return renderComingSoon('Support & Help');
      default:
        return renderAccountProfile();
    }
  };

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
            mode="executive"
            variant="expanded"
            activeItem="dashboard"
            onNotificationsClick={() => setIsNotificationsPanelOpen(true)}
            onLogout={logout}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Content Wrapper with shared padding */}
          <div
            className="flex-1 flex min-w-0 overflow-y-auto gap-[16px]"
            style={{
              paddingLeft: LAYOUT_SPACING.contentEdge,
              paddingRight: LAYOUT_SPACING.pageEdge,
              paddingTop: LAYOUT_SPACING.pageEdge,
              paddingBottom: LAYOUT_SPACING.pageEdge,
            }}
          >
            {/* Left Navigation Card */}
            <SettingsNavbar
              activeItem={activeNavItem}
              onItemClick={setActiveNavItem}
            />

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto">
              {renderContent()}
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
