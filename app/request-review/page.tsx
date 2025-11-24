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
// REQUEST UNDER REVIEW PAGE
// ============================================

export default function RequestReviewPage() {
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

      {/* Request Review Card */}
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
            Your Request is Under Review
          </h1>
          <p className="text-body-sm text-neutral-500">
            We&apos;ve received your registration request for the Nuel platform
          </p>
        </div>

        {/* What Happens Next Box */}
        <div className="p-16 bg-neutral-50 rounded-lg mb-24">
          <h3 className="text-body-sm font-semibold text-neutral-900 mb-12">
            What Happens Next?
          </h3>
          <ol className="text-body-sm text-neutral-500 space-y-8 list-decimal list-inside">
            <li>Your IT administrator will review your registration request.</li>
            <li>Once approved, you&apos;ll receive a magic link invitation via email.</li>
            <li>Click the link to set your password and complete registration.</li>
            <li>You&apos;ll be ready to access your dashboard.</li>
          </ol>
        </div>

        {/* Button - Links to set-password for demo */}
        <Link href="/set-password">
          <Button
            variant="primary"
            size="medium"
            className="w-full justify-center"
          >
            Click to View Next Steps
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
