import React, { FC, HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const paragraphVaraints = cva("max-w-prose text-slate-600 dark:text-slate-300 mb-2 text-center",
    {
        variants: {
            size: {
                default: 'text-base sm:text-lg',
                sm: 'text-sm, sm:text-base'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    })

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVaraints> { }

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
    className, size, children, ...props
}, ref) => {
    return (
        <p ref={ref}
            {...props}
            className={cn(paragraphVaraints({ size, className }))}
        >
            {children}
        </p>
    )
});

Paragraph.displayName = 'Paragraph';

export default Paragraph;