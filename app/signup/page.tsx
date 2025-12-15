'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

// ============================================
// SIGN UP PAGE
// ============================================

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name) {
      setError('Please enter your name');
      return;
    }
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!agreeToTerms) {
      setError('Please agree to the Privacy Policy and Terms & Conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Auto-login the user after successful signup
      await login(email, 'defaultpassword');

      // Redirect to dashboard
      router.push('/dashboard');
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

      {/* Sign Up Card */}
      <div className="w-full max-w-[400px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
            Create an Account
          </h1>
          <p className="text-body-sm text-neutral-500">
            Create your account to access Nuel inventory management
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
          {/* Name Input */}
          <Input
            label="Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          {/* Terms Agreement */}
          <div className="flex items-start gap-8">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-16 h-16 mt-2 rounded-sm border-neutral-300 text-accent-500 focus:ring-accent-500 cursor-pointer"
              disabled={isLoading}
            />
            <span className="text-body-sm text-neutral-900 font-sans">
              I agree to the{' '}
              <a href="#" className="text-accent-500 underline hover:opacity-80">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-accent-500 underline hover:opacity-80">
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full justify-center mt-8"
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-center mt-24 text-body-sm text-neutral-500 font-sans">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-accent-500 underline hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        </p>
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
