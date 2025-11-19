/**
 * Color Design Tokens
 * Extracted from Figma Design System
 *
 * Organized by: Neutral, Brand (Primary/Secondary/Accent),
 * Semantic (Success/Warning/Error/Info), Decorative (Pink/Purple/Teal)
 */

// Neutral Colors
// Used for backgrounds, surfaces, dividers, text, and outlines
export const neutral = {
  0: '#FFFFFF',     // Default Bg
  50: '#F9FAFB',    // App Bg, Clean Surfaces
  100: '#F3F6F9',   // Secondary Bg, Subtle Cards
  200: '#E8EDF2',   // Input Bg, Disabled Elements
  300: '#D9E0E9',   // Default Borders, Section Dividers
  400: '#C3CDD9',   // Muted Icons, Tertiary Text, Strong Borders
  500: '#99A5B8',   // Placeholders, Inactive States
  600: '#7F8FA4',   // Secondary Text, Active Icons
  700: '#5F708B',   // Headings, Primary Text on Light
  800: '#3F4E66',   // Main UI Elements, Strong Contrast
  900: '#2B3649',   // Max Contrast Text, Dark Mode Accents
  950: '#1A2332',   // Overlay Text, Modals, Dark UI Highlights
} as const;

// Primary Colors
// Main brand color. Drives recognition and guides key actions.
export const primary = {
  100: '#EAF0FC',
  200: '#C8D4EB',
  300: '#9EADCC',
  400: '#5A6F97',
  500: '#17263D',   // Main brand color
  600: '#121D31',
  700: '#0E1726',
  800: '#0A111B',
  900: '#070D15',
} as const;

// Secondary Colors
// Supports the primary color. Adds flexibility and variation in layouts or components.
export const secondary = {
  100: '#F4F7FD',
  200: '#E3ECFF',
  300: '#C5DAFF',
  400: '#AAC7FF',
  500: '#9DB8FF',
  600: '#7D9ADD',
  700: '#5F7BB8',
  800: '#435D91',
  900: '#2D4068',
} as const;

// Accent Colors
// Used sparingly to highlight specific elements or actions. Adds energy and attention.
export const accent = {
  100: '#EAF1FF',
  300: '#A8C3FF',
  500: '#1C58F7',   // Main accent color
  700: '#1339A0',
  900: '#0B1F57',
} as const;

// Gradients
export const gradients = {
  primary: {
    start: '#17263D',
    middle: '#0D245C',
    end: '#02227B',
    css: 'linear-gradient(93deg, #17263D 0%, #0D245C 50%, #02227B 100%)',
  },
  secondary: {
    start: '#1C58F7',
    middle: '#628DFB',
    end: '#A8C3FF',
    css: 'linear-gradient(93deg, #1C58F7 0%, #628DFB 50%, #A8C3FF 100%)',
  },
  gold: {
    from: '#FFD170',
    to: '#937231',
    css: 'linear-gradient(90deg, #FFD170 0%, #937231 100%)',
  },
} as const;

// Semantic Colors - Success
// Indicates success, confirmation, or positive outcomes.
export const success = {
  100: '#D6F5E1',
  300: '#99E2B4',
  500: '#34C759',
  700: '#248C3B',
  900: '#12441D',
} as const;

// Semantic Colors - Warning
// Signals caution or something that requires user attention.
export const warning = {
  100: '#FFF5CC',
  300: '#E6B800',
  500: '#C9A700',
  700: '#8C7500',
  900: '#5F5600',
} as const;

// Semantic Colors - Error
// Represents critical issues or errors. Demands immediate attention.
export const error = {
  100: '#FFD6DB',
  300: '#FF99A4',
  500: '#FF3B30',
  700: '#B42A23',
  900: '#661410',
} as const;

// Semantic Colors - Info
// Communicates neutral information, tips, or system updates.
export const info = {
  100: '#D6EDFF',
  300: '#A8D4FF',
  500: '#007AFF',
  700: '#0051C6',
  900: '#002766',
} as const;

// Decorative Colors - Pink
// Adds visual personality. Use for illustrations or background elements.
export const pink = {
  100: '#FFF0F3',
  500: '#FF5F8F',
  900: '#880C3D',
} as const;

// Decorative Colors - Purple
// Adds visual personality. Use for illustrations or background elements.
export const purple = {
  100: '#F9E7FD',
  500: '#D345F8',
  900: '#5B0074',
} as const;

// Decorative Colors - Teal
// Adds visual personality. Use for illustrations or background elements.
export const teal = {
  100: '#E6F6F6',
  500: '#02AAA4',
  900: '#014542',
} as const;

// Combined color palette
export const colors = {
  neutral,
  primary,
  secondary,
  accent,
  success,
  warning,
  error,
  info,
  pink,
  purple,
  teal,
  gradients,
} as const;

// Helper functions
export const getColor = (category: keyof typeof colors, shade: string | number) => {
  const colorCategory = colors[category];
  if (category === 'gradients') {
    return colorCategory;
  }
  return (colorCategory as any)[shade];
};

// Type exports
export type ColorCategory = keyof typeof colors;
export type NeutralShade = keyof typeof neutral;
export type PrimaryShade = keyof typeof primary;
export type SecondaryShade = keyof typeof secondary;
export type AccentShade = keyof typeof accent;
export type SuccessShade = keyof typeof success;
export type WarningShade = keyof typeof warning;
export type ErrorShade = keyof typeof error;
export type InfoShade = keyof typeof info;
export type PinkShade = keyof typeof pink;
export type PurpleShade = keyof typeof purple;
export type TealShade = keyof typeof teal;

// Export default
export default colors;
