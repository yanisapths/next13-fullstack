import Image from 'next/image'
import Paragraph from '@/components/ui/Paragraph'
import LargeHeading from '@/components/ui/LargeHeading'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meet Next13',
  description: 'Excercise',
}
export default function Home() {
  return (
    <div className="flex h-screen overflow-x-hidden justify-center items-center">
      <div className='absolute container pt-32 max-w-7xl mx-auto w-full h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center'>

          <div className='relative group'>
            <div className='absolute -inset-0.5 bg-light-blue/50 dark:bg-dark-blue text-clip-bg rounded-full blur-3xl'>
            </div>
            <LargeHeading size='lg'
              className='three-d relative font-bold text-center text-dark-blue dark:text-white'>
              Easily determine <br /> text similarity.
            </LargeHeading>
          </div>
          <Paragraph className='max-w-xl lg:text-left'>
            With the Text Similarity API, you can easily determine the
            similarity between two pieces of text with a free{' '}
            <Link href='/login'
              className='underline underline-offset-4 text-dark-blue dark:text-light-blue'>
              API key
            </Link>
          </Paragraph>
        </div>
      </div>
    </div>
  )
}
