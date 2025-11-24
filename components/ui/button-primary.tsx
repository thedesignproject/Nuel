import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Primary button based on Figma node 735:6606
// Sizes map to typography tokens:
// - Small: 12/20, - Medium: 14/22, - Large: 16/24

const buttonPrimary = cva(
  'inline-flex items-center justify-center font-normal text-neutral-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none',
  {
    variants: {
      size: {
        small:
          'h-7 px-2 py-1 rounded-md text-[12px] leading-[20px] bg-gradient-to-r from-primary-500 via-[#0D245C] to-[#02227B]',
        medium:
          'h-[38px] px-3 py-2 rounded-xl text-[14px] leading-[22px] tracking-[0] bg-gradient-to-r from-primary-500 via-[#0D245C] to-[#02227B]',
        large:
          'h-12 px-4 py-3 rounded-xl text-[16px] leading-[24px] tracking-[0.2px] bg-gradient-to-r from-primary-500 via-[#0D245C] to-[#02227B]',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
);

export interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonPrimary> {}

export const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonPrimary({ size, className })} {...props}>
        {children}
      </button>
    );
  }
);

ButtonPrimary.displayName = 'ButtonPrimary';

export default ButtonPrimary;
















