'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => (
    <TabsPrimitive.List
        {...props}
        ref={ref}
        className={cn('p-1 inline-flex rounded-md font-medium bg-slate-100 dark:bg-slate-800', className)}
    >
        {children}
    </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
        {...props}
        ref={ref}
        className={cn('inline-flex min-w-[100px] transition-all disabled:pointer-events-none disabled:opacity-50 justify-center align-middle px-3 py-2 dark:bg-slate-800 bg-slate-100 data-[state=active]:bg-slate-200  dark:data-[state=active]:bg-slate-900 dark:text-slate-200 rounded-m text-sm', className)}
    >
        {children}
    </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName


const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <TabsPrimitive.Content
        {...props}
        ref={ref}
        className={cn('mt-3 bg-slate-100 dark:text-white p-8 flex-grow dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:shadow-md rounded-md', className)}
    >
        {children}
    </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
}