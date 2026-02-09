import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('bg-surface', {
  variants: {
    variant: {
      default: 'rounded-[var(--radius-lg)] shadow-sm',
      elevated: 'rounded-[var(--radius-lg)] shadow-md',
      bordered: 'rounded-[var(--radius-lg)] border border-neutral-200',
      interactive: [
        'rounded-[var(--radius-lg)] shadow-sm',
        'cursor-pointer',
        'transition-all duration-[var(--duration-normal)]',
        'hover:shadow-md hover:-translate-y-0.5',
        'active:translate-y-0',
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-0', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0 flex items-center', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter, cardVariants }
export type { CardProps }
