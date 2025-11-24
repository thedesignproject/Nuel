'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
// PASSWORD SET CONFIRMATION PAGE
// ============================================

export default function PasswordSetPage() {
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

      {/* Success Card */}
      <div className="w-full max-w-[480px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        {/* Check Icon */}
        <div className="flex justify-center mb-16">
          <div className="w-48 h-48 rounded-full bg-neutral-900 flex items-center justify-center">
            <CheckIcon />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
            Password Set Successfully!
          </h1>
          <p className="text-body-sm text-neutral-500">
            Your password has been set and your account is now ready. You can now sign in to access your dashboard.
          </p>
        </div>

        {/* Button */}
        <Link href="/signin">
          <Button
            variant="primary"
            size="medium"
            className="w-full justify-center"
          >
            Continue to Sign In
          </Button>
        </Link>
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
