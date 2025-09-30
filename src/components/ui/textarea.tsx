import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    id?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="relative">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-apple-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    className={cn(
                        'flex min-h-[120px] w-full rounded-apple border border-apple-gray-300 bg-white px-4 py-3 text-base ring-offset-white placeholder:text-apple-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none',
                        error && 'border-apple-red focus-visible:ring-apple-red',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-apple-red">{error}</p>
                )}
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea } 