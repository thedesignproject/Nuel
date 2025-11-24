'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface FadeInSectionProps {
  /** Content to animate */
  children: React.ReactNode;
  /** Delay before animation starts (in ms) */
  delay?: number;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
}

/**
 * FadeInSection Component
 * Provides a subtle fade-in and slide-up animation when element enters viewport
 * Used for dashboard sections to create a polished appearance
 */
export const FadeInSection = React.forwardRef<HTMLDivElement, FadeInSectionProps>(
  ({ children, delay = 0, className, style }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              // Apply delay before triggering animation
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, [isVisible, delay]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          ...style,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {children}
      </div>
    );
  }
);

FadeInSection.displayName = 'FadeInSection';
