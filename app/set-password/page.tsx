'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';

// ============================================
// SET PASSWORD PAGE
// ============================================

export default function SetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperAndLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isPasswordValid = hasMinLength && hasUpperAndLower && hasNumber && hasSpecialChar && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm your password');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }
    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    setIsLoading(true);

    // Simulate setting password
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to password set confirmation page
      router.push('/password-set');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Set Password Card */}
      <div className="w-full max-w-[480px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
            Welcome to Nuel!
          </h1>
          <p className="text-body-sm text-neutral-500">
            Your account has been approved. Please set a secure password to complete your registration.
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
          {/* New Password Input */}
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Confirm Password Input */}
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            error={confirmPassword.length > 0 && !passwordsMatch}
            errorMessage={confirmPassword.length > 0 && !passwordsMatch ? 'Passwords do not match' : undefined}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full justify-center"
            disabled={isLoading || !isPasswordValid}
          >
            {isLoading ? 'Setting Password...' : 'Set Password and Continue'}
          </Button>
        </form>

        {/* Password Requirements Box */}
        <div className="mt-24 p-16 bg-neutral-50 rounded-lg">
          <h3 className="text-body-sm font-semibold text-neutral-900 mb-12">
            Password Requirements:
          </h3>
          <ul className="text-body-sm text-neutral-500 space-y-6">
            <li className={`flex items-center gap-8 ${hasMinLength ? 'text-success-500' : ''}`}>
              <span className={`w-4 h-4 rounded-full ${hasMinLength ? 'bg-success-500' : 'bg-neutral-300'}`} />
              At least 8 characters long
            </li>
            <li className={`flex items-center gap-8 ${hasUpperAndLower ? 'text-success-500' : ''}`}>
              <span className={`w-4 h-4 rounded-full ${hasUpperAndLower ? 'bg-success-500' : 'bg-neutral-300'}`} />
              Include uppercase and lowercase letters
            </li>
            <li className={`flex items-center gap-8 ${hasNumber ? 'text-success-500' : ''}`}>
              <span className={`w-4 h-4 rounded-full ${hasNumber ? 'bg-success-500' : 'bg-neutral-300'}`} />
              Include at least one number
            </li>
            <li className={`flex items-center gap-8 ${hasSpecialChar ? 'text-success-500' : ''}`}>
              <span className={`w-4 h-4 rounded-full ${hasSpecialChar ? 'bg-success-500' : 'bg-neutral-300'}`} />
              Include at least one special character (!@#$%^&*)
            </li>
          </ul>
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
