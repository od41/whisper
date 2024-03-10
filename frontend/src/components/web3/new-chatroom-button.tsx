import { useContext, useState } from 'react'

import { AppContext } from '@/context/app-context'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { FiChevronDown } from 'react-icons/fi'

import { env } from '@/config/environment'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'

const NewChatRoomButton = () => {
  const { activeAccount } = useInkathon()
  const [participantId, setParticipantId] = useState<string>()
  const { isChatroomActive, createChatroom, deleteChatroom, inviteFriends } = useContext(AppContext)

  const handleCreateChat = async (chain: any) => {
    if (chain.name == 'Aleph Zero') {
      await createChatroom()
    } else if (chain.name == 'Accurast') {
      await createChatroom()
    }
  }

  const handleDeleteChatroom = async () => {
    await deleteChatroom()
  }

  const handleInviteFriends = async () => {
    if (!participantId) return

    await inviteFriends([participantId])
  }

  return (
    <div className="mt-8 w-full">
      {activeAccount && isChatroomActive ? ( //
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
            {env.chatroomChains.map((chain) => (
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
