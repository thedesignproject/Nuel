/**
 * Typography Design Tokens
 * Extracted from Figma Design System
 *
 * Font: DM Sans (Google Font)
 * Available weights: 100, 200, 300, 400, 500, 600, 700, 800, 900
 */

// Font Families
export const fontFamily = {
  sans: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
  display: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
} as const;

// Font Sizes
export const fontSize = {
  // Headings
  h1: '60px',      // 3.75rem
  h2: '48px',      // 3rem
  h3: '40px',      // 2.5rem
  h4: '30px',      // 1.875rem
  h5: '28px',      // 1.75rem
  h6: '24px',      // 1.5rem

  // Body
  'body-lg': '18px',   // 1.125rem
  'body-md': '16px',   // 1rem
  'body-sm': '14px',   // 0.875rem
  'body-xs': '12px',   // 0.75rem

  // Special
  caption: '10px',     // 0.625rem
  table: '10px',       // 0.625rem
} as const;

// Font Weights
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Line Heights
export const lineHeight = {
  // Headings
  h1: '72px',      // 4.5rem
  h2: '58px',      // 3.625rem
  h3: '48px',      // 3rem
  h4: '38px',      // 2.375rem
  h5: '40px',      // 2.5rem
  h6: '30px',      // 1.875rem

  // Body
  'body-lg': '26px',   // 1.625rem
  'body-md': '24px',   // 1.5rem
  'body-sm': '22px',   // 1.375rem
  'body-xs': '20px',   // 1.25rem

  // Special
  caption: '16px',     // 1rem
  table: '14px',       // 0.875rem
} as const;

// Letter Spacing
export const letterSpacing = {
  normal: '0',
  tight: '-0.5px',
  wide: '0.2px',
} as const;

// Text Transform
export const textTransform = {
  none: 'none',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
} as const;

// Complete Typography Styles
export const typography = {
  // Special Headings
  'heading-h1': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h1,
    letterSpacing: letterSpacing.normal,
  },
  'heading-h2': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h2,
    letterSpacing: letterSpacing.normal,
  },
  'heading-h3': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h3,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h3,
    letterSpacing: letterSpacing.normal,
  },
  'heading-h4': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h4,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h4,
    letterSpacing: letterSpacing.normal,
  },
  'heading-h5': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h5,
    letterSpacing: letterSpacing.normal,
  },
  'heading-h6': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.h6,
    letterSpacing: letterSpacing.normal,
  },

  // Body Large
  'body-large-regular': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-lg'],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight['body-lg'],
    letterSpacing: letterSpacing.normal,
  },
  'body-large-medium': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-lg'],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight['body-lg'],
    letterSpacing: letterSpacing.normal,
  },
  'body-large-semibold': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-lg'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight['body-lg'],
    letterSpacing: letterSpacing.normal,
  },
  'body-large-bold': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-lg'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['body-lg'],
    letterSpacing: letterSpacing.normal,
  },

  // Body Medium
  'body-medium-regular': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-md'],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight['body-md'],
    letterSpacing: letterSpacing.normal,
  },
  'body-medium-medium': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-md'],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight['body-md'],
    letterSpacing: letterSpacing.wide,
  },
  'body-medium-semibold': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-md'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight['body-md'],
    letterSpacing: letterSpacing.normal,
  },
  'body-medium-bold': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-md'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['body-md'],
    letterSpacing: letterSpacing.normal,
  },

  // Body Small
  'body-small-regular': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-sm'],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight['body-sm'],
    letterSpacing: letterSpacing.normal,
  },
  'body-small-medium': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-sm'],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight['body-sm'],
    letterSpacing: letterSpacing.normal,
  },

  // Body Extra Small
  'body-extra-small-regular': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-xs'],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight['body-xs'],
    letterSpacing: letterSpacing.normal,
  },
  'body-extra-small-medium': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['body-xs'],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight['body-xs'],
    letterSpacing: letterSpacing.normal,
  },

  // Caption
  'caption-regular': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.normal,
    textTransform: textTransform.uppercase,
  },
  'caption-semibold': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.normal,
    textTransform: textTransform.uppercase,
  },

  // Other
  'table-description': {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.table,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.table,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// Export individual style getters for easier usage
export const getTypographyStyle = (variant: keyof typeof typography) => typography[variant];

// Type exports for TypeScript
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type TypographyVariant = keyof typeof typography;
