import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma';
import ApiDashboard from '@/components/ApiDashboard';
import RequestApiKey from '@/components/RequestApiKey';

const page = async ({ }) => {
    const user = await getServerSession(authOptions)
    if (!user) return notFound()

    const apiKey = await prisma.apiKey.findFirst({
        where: { userId: user.user.id, enabled: true }
    })
    return (
        <div>
            {apiKey ? <ApiDashboard /> : <RequestApiKey />}
        </div>
    )
}

export default page;