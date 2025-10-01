import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    id?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, id, ...props }, ref) => {
        return (
            <div className="relative group">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-semibold text-gray-700 mb-2.5 transition-colors group-focus-within:text-blue-600"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={type}
                        id={id}
                        className={cn(
                            'flex h-14 w-full rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm px-5 py-4 text-base font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal',
                            'transition-all duration-300',
                            'hover:border-gray-300 hover:bg-white',
                            'focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10',
                            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
                            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {error && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm font-medium text-red-600 flex items-center gap-1.5">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input } 