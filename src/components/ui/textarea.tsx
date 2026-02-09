import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[120px] w-full rounded-[var(--radius-md)] border px-4 py-3',
            'font-body text-base text-neutral-900 resize-y',
            'placeholder:text-neutral-400',
            'transition-colors duration-[var(--duration-fast)]',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-error focus:ring-error/30'
              : 'border-neutral-200 focus:border-brand-500 focus:ring-brand-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
export type { TextareaProps }
