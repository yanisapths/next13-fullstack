'use client'
import React, { FC, useState } from 'react'
import Button from '@/ui/Button'
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"

interface SignOutButtonProps { }

const SignOutButton: FC<SignOutButtonProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signUserOut = async () => {
        setIsLoading(true)

        try {
            await signOut()
        } catch (error) {
            // toast.error({
            //     title: 'Error signing out',
            //     message: 'Please try again',
            //     type: 'error'
            // })
        }
    }
    return <Button onClick={signUserOut} isLoading={isLoading}>
        Sign out
    </Button>
}

export default SignOutButton;