'use client'

import { createApiKey } from '@/helpers/create-api-key'
import React, { FC, FormEvent, useState } from 'react'
import { toast } from '../components/ui/CustomToast'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import CopyButton from './CopyButton'
import Icons from './Icons'
import { Input } from './ui/Input'
import Button from './ui/Button'

interface RequestApiKeyProps {}

const RequestApiKey:FC<RequestApiKeyProps> = ({ }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string | null>(null)

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true)
    try {
      const generateApiKey = await createApiKey()
      setApiKey(generateApiKey)
    } catch (err) {

      if (err instanceof Error) {
        toast({
          title: 'Error',
          message: err.message,
          type: 'error',
        })
        return
      }
      toast({
        title: 'Error',
        message: 'Something went wrong',
        type: 'error',
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col gap-6 items-center'>
        <Icons.Key className='w-10 h-10 text-slate-500'/>
        <LargeHeading className='text-center'>Request your API Key</LargeHeading>
        <Paragraph>You haven't requestd an API key yet.</Paragraph>
      </div>
      <form onSubmit={createNewApiKey} className='m-2'>
        <div className=''>
          {apiKey ? <CopyButton type='button' valueToCopy={apiKey}  className='absolute inset-y-0 animate-in right-0 fade-in duration-300'/> : null}
        </div>
        <Input readOnly value={apiKey ?? ''} placeholder='Request an API key to display it here!'/>
      <div className='flex justify-center mt-3 sm:mt-0 sm:flex-shrink-0 sm:ml-4'>
        <Button disabled={!!apiKey} isLoading={isCreating}>
          Request Key
        </Button>
      </div>
      </form>
    </div>
  )
}

export default RequestApiKey;