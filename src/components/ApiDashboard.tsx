import { authOptions } from '@/lib/auth';
import { db }  from '@/lib/db';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React, { FC } from 'react'
import { formatDistance } from 'date-fns'
import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';
import { Input } from './ui/Input';

export const metadata: Metadata = {
  title: 'API Dashboard'
}
const ApiDashboard = async ({ }) => {
  const user = await getServerSession(authOptions)
  if (!user) return notFound()

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id, }
  })

  const activateApiKey = apiKeys.find((apiKey) => apiKey.enabled)
  if (!activateApiKey) notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id)
      }
    }
  })

  const serializabledRequests = userRequests.map((request) => ({

    ...request,
    timestamp: formatDistance(new Date(request.timestamp), new Date()),
  }))
  return (
    <div className='flex flex-col gap-6 items-center'>
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <Paragraph>Your API Key:</Paragraph>
      <Input className='w-fit truncate' placeholder={activateApiKey.key} />
    </div>
  )
}

export default ApiDashboard;