'use client'

import { PropsWithChildren } from 'react'

import { AppProvider } from '@/context/app-context'
import { getDeployments } from '@/deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <UseInkathonProvider
      appName="Whisper || Disappearing group chats" // TODO
      connectOnInit={true}
      defaultChain={env.defaultChain}
      deployments={getDeployments()}
    >
      <AppProvider>{children}</AppProvider>
    </UseInkathonProvider>
  )
}
