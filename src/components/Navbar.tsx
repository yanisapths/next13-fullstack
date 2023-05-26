import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { FC } from 'react'
import { buttonVariants } from '@/ui/Button'
import SignInButton from "./SignInButton"
import SignOutButton from './SignOutButton'
import ThemeToggle from './ThemeToggle'
import { authOptions } from '@/lib/auth'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <nav className='fixed z-50 inset-x-0 top-0 h-20 border-b border-slate-300 dark:border-slate-700 backdrop-blur-sm bg-white/75 dark:bg-darker-blue shadow-sm flex item-center justify-between'>
            <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
                <Link href='/' className={buttonVariants({ variant: 'link' })}>
                    NextJS 13 Excercise 1.0
                </Link>

                <div className='md:hidden'>
                    <ThemeToggle />
                </div>
                <div className='hidden md:flex gap-4'>
                    <ThemeToggle />
                    <Link href='/documentation' className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                        documentation
                    </Link>
                    {session ? (
                        <>
                            <Link className={buttonVariants({ variant: 'ghost' })}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                            <SignOutButton />
                        </>
                    ) : <SignInButton />}
                </div>
            </div >
        </nav >
    )
}

export default Navbar;