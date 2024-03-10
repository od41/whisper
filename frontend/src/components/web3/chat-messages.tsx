'use client'

import { FC, useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import ChatroomContract from '@inkathon/contracts/typed-contracts/contracts/chatroom'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'

import { Message, MessageProps } from './message'
import { SendMessage } from './send-message'

export const ChatMessages: FC = () => {
  const { api, activeChain, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Chatroom)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Chatroom, ChatroomContract)
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [activeChatroom, setActiveChatroom] = useState(false)
  const [chatroomId, setChatroomId] = useState('5CqRGE6QMZUxh8anBchE69P8gt3sojPtwNQkmpKwWPz9yPRB')
  const [messages, setMessages] = useState<MessageProps[]>([])

  // fetch chatroom
  const fetchChatroom = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    setFetchIsLoading(true)

    try {
      const result = await contractQuery(api, activeAccount.address, contract, 'getChatroom', {}, [
        chatroomId,
      ])
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getChatroom')
      if (isError) throw new Error(decodedOutput)
      console.log('chatroom: ', output)
      fetchMessages()
      setActiveChatroom(true)
    } catch (e) {
      console.error(e)
      toast.error('Error while loading chatroom. Try again…')
      setFetchIsLoading(false)
    } finally {
      setFetchIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('chatroom status before', activeChatroom)
    fetchChatroom()
    console.log('chatroom status', activeChatroom)
  }, [api, activeAccount, contract, activeSigner])

  // const fetchGreeting = async () => {
  //   if (!contract || !typedContract || !api) return

  //   setFetchIsLoading(true)
  //   try {
  //     const result = await contractQuery(api, '', contract, 'greet')
  //     const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
  //     if (isError) throw new Error(decodedOutput)
  //     setGreeterMessage(output)

  //     // Alternatively: Fetch it with typed contract instance
  //     const typedResult = await typedContract.query.greet()
  //     console.log('Result from typed contract: ', typedResult.value)
  //   } catch (e) {
  //     console.error(e)
  //     toast.error('Error while fetching greeting. Try again…')
  //     setGreeterMessage(undefined)
  //   } finally {
  //     setFetchIsLoading(false)
  //   }
  // }

  // Fetch messages
  const fetchMessages = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      const result = await contractQuery(api, activeAccount.address, contract, 'getMessages', {}, [
        chatroomId,
      ])
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getMessages')
      if (isError) throw new Error(decodedOutput)
      console.log('messages: ', output)
      setMessages(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while loading chatroom. Try again…')
      setFetchIsLoading(false)
    } finally {
      setFetchIsLoading(false)
    }
  }

  // Connection Loading Indicator
  if (fetchIsLoading || !activeChatroom)
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
