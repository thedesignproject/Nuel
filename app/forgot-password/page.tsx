'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// ============================================
// CHECK ICON
// ============================================

const CheckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill="white"
    />
  </svg>
);

// ============================================
// SUPPORT ICON
// ============================================

const SupportIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
      fill="currentColor"
    />
  </svg>
);

// ============================================
// FORGOT PASSWORD PAGE
// ============================================

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);

    // Simulate sending reset email
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSentToEmail(email);
      setIsEmailSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Email resent successfully
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToDifferentEmail = () => {
    setIsEmailSent(false);
    setEmail('');
    setSentToEmail('');
  };

  // Email Sent State
  if (isEmailSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-16 bg-neutral-50 font-sans">
        {/* Logo */}
        <div className="mb-24">
          <Image
            src="/Logo.svg"
            alt="Nuel"
            width={134}
            height={88}
            priority
          />
        </div>

        {/* Email Sent Card */}
        <div className="w-full max-w-[400px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
          {/* Check Icon */}
          <div className="flex justify-center mb-16">
            <div className="w-48 h-48 rounded-full bg-neutral-900 flex items-center justify-center">
              <CheckIcon />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-24">
            <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
              Email Sent!
            </h1>
            <p className="text-body-sm text-neutral-500">
              We&apos;ve sent password reset instructions to{' '}
              <span className="font-semibold text-neutral-900">{sentToEmail}</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-12">
            <Button
              variant="primary"
              size="medium"
              className="w-full justify-center"
              onClick={handleResendEmail}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Resend Email'}
            </Button>

            <Button
              variant="secondary"
              size="medium"
              className="w-full justify-center"
              onClick={handleSendToDifferentEmail}
            >
              Send To a Different Email
            </Button>
          </div>

          {/* Back to Sign In */}
          <div className="text-center mt-24">
            <Link
              href="/signin"
              className="text-body-sm text-accent-500 hover:opacity-80 transition-opacity font-sans"
            >
              ← Back to Sign In
            </Link>
          </div>

          {/* Support Link */}
          <div className="flex items-center justify-center gap-4 mt-16 text-neutral-500">
            <SupportIcon />
            <a
              href="#"
              className="text-body-sm hover:opacity-80 transition-opacity font-sans"
            >
              Support
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 text-center">
          <div className="flex items-center justify-center gap-16 mb-8">
            <a
              href="#"
              className="text-body-sm text-neutral-500 underline hover:opacity-80 transition-opacity font-sans"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-body-sm text-neutral-500 underline hover:opacity-80 transition-opacity font-sans"
            >
              Terms & Conditions
            </a>
          </div>
          <p className="text-body-xs text-neutral-500 font-sans">
            Nuel v2.4.1 • Secure Enterprise Platform
          </p>
        </div>
      </div>
    );
  }

  // Reset Password Form State
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-16 bg-neutral-50 font-sans">
      {/* Logo */}
      <div className="mb-24">
        <Image
          src="/Logo.svg"
          alt="Nuel"
          width={134}
          height={88}
          priority
        />
      </div>

      {/* Reset Password Card */}
      <div className="w-full max-w-[400px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
            Reset Password
          </h1>
          <p className="text-body-sm text-neutral-500">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-16 p-12 rounded-md bg-error-100 text-error-500 text-body-sm font-sans">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full justify-center"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </Button>
        </form>

        {/* Back to Sign In */}
        <div className="text-center mt-24">
          <Link
            href="/signin"
            className="text-body-sm text-accent-500 hover:opacity-80 transition-opacity font-sans"
          >
            ← Back to Sign In
          </Link>
        </div>

        {/* Support Link */}
        <div className="flex items-center justify-center gap-4 mt-16 text-neutral-500">
          <SupportIcon />
          <a
            href="#"
            className="text-body-sm hover:opacity-80 transition-opacity font-sans"
          >
            Support
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 text-center">
        <div className="flex items-center justify-center gap-16 mb-8">
          <a
            href="#"
            className="text-body-sm text-neutral-500 underline hover:opacity-80 transition-opacity font-sans"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-body-sm text-neutral-500 underline hover:opacity-80 transition-opacity font-sans"
          >
            Terms & Conditions
          </a>
        </div>
        <p className="text-body-xs text-neutral-500 font-sans">
          Nuel v2.4.1 • Secure Enterprise Platform
        </p>
      </div>
    </div>
  );
}
