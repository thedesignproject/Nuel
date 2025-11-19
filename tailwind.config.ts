import type { Config } from "tailwindcss";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./lib/design-tokens/typography";
import {
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
} from "./lib/design-tokens/colors";
import {
  spacing,
  borderRadius,
} from "./lib/design-tokens/spacing";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: fontFamily.sans,
        display: fontFamily.display,
      },
      fontSize: {
        // Headings
        'h1': [fontSize.h1, { lineHeight: lineHeight.h1, fontWeight: fontWeight.bold }],
        'h2': [fontSize.h2, { lineHeight: lineHeight.h2, fontWeight: fontWeight.bold }],
        'h3': [fontSize.h3, { lineHeight: lineHeight.h3, fontWeight: fontWeight.bold }],
        'h4': [fontSize.h4, { lineHeight: lineHeight.h4, fontWeight: fontWeight.bold }],
        'h5': [fontSize.h5, { lineHeight: lineHeight.h5, fontWeight: fontWeight.semibold }],
        'h6': [fontSize.h6, { lineHeight: lineHeight.h6, fontWeight: fontWeight.semibold }],

        // Body
        'body-lg': [fontSize['body-lg'], { lineHeight: lineHeight['body-lg'] }],
        'body-md': [fontSize['body-md'], { lineHeight: lineHeight['body-md'] }],
        'body-sm': [fontSize['body-sm'], { lineHeight: lineHeight['body-sm'] }],
        'body-xs': [fontSize['body-xs'], { lineHeight: lineHeight['body-xs'] }],

        // Special
        'caption': [fontSize.caption, { lineHeight: lineHeight.caption }],
        'table': [fontSize.table, { lineHeight: lineHeight.table }],
      },
      fontWeight: {
        regular: fontWeight.regular,
        medium: fontWeight.medium,
        semibold: fontWeight.semibold,
        bold: fontWeight.bold,
      },
      lineHeight: {
        'h1': lineHeight.h1,
        'h2': lineHeight.h2,
        'h3': lineHeight.h3,
        'h4': lineHeight.h4,
        'h5': lineHeight.h5,
        'h6': lineHeight.h6,
        'body-lg': lineHeight['body-lg'],
        'body-md': lineHeight['body-md'],
        'body-sm': lineHeight['body-sm'],
        'body-xs': lineHeight['body-xs'],
        'caption': lineHeight.caption,
        'table': lineHeight.table,
      },
      letterSpacing: {
        normal: letterSpacing.normal,
        tight: letterSpacing.tight,
        wide: letterSpacing.wide,
      },
      spacing: spacing,
      borderRadius: borderRadius,
    },
  },
  plugins: [],
};
export default config;








