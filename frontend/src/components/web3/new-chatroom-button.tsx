import toast from 'react-hot-toast'
import { FiChevronDown } from 'react-icons/fi'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const NewChatRoomButton = () => {
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
    toast.success(`Starting new chat on ${chain.name}`)
  }

  return (
    <div className="mt-8 w-full">
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
              className="cursor-pointer"
              key={chain.network}
              onClick={async () => await handleCreateChat(chain)}
            >
              <div className="flex w-full flex-col items-center justify-start gap-2">
                <p>{chain.name}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NewChatRoomButton
