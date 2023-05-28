import { cn } from '@/lib/utils';
import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input 
                className={cn('flex h-10 w-full rounded-md border border-slate-600 px-4 py-3 dark:text-white', className)} 
                {...props} 
                ref={ref} 
            />
        )
    }

)

Input.displayName = 'Input'

export { Input };