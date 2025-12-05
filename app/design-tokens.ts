/**
 * Design Tokens
 * Universal design system tokens extracted from Figma
 *
 * Usage: Import and use these tokens throughout the application
 * to maintain consistency with the Figma design system
 */

// ============================================
// SPACING & SIZING TOKENS
// ============================================

/**
 * Card Curvature Token
 * Universal border radius for all card components
 * Extracted from Figma: var(--spacing/16, 16px)
 *
 * Applied to:
 * - Metric Cards (KPI Cards)
 * - Notification Cards
 * - Activity Alert Widget
 * - All other card-based components
 */
export const CARD_CURVATURE = '16px';

/**
 * Standard spacing scale
 * Matches Figma spacing tokens
 */
export const SPACING = {
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
} as const;

/**
 * Layout spacing tokens
 * Standardized spacing for page layout consistency
 */
export const LAYOUT_SPACING = {
  /** Page edge padding (sidebar, content areas) */
  pageEdge: '24px',
  /** Gap between top nav and content */
  contentTopGap: '16px',
  /** Sidebar minimum width */
  sidebarMinWidth: '188px',
  /** Sidebar maximum width */
  sidebarMaxWidth: '236px',
  /** Reduced padding for content area */
  contentEdge: '4px',
} as const;

// ============================================
// COLOR TOKENS
// ============================================

/**
 * Color palette matching Figma design system
 * Uses var() with fallback values for compatibility
 */
export const COLORS = {
  // Backgrounds
  neutral: {
    0: '#ffffff',
    50: '#f9fafb', // Near-white
    100: '#f3f4f6',
    200: '#f3f6f9', // Light gray background
  },
  accent: {
    100: '#eaf0fc', // Light blue backgrounds
    200: '#eaf1ff',
    500: '#1c58f7', // Primary blue
  },

  // Primary color scale (for forecast cards)
  primary: {
    300: '#9eadcc', // Gray-purple for icons
    500: '#365ec8', // Blue for icons and bullets
    700: '#1339a0', // Darker blue
    900: '#070d15', // Dark/black for icons
  },

  // Text colors
  text: {
    primary: '#17263d',
    secondary: '#7f8fa4',
    tertiary: '#2b3649',
    dark: '#0a111b',
    muted: '#717182',
    heading: '#2b3649',
  },

  // Semantic colors
  semantic: {
    success: {
      500: '#34c759',
      600: '#34c759',
    },
    error: {
      100: '#FFD6DB',
      500: '#FF3B30',
    },
    warning: {
      50: 'rgba(255, 245, 204, 0.31)', // Light yellow with opacity
      100: '#FFF5CC',
      300: '#FFE066',
      400: '#FFD400',
      500: '#C9A700',
    },
    info: {
      100: '#D6EDFF',
      500: '#007AFF',
    },
  },

  // Borders
  border: {
    default: '#d9e0e9',
    subtle: '#d9e0e9',
  },

  // Gradients
  gradient: {
    blue: 'linear-gradient(135deg, rgba(28, 88, 247, 1) 0%, rgba(98, 141, 251, 1) 50%, rgba(168, 195, 255, 1) 100%)',
    darkBlue: 'linear-gradient(135deg, rgba(23, 38, 61, 1) 0%, rgba(13, 36, 92, 1) 50%, rgba(2, 34, 123, 1) 100%)',
  },
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

/**
 * Typography scale matching Figma text styles
 */
export const TYPOGRAPHY = {
  // Headings
  headingH5: {
    fontFamily: 'DM Sans',
    fontSize: '28px',
    lineHeight: '40px', // 1.43em
    fontWeight: 600,
  },
  headingH6: {
    fontFamily: 'DM Sans',
    fontSize: '24px',
    lineHeight: '30px', // 1.25em
    fontWeight: 600,
  },

  // Body Large
  bodyLargeMedium: {
    fontFamily: 'DM Sans',
    fontSize: '18px',
    lineHeight: '26px', // 1.44em
    fontWeight: 500,
  },
  bodyLargeBold: {
    fontFamily: 'DM Sans',
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 700,
  },

  // Body Medium
  bodyMediumMedium: {
    fontFamily: 'DM Sans',
    fontSize: '16px',
    lineHeight: '24px', // 1.5em
    fontWeight: 500,
    letterSpacing: '0.02em', // 1.25%
  },
  bodyMediumSemiBold: {
    fontFamily: 'DM Sans',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
  },

  // Body Small
  bodySmallText: {
    fontFamily: 'DM Sans',
    fontSize: '14px',
    lineHeight: '22px', // 1.57em
    fontWeight: 400,
  },
  bodySmallMedium: {
    fontFamily: 'DM Sans',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 500,
  },

  // Body Extra Small
  bodyExtraSmallText: {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    lineHeight: '20px', // 1.67em
    fontWeight: 400,
  },
  bodyExtraSmallMedium: {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 500,
  },

  // Trend/Insight text (10px / 16px / 400, uppercase)
  captionRegular: {
    fontFamily: 'DM Sans',
    fontSize: '10px',
    lineHeight: '16px',
    fontWeight: 400,
    textTransform: 'uppercase' as const,
  },
} as const;

// ============================================
// BORDER RADIUS TOKENS
// ============================================

export const BORDER_RADIUS = {
  card: CARD_CURVATURE, // 16px - Universal card border radius
  full: '9999px', // Full rounded (pills, circles)
  sm: '8px',
  md: '12px',
  lg: '24px',
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get consistent card styling
 * Returns Tailwind classes for standard card appearance
 */
export const getCardStyles = () => {
  return 'bg-white rounded-[16px] p-[16px]';
};

/**
 * Get glass effect styling (for nav components)
 * Returns Tailwind classes for glass morphism effect
 */
export const getGlassEffectStyles = () => {
  return 'bg-white/35 backdrop-blur-md';
};
