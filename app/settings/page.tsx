'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { NotificationsPanel } from '@/app/components/NotificationsPanel';
import { useAuth } from '@/app/context/AuthContext';
import { Image as ImageIcon } from '@phosphor-icons/react';
import { SettingsNavbar, SettingsNavItem } from '@/app/components/SettingsNavbar';
import { Input } from '@/app/components/Input';
import { PasswordInput } from '@/app/components/PasswordInput';
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

  // Security & Access form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notifications form state
  const [accountSecurityAlerts, setAccountSecurityAlerts] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [logisticsAlerts, setLogisticsAlerts] = useState(false);
  const [forecastAlerts, setForecastAlerts] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [criticalAlertsMethod, setCriticalAlertsMethod] = useState('Email + SMS');
  const [standardAlertsMethod, setStandardAlertsMethod] = useState('Email');

  // Data & Privacy form state
  const [dataProcessingConsent, setDataProcessingConsent] = useState(true);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [marketingCommunications, setMarketingCommunications] = useState(false);

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

  // Toggle Component
  const Toggle = ({
    checked,
    onChange,
    label
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between py-[12px]">
      <span
        className="text-[14px] leading-[22px] font-normal"
        style={{ color: COLORS.text.primary }}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors duration-200"
        style={{
          backgroundColor: checked ? '#1C58F7' : '#C3CDD9',
        }}
      >
        <span
          className="inline-block h-[20px] w-[20px] transform rounded-full bg-white transition-transform duration-200"
          style={{
            transform: checked ? 'translateX(22px)' : 'translateX(2px)',
          }}
        />
      </button>
    </div>
  );

  const renderSecurityAccess = () => (
    <div className="flex flex-col gap-[24px]">
      {/* Password & Authentication Card */}
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
            Password & Authentication
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Secure your account with a strong password and two-factor authentication
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px]">
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Change Password Button */}
          <div className="flex">
            <Button size="small" variant="primary">
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Two Factor Authentication Card */}
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
            Two Factor Authentication
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Add an extra layer of security to your account
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px]">
          <Toggle
            checked={twoFactorEnabled}
            onChange={setTwoFactorEnabled}
            label="Enable Two-Factor Authentication"
          />

          {/* Enable/Disable Button */}
          <div className="flex">
            <Button size="small" variant="primary">
              {twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="flex flex-col gap-[24px]">
      {/* Notification Preferences Card */}
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
            Notification Preferences
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Choose what notifications you want to receive
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col">
          <Toggle
            checked={accountSecurityAlerts}
            onChange={setAccountSecurityAlerts}
            label="Account & Security alerts"
          />
          <Toggle
            checked={systemUpdates}
            onChange={setSystemUpdates}
            label="System Updates"
          />
          <Toggle
            checked={weeklyReports}
            onChange={setWeeklyReports}
            label="Weekly Reports"
          />
        </div>
      </div>

      {/* Alert Preferences Card */}
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
            Alert Preferences
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Customize which alerts you want to receive
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col">
          <Toggle
            checked={inventoryAlerts}
            onChange={setInventoryAlerts}
            label="Inventory Alerts"
          />
          <Toggle
            checked={logisticsAlerts}
            onChange={setLogisticsAlerts}
            label="Logistics Alerts"
          />
          <Toggle
            checked={forecastAlerts}
            onChange={setForecastAlerts}
            label="Forecast Alerts"
          />
          <Toggle
            checked={criticalAlerts}
            onChange={setCriticalAlerts}
            label="Critical Alerts"
          />
        </div>
      </div>

      {/* Notification Methods Card */}
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
            Notification Methods
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Select how you want to receive different types of alerts
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[16px]">
          <Dropdown
            label="Critical Alerts"
            value={criticalAlertsMethod}
            options={[
              { value: 'Email + SMS', label: 'Email + SMS' },
              { value: 'Email', label: 'Email' },
              { value: 'SMS', label: 'SMS' },
              { value: 'None', label: 'None' },
            ]}
            onChange={setCriticalAlertsMethod}
            variant="secondary"
            width="100%"
          />
          <Dropdown
            label="Standard Alerts"
            value={standardAlertsMethod}
            options={[
              { value: 'Email', label: 'Email' },
              { value: 'SMS', label: 'SMS' },
              { value: 'Email + SMS', label: 'Email + SMS' },
              { value: 'None', label: 'None' },
            ]}
            onChange={setStandardAlertsMethod}
            variant="secondary"
            width="100%"
          />

          {/* Save Button */}
          <div className="flex">
            <Button size="small" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataPrivacy = () => (
    <div className="flex flex-col gap-[24px]">
      {/* Privacy & Compliance Card */}
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
            Privacy & Compliance
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Manage your data privacy settings and consent preferences
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col">
          <Toggle
            checked={dataProcessingConsent}
            onChange={setDataProcessingConsent}
            label="Data Processing Consent"
          />
          <Toggle
            checked={analyticsTracking}
            onChange={setAnalyticsTracking}
            label="Analytics & Tracking"
          />
          <Toggle
            checked={marketingCommunications}
            onChange={setMarketingCommunications}
            label="Marketing Communications"
          />
        </div>
      </div>
    </div>
  );

  const renderSupportHelp = () => (
    <div className="flex flex-col gap-[24px]">
      {/* Get Help Card */}
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
            Get Help
          </h3>
          <p
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Access resources and support for your account
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
          {/* Help Documentation */}
          <div
            className="flex flex-col p-[16px] bg-[#F9FAFB]"
            style={{ borderRadius: '12px' }}
          >
            <h4
              className="text-[16px] leading-[24px] font-semibold mb-[4px]"
              style={{ color: COLORS.text.primary }}
            >
              Help Documentation
            </h4>
            <p
              className="text-[14px] leading-[22px] font-normal"
              style={{ color: COLORS.text.secondary }}
            >
              Browse our comprehensive guides and tutorials
            </p>
          </div>

          {/* Contact Support */}
          <div
            className="flex flex-col p-[16px] bg-[#F9FAFB]"
            style={{ borderRadius: '12px' }}
          >
            <h4
              className="text-[16px] leading-[24px] font-semibold mb-[4px]"
              style={{ color: COLORS.text.primary }}
            >
              Contact Support
            </h4>
            <p
              className="text-[14px] leading-[22px] font-normal"
              style={{ color: COLORS.text.secondary }}
            >
              Get in touch with our support team
            </p>
          </div>
        </div>

        {/* Links with External Icons */}
        <div className="flex flex-col gap-[8px]">
          {[
            { label: 'API Documentation', href: '#' },
            { label: 'Video Tutorials', href: '#' },
            { label: 'System Status', href: '#' },
            { label: 'Feature Requests', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between py-[12px] px-[16px] rounded-[8px] hover:bg-[#F9FAFB] transition-colors"
            >
              <span
                className="text-[14px] leading-[22px] font-normal"
                style={{ color: COLORS.text.primary }}
              >
                {link.label}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333"
                  stroke="#7F8FA4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* System Information Card */}
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
            System Information
          </h3>
        </div>

        {/* Version Info */}
        <div className="flex items-center justify-between py-[12px]">
          <span
            className="text-[14px] leading-[22px] font-normal"
            style={{ color: COLORS.text.secondary }}
          >
            Nuel Platform Version
          </span>
          <span
            className="text-[14px] leading-[22px] font-medium"
            style={{ color: COLORS.text.primary }}
          >
            v2.4.1
          </span>
        </div>

        {/* Recent Updates */}
        <div className="flex flex-col gap-[4px] mt-[8px]">
          <p
            className="text-[12px] leading-[20px] font-medium"
            style={{ color: COLORS.text.secondary }}
          >
            Recent Updates
          </p>
          <ul className="list-disc list-inside space-y-[4px]">
            {[
              'Enhanced security features',
              'Performance improvements',
              'New notification system',
              'Bug fixes and optimizations',
            ].map((update, index) => (
              <li
                key={index}
                className="text-[12px] leading-[20px] font-normal"
                style={{ color: COLORS.text.secondary }}
              >
                {update}
              </li>
            ))}
          </ul>
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
        return renderSecurityAccess();
      case 'team':
        return renderComingSoon('Team Management');
      case 'notifications':
        return renderNotifications();
      case 'data':
        return renderDataPrivacy();
      case 'support':
        return renderSupportHelp();
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
