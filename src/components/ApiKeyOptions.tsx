'use client'

import React, { FC, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import Button from './ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/CustomToast'
import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'
import { useRouter } from 'next/navigation'

interface ApiKeyOptionsProps {
    activateApiKeyId: string,
    activateApiKeyKey: string,
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ activateApiKeyId, activateApiKeyKey }) => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [isRevoking, setIsRevoking] = useState<boolean>(false)
    const router = useRouter()
    const createNewApiKey = async () => {
        setIsCreatingNew(true)
        try {
            await createApiKey()
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error creating API key',
                message: 'Please try agian later',
                type: 'error',
            })
        } finally {
            setIsCreatingNew(false)
        }
    }
    const revokeCurrentApiKey = async () => {
        setIsRevoking(true)
        try {
            await revokeApiKey({ keyId: activateApiKeyId })
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error revoking API key',
                message: 'Please try agian later',
                type: 'error',
            })
        } finally {
            setIsRevoking(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                disabled={isCreatingNew || isRevoking} asChild
            >
                <Button>
                    <p>
                        {isCreatingNew ? "Creating new key" : isRevoking ? "Revoking key" : "Options"}
                    </p>
                    {isCreatingNew || isRevoking ? (
                        <Loader2 className='animate-spin h-4 w-4' />
                    ) : null}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                    navigator.clipboard.writeText(activateApiKeyKey)
                    toast({
                        title: 'Copied!',
                        message: 'API Key copied to clipboard',
                        type: 'success'
                    })
                }}>
                    Copy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={createNewApiKey}>
                    Create new key
                </DropdownMenuItem>
                <DropdownMenuItem onClick={revokeCurrentApiKey}>
                    Revoke key
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ApiKeyOptions;