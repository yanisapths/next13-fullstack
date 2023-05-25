'use client'
import React, { FC, useState } from 'react'
import Button from '@/ui/Button'
import toast from 'react-hot-toast'
import {signIn} from "next-auth/react"

interface SignInButtonProps { }

const SignInButton: FC<SignInButtonProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signInwithGoogle=async () => {
       setIsLoading(true)
       
       try{
        await signIn('google')
       }catch(error){
        // toast.error({
        //     title: 'Error signing in',
        //     message: 'Please try again',
        //     type: 'error'
        // })
       }
    }
    return <Button onClick={signInwithGoogle} isLoading={isLoading}>
        Sign in
    </Button>
}

export default SignInButton;