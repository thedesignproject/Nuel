'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '../components/Input';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

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
// SIGN IN PAGE
// ============================================

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      // Use AuthContext login function
      const success = await login(email, password);

      if (success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        // AuthContext will handle redirect to dashboard
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Invalid email or password');
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

      {/* Sign In Card */}
      <div className="w-full max-w-[400px] bg-white rounded-xl p-24 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-h6 font-semibold text-neutral-900 mb-8">
            Welcome Back
          </h1>
          <p className="text-body-sm text-neutral-500">
            Sign in to access your inventory dashboard
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

          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-8 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-16 h-16 rounded-sm border-neutral-300 text-accent-500 focus:ring-accent-500 cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-body-sm text-neutral-900 font-sans">
                Remember me
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-body-sm text-neutral-900 underline hover:opacity-80 transition-opacity font-sans"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full justify-center mt-8"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-24 text-body-sm text-neutral-500 font-sans">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-accent-500 underline hover:opacity-80 transition-opacity"
          >
            Sign Up
          </Link>
        </p>

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
