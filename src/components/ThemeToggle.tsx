'use client'
import React, { FC } from 'react'
import { useTheme } from "next-themes"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem} from '@/ui/DropdownMenu'
import {DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Button from '@/ui/Button'
import {Icons} from "@/components/Icons"

interface ThemeToggleProps { }

const ThemeToggle: FC<ThemeToggleProps> = ({ }) => {
    const { setTheme } = useTheme()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
                <Icons.Sun className='rotate-0 scale-100 transition-all text-slate-700 hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100' />
                <Icons.Moon className='absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100' />
                <span className='sr-only'>Toggle Theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' forceMount>
            <DropdownMenuItem onClick={()=>setTheme('light')}>
                <Icons.Sun className='w-4 h-4 mr-2'/>
                <span>Light</span>
            </DropdownMenuItem> 
            <DropdownMenuItem onClick={()=>setTheme('dark')}>
                <Icons.Moon className='w-4 h-4 mr-2'/>
                <span>Dark</span>
            </DropdownMenuItem> 
            <DropdownMenuItem onClick={()=>setTheme('system')}>
                <Icons.Laptop className='w-4 h-4 mr-2'/>
                <span>System</span>
            </DropdownMenuItem> 
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export default ThemeToggle;