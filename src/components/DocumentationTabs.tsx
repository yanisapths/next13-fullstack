'use client'

import React, { FC } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import Code from './Code';
import SimpleBar from 'simplebar-react'
import { nodejs, python } from '@/helpers/documentation-code';

const DocumentationTabs: FC = ({ }) => {
    return (
        <Tabs defaultValue='nodejs' className='p-4 max-w-2xl w-full'>
            <TabsList>
                <TabsTrigger value='nodejs'>NodeJs</TabsTrigger>
                <TabsTrigger value='python'>Python</TabsTrigger>
            </TabsList>
            <TabsContent value='nodejs'>
                <SimpleBar>
                    <Code animated language='javascript' code={nodejs} show />
                </SimpleBar>
            </TabsContent>
            <TabsContent value='python'>
                <SimpleBar>
                    <Code animated language='python' code={python} show />
                </SimpleBar>
            </TabsContent>
        </Tabs>
    )
}

export default DocumentationTabs;