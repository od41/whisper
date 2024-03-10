'use client'

import { FC, useContext } from 'react'

import { AppContext } from '@/context/app-context'
import { useInkathon } from '@scio-labs/use-inkathon'
import { BsChatSquareQuote } from 'react-icons/bs'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'

import { Message } from './message'
import { SendMessage } from './send-message'

export const ChatMessages: FC = () => {
  const { activeChain } = useInkathon()
  const { isChatroomLoading, isChatroomActive, messages, chatroomId, isMessagesLoading } =
    useContext(AppContext)

  // Connection Loading Indicator
  if (isChatroomLoading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3 rounded-md border text-center font-mono text-sm text-gray-400 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Spinner />
        <div>Connecting to chatrooms</div>
      </div>
    )
  if (!isChatroomLoading && !isChatroomActive)
    // No chatroom found
    return (
      <div className=" flex h-full w-full flex-col items-center justify-center space-y-3 rounded-md border text-center font-mono text-sm text-gray-400 sm:flex-row sm:space-x-3 sm:space-y-0">
        <BsChatSquareQuote />
        <div>No chatroom found</div>
      </div>
    )

  return (
    <>
      <div className="flex w-full grow flex-col gap-4">
        <h2 className="text-center font-mono text-gray-400">
          Chatroom ID: <span className="truncate"> {chatroomId} </span>
        </h2>

        <Card>
          <CardContent className="p-4">
            <ScrollArea className="h-72 w-full gap-4">
              {/* Messages */}
              {!messages || messages.length == 0 ? (
                <div className="w-full text-center text-xs">No messages sent yet</div>
              ) : (
                messages.map((message, key) => <Message key={`message-${key}`} message={message} />)
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* Send a message component */}
      <SendMessage />
    </>
  )
}
