'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { ChatMessages } from '@/components/web3/chat-messages'
import { ConnectButton } from '@/components/web3/connect-button'

import { HomePageTitle } from './components/home-page-title'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="container relative flex grow flex-col items-center justify-center py-10 pt-0">
        {/* Title */}
        <HomePageTitle />
        <ConnectButton />

        <div className="mt-12 flex max-w-[22rem] flex-col items-start justify-center gap-4">
          <ChatMessages />
        </div>
      </div>
    </>
  )
}
