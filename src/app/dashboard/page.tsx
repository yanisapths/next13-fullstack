import ApiDashboard from '@/components/ApiDashboard';
import RequestApiKey from '@/components/RequestApiKey';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'
import {db} from '@/lib/db';

import { Metadata } from 'next';
import { notFound } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Dashboard',
}

const page = async ({ }) => {
    const user = await getServerSession(authOptions)
    if (!user) return notFound()

    const apiKey = await db.apiKey.findFirst({
        where: { userId: user.user.id, enabled: true }
    })

    return (
        <div className='max-w-7xl mx-auto mt-16'>
            {apiKey ? (
                // @ts-expect-error
                <ApiDashboard />
            ) : (
                <RequestApiKey />
            )}
        </div>
    )
}

export default page;