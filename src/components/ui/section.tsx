import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Alternate between bg-bg and bg-surface for visual rhythm */
  surface?: boolean
  /** Reduce vertical padding */
  compact?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, surface = false, compact = false, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        compact ? 'py-12 lg:py-16' : 'py-16 lg:py-24',
        surface ? 'bg-surface' : 'bg-bg',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
)
Section.displayName = 'Section'

export { Section }
export type { SectionProps }
