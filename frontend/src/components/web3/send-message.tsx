'use client'

import { FC, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ChatroomContract from '@inkathon/contracts/typed-contracts/contracts/chatroom'
import {
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

const formSchema = z.object({
  newMessage: z.string().min(1).max(400),
})

export const SendMessage: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Chatroom)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Chatroom, ChatroomContract)
  const [chatroomId, setChatroomId] = useState('5CqRGE6QMZUxh8anBchE69P8gt3sojPtwNQkmpKwWPz9yPRB')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  // send a message
  const sendMessage: SubmitHandler<z.infer<typeof formSchema>> = async ({ newMessage }) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'sendMessage', {}, [
        chatroomId,
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      // refresh messages
    }
  }

  // if (!api) return null

  return (
    <>
      <div className="flex w-full max-w-[22rem] grow flex-col gap-4">
        {/* <h2 className="text-center font-mono text-gray-400">Greeter Smart Contract</h2> */}

        <Form {...form}>
          {/* <Card> */}
          {/* <CardContent className="pt-6"> */}
          <form
            onSubmit={handleSubmit(sendMessage)}
            className="flex w-full flex-col justify-end gap-2"
          >
            <FormItem>
              {/* <FormLabel className="text-base"></FormLabel> */}
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Say something"
                    disabled={form.formState.isSubmitting}
                    {...register('newMessage')}
                  />
                  <Button
                    type="submit"
                    className="bg-primary font-bold"
                    disabled={form.formState.isSubmitting}
                    isLoading={form.formState.isSubmitting}
                  >
                    Send
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          </form>
          {/* </CardContent> */}
          {/* </Card> */}
        </Form>

        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600">
          {contract
            ? `Connected to ${contractAddress?.slice(0, 4)}...${contractAddress?.slice(-7)}`
            : 'Loading…'}
        </p>
      </div>
    </>
  )
}
