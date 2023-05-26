import React, { FC } from 'react'
import LargeHeading from "@/ui/LargeHeading"
import type { Metadata } from 'next'
import Paragraph from '@/components/ui/Paragraph'
import DocumentationTabs from '@/components/DocumentationTabs'
import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
    title: 'Similar API Excercise | Documentation',
    description: ''
}

const page: FC = ({ }) => {
    return (
        <div className='container max-w-7xl mx-auto mt-12'>
           <div className='flex flex-col items-center gap-6'>
            <LargeHeading>
                Making a request
            </LargeHeading>
            <Paragraph>api/v1/similarity</Paragraph>
            <DocumentationTabs />
           </div>
        </div>
    )
}

export default page;