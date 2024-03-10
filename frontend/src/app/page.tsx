'use client'

import { useContext, useEffect } from 'react'

import { AppContext } from '@/context/app-context'
import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { Spinner } from '@/components/ui/spinner'
import { ChatMessages } from '@/components/web3/chat-messages'
import { ConnectButton } from '@/components/web3/connect-button'

import { HomePageTitle } from './components/home-page-title'

export default function HomePage() {
  const { isAppLoading } = useContext(AppContext)

  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  // Connection Loading Indicator
  if (isAppLoading)
    return (
      <div className="my-8 flex h-full w-full flex-col items-center justify-center space-y-3 text-center font-mono text-sm text-gray-400 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Spinner />
      </div>
    )

  return (
    <>
      <div className="container relative flex grow flex-col items-center justify-center py-10 pt-0">
        {/* Title */}
        <HomePageTitle />

        <div className="flex h-full gap-12">
          <div className="w-[45%]">
            <ConnectButton />
          </div>

          <div className="flex w-[55%] min-w-[25rem] flex-col items-start justify-center gap-4">
            <ChatMessages />
          </div>
        </div>
      </div>
    </>
  )
}
