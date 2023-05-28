'use client'

import React, { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Button from './ui/Button'
import { toast } from './ui/CustomToast'
import Icons from './Icons'

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = forwardRef<HTMLButtonElement, CopyButtonProps>(({
    className, children, valueToCopy, ...props
}, ref) => {
    return (
        <Button
            variant='ghost'
            className={className}
            {...props} onClick={() => {
                navigator.clipboard.writeText(valueToCopy)
                toast({
                    title: 'Copied!',
                    message: 'API Key copied to clipboard',
                    type: 'success'
                })
            }}>
            <Icons.Copy className='h-5 w-5' />
        </Button>
    )
})

CopyButton.displayName = 'CopyButton'

export default CopyButton;