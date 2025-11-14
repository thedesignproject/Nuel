/**
 * Spacing Design Tokens
 * Extracted from Figma Design System
 *
 * Used for margins, padding, gaps, and other spacing values
 */

// Base spacing scale (in pixels)
export const spacing = {
  0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  36: '36px',
  40: '40px',
  44: '44px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',
  80: '80px',
  96: '96px',
  128: '128px',
  160: '160px',
  192: '192px',
  224: '224px',
  256: '256px',
} as const;

// Border radius values (from Figma button specs)
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// Type exports
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;

// Export default
export default {
  spacing,
  borderRadius,
};
