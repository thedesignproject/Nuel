'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard as the landing page
    router.replace('/dashboard');
  }, [router]);

  return null;
}
