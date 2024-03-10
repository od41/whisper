'use client'

import { createContext, useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'

import { MessageProps } from '@/components/web3/message'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

type AppContextProps = {
  isChatroomActive: boolean
  getMessages: (chatroomId: string) => Promise<void>
  sendMessage: (newMessage: string) => Promise<void>
  createChatroom: () => Promise<void>
  deleteChatroom: () => Promise<void>
  inviteFriends: (participants: string[]) => Promise<void>
  refreshMessages: () => Promise<void>
  messages: MessageProps[]
  chatroomId: string | null
  isAppLoading: boolean
  isChatroomLoading: boolean
  isMessagesLoading: boolean
}

const defaultData: AppContextProps = {
  isChatroomActive: false,
  getMessages: async (chatroomId: string) => {},
  sendMessage: async (newMessage: string) => {},
  createChatroom: async () => {},
  deleteChatroom: async () => {},
  inviteFriends: async (participants: string[]) => {},
  refreshMessages: async () => {},
  messages: [],
  chatroomId: null,
  isAppLoading: true,
  isChatroomLoading: true,
  isMessagesLoading: true,
}
export const AppContext = createContext(defaultData)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // app state
  const [isChatroomActive, setIsChatroomActive] = useState(false)
  const [chatroomId, setChatroomId] = useState('5CqRGE6QMZUxh8anBchE69P8gt3sojPtwNQkmpKwWPz9yPRB')
  const [messages, setMessages] = useState<MessageProps[]>([])

  // loading state
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [isChatroomLoading, setIsChatroomLoading] = useState(true)
  const [isMessagesLoading, setIsMessagesLoading] = useState(true)

  // web3 state
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Chatroom)

  // functions

  // fetch chatroom
  const fetchChatroom = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again… chatroom')
      return
    }

    setIsChatroomLoading(true)

    try {
      const result = await contractQuery(api, activeAccount.address, contract, 'getChatroom', {}, [
        chatroomId,
      ])
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getChatroom')
      if (isError) throw new Error(decodedOutput)
      if (!(Object.keys(output).length === 0 && output.constructor === Object)) {
        // TODO change contract to output None and check for null here
        setIsChatroomActive(true)
        getMessages()
      }
    } catch (e) {
      console.error(e)
      toast.error('Error while loading chatroom. Try again…')
      setIsChatroomLoading(false)
    } finally {
      setIsChatroomLoading(false)
    }
  }

  useEffect(() => {
    fetchChatroom()
  }, [api, activeAccount, contract, activeSigner])

  // Fetch messages
  const getMessages = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again… mesasges')
      return
    }

    setIsMessagesLoading(true)

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
      setIsMessagesLoading(false)
    } finally {
      setIsMessagesLoading(false)
    }
  }

  async function refreshMessages() {
    await getMessages()
  }

  // send a message
  async function sendMessage(newMessage: string) {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'sendMessage', {}, [
        chatroomId,
        newMessage,
      ])
    } catch (e) {
      console.error(e)
    } finally {
      // refresh messages
    }
  }

  async function createChatroom() {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'createChatroom', {}, [])
    } catch (e) {
      console.error(e)
    } finally {
      // fetchMessages()
    }
  }

  async function deleteChatroom() {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // TODO include check that caller must be owner

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'deleteChatroom', {}, [
        chatroomId,
      ])
    } catch (e) {
      console.error(e)
    } finally {
      // fetchMessages()
    }
  }

  async function inviteFriends(participants: string[]) {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // TODO include check that caller must be owner
    console.log('invite', chatroomId, participants[0])

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'invite', {}, [
        chatroomId,
        participants[0],
      ])
    } catch (e) {
      console.error(e)
    } finally {
      // fetchMessages()
    }
  }

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        isChatroomActive,
        isChatroomLoading,
        isMessagesLoading,
        getMessages,
        refreshMessages,
        createChatroom,
        deleteChatroom,
        inviteFriends,
        sendMessage,
        messages,
        chatroomId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
