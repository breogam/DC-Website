import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-body font-semibold',
    'transition-all duration-[var(--duration-normal)]',
    'cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-500 text-white',
          'hover:bg-brand-700 hover:scale-[1.02]',
          'active:scale-[0.98]',
          'shadow-sm hover:shadow-md',
        ].join(' '),
        secondary: [
          'bg-neutral-900 text-neutral-50',
          'hover:bg-neutral-700',
          'active:bg-neutral-800',
        ].join(' '),
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100 hover:text-neutral-900',
        ].join(' '),
        destructive: [
          'bg-error text-white',
          'hover:bg-red-700',
          'active:bg-red-800',
        ].join(' '),
        link: [
          'bg-transparent text-brand-500 underline-offset-4',
          'hover:underline hover:text-brand-700',
          'p-0 h-auto',
        ].join(' '),
        outline: [
          'border-2 border-brand-500 text-brand-500 bg-transparent',
          'hover:bg-brand-50 hover:text-brand-700',
          'active:bg-brand-100',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-[var(--radius-md)]',
        md: 'h-11 px-6 text-base rounded-[var(--radius-md)]',
        lg: 'h-13 px-8 text-lg rounded-[var(--radius-md)]',
        icon: 'h-10 w-10 rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
