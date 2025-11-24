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
    50: '#f9fafb', // Near-white for icons
  },
  accent: {
    100: '#eaf1ff', // Light blue for icon backgrounds
    500: '#1c58f7', // Primary blue for values
  },

  // Primary color scale (for forecast cards)
  primary: {
    300: '#9eadcc', // Gray-purple for icons
    500: '#365ec8', // Blue for icons and bullets
    900: '#070d15', // Dark/black for icons
  },

  // Text colors
  text: {
    primary: '#17263d',
    secondary: '#7f8fa4',
  },

  // Semantic colors
  semantic: {
    success: {
      500: '#34c759',
    },
    error: {
      100: '#FFD6DB',
      500: '#FF3B30',
    },
    warning: {
      100: '#FFF5CC',
      500: '#C9A700',
    },
    info: {
      100: '#D6EDFF',
      500: '#007AFF',
    },
  },

  // Borders
  border: {
    subtle: '#d9e0e9',
  },
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

/**
 * Typography scale matching Figma text styles
 */
export const TYPOGRAPHY = {
  // Card title (14px / 22px / 500)
  bodySmallMedium: {
    fontFamily: 'DM Sans',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 500,
  },

  // Main value (18px / 26px / 700)
  bodyLargeBold: {
    fontFamily: 'DM Sans',
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 700,
  },

  // Trend/Insight text (10px / 16px / 400, uppercase)
  captionRegular: {
    fontFamily: 'DM Sans',
    fontSize: '10px',
    lineHeight: '16px',
    fontWeight: 400,
    textTransform: 'uppercase' as const,
  },

  // Pre/Post labels (12px / 20px / 500)
  bodyExtraSmallMedium: {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 500,
  },

  // Pre/Post values (12px / 20px / 400)
  bodyExtraSmallText: {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 400,
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
