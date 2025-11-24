/**
 * Icon Design Tokens
 * Using Phosphor Icons v2.1.1
 * https://phosphoricons.com/
 *
 * Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really.
 */

// Icon Sizes
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
} as const;

// Icon Weights (styles)
export const iconWeights = {
  thin: 'thin',
  light: 'light',
  regular: 'regular',
  bold: 'bold',
  fill: 'fill',
  duotone: 'duotone',
} as const;

// Icon Categories (from Figma)
export const iconCategories = {
  arrows: 'Arrows',
  brands: 'Brands',
  commerce: 'Commerce',
  communication: 'Communication',
  design: 'Design',
  development: 'Development',
  education: 'Education',
  games: 'Games',
  healthWellness: 'Health & Wellness',
  mathFinance: 'Math & Finance',
  mapsTravel: 'Maps & Travel',
  media: 'Media',
  officeEditing: 'Office & Editing',
  people: 'People',
  securityWarnings: 'Security & Warnings',
  systemDevices: 'System & Devices',
  time: 'Time',
  weatherNature: 'Weather & Nature',
} as const;

// Default icon configuration
export const defaultIconConfig = {
  size: iconSizes.md,
  weight: iconWeights.regular,
  color: 'currentColor',
  mirrored: false,
} as const;

// Common icon usage patterns
export const iconUsageGuidelines = {
  buttons: {
    size: iconSizes.sm,
    weight: iconWeights.regular,
    description: 'Icons in buttons should be 20px with regular weight',
  },
  navigation: {
    size: iconSizes.md,
    weight: iconWeights.regular,
    description: 'Navigation icons should be 24px with regular weight',
  },
  headings: {
    size: iconSizes.lg,
    weight: iconWeights.bold,
    description: 'Icons in headings should be 32px with bold weight',
  },
  cards: {
    size: iconSizes.xl,
    weight: iconWeights.light,
    description: 'Decorative icons in cards should be 40px with light weight',
  },
  hero: {
    size: iconSizes['2xl'],
    weight: iconWeights.thin,
    description: 'Large hero icons should be 48px+ with thin weight',
  },
} as const;

// Commonly used icons (examples)
export const commonIcons = {
  // Navigation
  home: 'House',
  menu: 'List',
  close: 'X',
  back: 'ArrowLeft',
  forward: 'ArrowRight',
  search: 'MagnifyingGlass',

  // Actions
  add: 'Plus',
  edit: 'PencilSimple',
  delete: 'Trash',
  save: 'FloppyDisk',
  download: 'Download',
  upload: 'Upload',
  share: 'ShareNetwork',

  // Status
  success: 'CheckCircle',
  error: 'XCircle',
  warning: 'Warning',
  info: 'Info',

  // User
  user: 'User',
  users: 'Users',
  settings: 'Gear',
  logout: 'SignOut',

  // Communication
  mail: 'Envelope',
  chat: 'Chat',
  phone: 'Phone',
  notification: 'Bell',
} as const;

// Helper function to get icon size
export const getIconSize = (size: keyof typeof iconSizes): number => {
  return iconSizes[size];
};

// Type exports
export type IconSize = keyof typeof iconSizes;
export type IconWeight = keyof typeof iconWeights;
export type IconCategory = keyof typeof iconCategories;
export type CommonIcon = keyof typeof commonIcons;

// Export default
export default {
  sizes: iconSizes,
  weights: iconWeights,
  categories: iconCategories,
  defaultConfig: defaultIconConfig,
  usageGuidelines: iconUsageGuidelines,
  commonIcons,
};
