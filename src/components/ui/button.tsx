import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-apple font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
    {
        variants: {
            variant: {
                default: 'bg-apple-blue text-white hover:bg-apple-blue/90 shadow-apple',
                destructive: 'bg-apple-red text-white hover:bg-apple-red/90 shadow-apple',
                outline: 'border border-apple-gray-300 bg-transparent hover:bg-apple-gray-50 text-apple-gray-700',
                secondary: 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200',
                ghost: 'hover:bg-apple-gray-100 text-apple-gray-700',
                link: 'text-apple-blue underline-offset-4 hover:underline',
                glass: 'bg-background-glass backdrop-blur-md border border-white/20 text-apple-gray-700 hover:bg-background-glass/80',
            },
            size: {
                default: 'h-12 px-6 py-3 text-base',
                sm: 'h-9 px-4 py-2 text-sm',
                lg: 'h-14 px-8 py-4 text-lg',
                icon: 'h-12 w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants } 