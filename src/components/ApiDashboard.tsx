import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React, { FC } from 'react'
import { formatDistance } from 'date-fns'
import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';
import { Input } from './ui/Input';
import Table from './Table';
import ApiKeyOptions from '../components/ApiKeyOptions';

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
    <div className='flex flex-col gap-6 px-4'>
      <div className='items-center text-center md:text-left'>
        <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
        <div className='py-4 md:flex md:justify-start md:text-left align-middle items-center gap-4'>
          <Paragraph>Your API Key:</Paragraph>
          <div className='flex justify-center items-center gap-2'>
            <Input className='w-fit px-2 truncate' readOnly placeholder={activateApiKey.key} />
            <ApiKeyOptions activateApiKeyId={activateApiKey.id} activateApiKeyKey={activateApiKey.key} />
          </div>
        </div>
        <div className='flex py-2 md:justify-start md:text-left justify-center items-center text-center '>
          <Paragraph>Your API history:</Paragraph>
        </div>
        <Table userRequests={serializabledRequests} />
      </div>
    </div>
  )
}

export default ApiDashboard;