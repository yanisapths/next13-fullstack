import React, { FC } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';

const DocumentationTabs: FC = ({ }) => {
    return (
        <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
            <TabsList>
                <TabsTrigger value='nodejs'>NodeJs</TabsTrigger>
                <TabsTrigger value='python'>Python</TabsTrigger>
            </TabsList>
            <TabsContent value='nodejs'>NodeJS</TabsContent>
            <TabsContent value='python'>Python</TabsContent>
        </Tabs>
    )
}

export default DocumentationTabs;