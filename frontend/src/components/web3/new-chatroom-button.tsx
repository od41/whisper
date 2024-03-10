import { useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import ChatroomContract from '@inkathon/contracts/typed-contracts/contracts/chatroom'
import {
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'
import { FiChevronDown } from 'react-icons/fi'

import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'

const NewChatRoomButton = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Chatroom)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Chatroom, ChatroomContract)
  const [chatroomId, setChatroomId] = useState('5CqRGE6QMZUxh8anBchE69P8gt3sojPtwNQkmpKwWPz9yPRB')
  const [participantId, setParticipantId] = useState<string>()

  const supportedChains: any[] = [
    {
      name: 'Aleph Zero',
      description: 'Lorem ipsum',
    },
    {
      name: 'Accurast',
      description: 'Lorem ipsum',
    },
  ]

  const handleCreateChat = async (chain: any) => {
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

  const handleDeleteChatroom = async () => {
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

  const handleInviteFriends = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // TODO include check that caller must be owner
    console.log('invite', chatroomId, participantId)

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'invite', {}, [
        chatroomId,
        participantId,
      ])
    } catch (e) {
      console.error(e)
    } finally {
      // fetchMessages()
    }
  }

  return (
    <div className="mt-8 w-full">
      {api ? ( // TODO get value of active chatroom
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded-2xl bg-gray-900 px-4 py-6 font-bold text-foreground"
          >
            <Button
              className="h-12 w-full min-w-[14rem] gap-2 rounded-2xl border border-white/10 bg-primary px-4 py-3 font-bold text-foreground"
              translate="no"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs font-normal">New Group Chat</span>
                </div>
                <FiChevronDown className="shrink-0" size={22} aria-hidden="true" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="no-scrollbar max-h-[40vh] w-full min-w-[20rem] overflow-scroll rounded-2xl"
          >
            {/* Supported Chains */}
            {supportedChains.map((chain) => (
              <DropdownMenuItem
                key={`network-${chain.name}`}
                className="cursor-pointer"
                onClick={async () => await handleCreateChat(chain)}
              >
                <div className="flex w-full flex-col items-center justify-start gap-2">
                  <p>{chain.name}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex select-none flex-wrap items-stretch justify-center gap-4">
          <div className="flex w-full">
            <Input
              placeholder="Account ID"
              type="text"
              onChange={(e) => setParticipantId(String(e.target.value))}
            />

            <Button
              onClick={handleInviteFriends}
              variant="outline"
              className="min-w-[14rem] border"
              translate="no"
            >
              Invite friends
            </Button>
          </div>
          <Button
            onClick={handleDeleteChatroom}
            variant="destructive"
            className="min-w-[10rem] border"
            translate="no"
          >
            Delete chatroom
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewChatRoomButton
