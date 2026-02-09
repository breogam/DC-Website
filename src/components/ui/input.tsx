import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = 'text', ...props }, ref) => {
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
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'h-11 w-full rounded-[var(--radius-md)] border px-4',
            'font-body text-base text-neutral-900',
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
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-neutral-400">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
export type { InputProps }
