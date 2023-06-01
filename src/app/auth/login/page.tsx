import React, { FC } from 'react'
import Link from 'next/link';
import { Metadata } from 'next';
import { buttonVariants } from '@/components/ui/Button';
import Icons from '@/components/Icons';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import UserAuthForm from '@/components/UserAuthForm'

export const metadata: Metadata = {
    title: 'Login',
}

const page: FC = ({ }) => {
    return (
        <div className='absolute inset-0 mx-auto container flex h-screen'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6'>
                <div className='flex flex-col gap-6 items-center text-center'>
                    <Link className={buttonVariants({
                        variant: 'ghost', className: 'w-fit'
                    })} href='/'>
                        <Icons.ChevronLeft />
                        Back to home
                    </Link>
                    <LargeHeading className='text-bold'>Welcome back!</LargeHeading>
                    <Paragraph>Please sign in using google account</Paragraph>
                    <UserAuthForm />
                </div>
            </div>
        </div>
    )
}

export default page;