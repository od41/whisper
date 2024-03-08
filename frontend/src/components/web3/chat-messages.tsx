'use client'

import { FC, useEffect, useState } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'

import { Message, MessageProps } from './message'
import { SendMessage } from './send-message'

export const ChatMessages: FC = () => {
  const { api, activeChain } = useInkathon()
  const [chainInfo, setChainInfo] = useState<{ [_: string]: any }>()

  const messages: MessageProps[] = [
    {
      content:
        'This is the message body. This is the message body. This is the message body. This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content:
        'This is the message body. This is the message body. This is the message body. This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content:
        'This is the message body. This is the message body. This is the message body. This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content:
        'This is the message body. This is the message body. This is the message body. This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
    {
      content: 'This is the message body',
      sender: 'addressofsenderdidga;oglkaj',
    },
  ]

  // Fetch messages
  const fetchMessages = async () => {
    console.log('fetching messages...')
  }

  useEffect(() => {
    fetchMessages()
  }, [api])

  // Connection Loading Indicator
  if (!api)
    return (
      <div className="mb-4 mt-8 flex flex-col items-center justify-center space-y-3 text-center font-mono text-sm text-gray-400 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Spinner />
        <div>
          Connecting to {activeChain?.name} ({activeChain?.rpcUrls?.[0]})
        </div>
      </div>
    )

  return (
    <>
      <div className="flex w-full grow flex-col gap-4">
        <h2 className="text-center font-mono text-gray-400">Chatroom</h2>

        <Card>
          <CardContent className="p-3">
            <ScrollArea className="h-72 w-full gap-4">
              {/* Messages */}
              {messages.map((message, key) => (
                <Message key={`message-${key}`} message={message} />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <SendMessage />
    </>
  )
}
