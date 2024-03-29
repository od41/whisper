'use client'

import { createContext, useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { useAccurast } from '@/deployments/use-accurast'
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
  joinChatroom: (chatroomId: string) => Promise<void>
  refreshMessages: () => Promise<void>
  viaAccurast: () => Promise<void>
  messages: MessageProps[]
  chatroomId: string | undefined
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
  joinChatroom: async (chatroomId: string) => {},
  refreshMessages: async () => {},
  viaAccurast: async () => {},
  messages: [],
  chatroomId: undefined,
  isAppLoading: true,
  isChatroomLoading: true,
  isMessagesLoading: true,
}
export const AppContext = createContext(defaultData)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // app state
  const [isChatroomActive, setIsChatroomActive] = useState(false)
  const [chatroomId, setChatroomId] = useState<string>()
  const [messages, setMessages] = useState<MessageProps[]>([])

  // loading state
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [isChatroomLoading, setIsChatroomLoading] = useState(true)
  const [isMessagesLoading, setIsMessagesLoading] = useState(true)

  // web3 state
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.Chatroom)
  const { id, send } = useAccurast()

  // set app as loaded
  useEffect(() => {
    async function loadApp() {
      if (activeAccount && contract && activeSigner && api) {
        // check if the active account has an active chatroom, load it
        const room = await queryChatroom(activeAccount.address)
        // check if room object is not empty
        if (!(Object.keys(room).length === 0 && room.constructor === Object)) {
          setIsChatroomActive(true)
          setChatroomId(activeAccount.address)
          await getMessages(activeAccount.address)
        } else {
          // you haven't created a chatroom, so join one if you've been invited
          setIsChatroomActive(false)
        }
        setIsAppLoading(false)
        setIsChatroomLoading(false)
        setIsMessagesLoading(false)
      }
    }
    loadApp()
  }, [activeAccount, contract, activeSigner, api])

  // functions

  // query chatroom
  async function queryChatroom(_chatroomId: string): Promise<any> {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again… chatroom')
      return
    }

    try {
      const result = await contractQuery(api, activeAccount.address, contract, 'getChatroom', {}, [
        _chatroomId,
      ])
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getChatroom')
      if (isError) throw new Error(decodedOutput)
      if (!(Object.keys(output).length === 0 && output.constructor === Object)) {
        // TODO change contract to output None and check for null here
        return output
      }
    } catch (e) {
      console.error(e)
      toast.error('Error while loading chatroom. Try again…')
    }
    return {}
  }
  // Fetch messages
  const getMessages = async (_chatroomId: string) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again… mesasges')
      return
    }

    setIsMessagesLoading(true)

    try {
      const result = await contractQuery(api, activeAccount.address, contract, 'getMessages', {}, [
        _chatroomId,
      ])
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'getMessages')
      if (isError) throw new Error(decodedOutput)
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
    // await getMessages(chatroomId)
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
      await getMessages(chatroomId!)
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
      //set chatroomid to the caller of the create function
      setChatroomId(activeAccount.address)
      //fetch messages
      await getMessages(activeAccount.address)
      //set active chat to true
      setIsChatroomActive(true)
    } catch (e) {
      console.error(e)
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
    }
  }

  async function inviteFriends(participants: string[]) {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'invite', {}, [
        chatroomId,
        participants[0],
      ])
    } catch (e) {
      console.error(e)
    }
  }

  // join chatroom
  async function joinChatroom(joinChatroomId: string) {
    setIsChatroomLoading(true)
    setIsMessagesLoading(true)
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    //check if you've been invited to the chatroom
    try {
      const result = await contractQuery(
        api,
        activeAccount.address,
        contract,
        'isAParticipant',
        {},
        [joinChatroomId, activeAccount.address],
      )
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'isAParticipant')
      if (isError) {
        toast.error('Something went wrong')
        throw new Error(decodedOutput)
      }
      if (!output) {
        toast.error("You haven't been invited to this chatroom")
        setIsChatroomLoading(false)
        setIsMessagesLoading(false)
        return
      }
    } catch (e) {
      console.error(e)
      toast.error("Error we couldn't verify your invitation. Try again…")
    }

    const room = await queryChatroom(joinChatroomId)
    // check if room object is not empty
    if (!(Object.keys(room).length === 0 && room.constructor === Object)) {
      setIsChatroomActive(true)
      setChatroomId(joinChatroomId)
      setMessages(room.messages)
    } else {
      // you haven't created a chatroom, so join one if you've been invited
      setIsChatroomActive(false)
    }
    setIsChatroomLoading(false)
    setIsMessagesLoading(false)
  }

  // accurast
  async function viaAccurast() {
    // TODO additional testing & implementation
    const res = await send(activeAccount?.address, '')
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
        joinChatroom,
        sendMessage,
        viaAccurast,
        messages,
        chatroomId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
