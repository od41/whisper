'use client'

import { FC, useEffect } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import GreeterContract from '@inkathon/contracts/typed-contracts/contracts/greeter'
import {
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

const formSchema = z.object({
  newMessage: z.string().min(1).max(400),
})

export const Chatroom: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Chatroom)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Chatroom, GreeterContract)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  useEffect(() => {
    //listing to contract
  }, [typedContract])

  // fetch messages
  const fetchMessages = async () => {
    console.log('fetching messages...')
  }

  // send a message
  const sendMessage: SubmitHandler<z.infer<typeof formSchema>> = async ({ newMessage }) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'sendMessage', {}, [
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      fetchMessages()
    }
  }

  // if (!api) return null

  return (
    <>
      <div className="flex max-w-[22rem] grow flex-col gap-4">
        {/* <h2 className="text-center font-mono text-gray-400">Greeter Smart Contract</h2> */}

        <Form {...form}>
          {/* Update Greeting */}
          <Card>
            <CardContent className="pt-6">
              <form
                onSubmit={handleSubmit(sendMessage)}
                className="flex flex-col justify-end gap-2"
              >
                <FormItem>
                  {/* <FormLabel className="text-base"></FormLabel> */}
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Send message"
                        disabled={form.formState.isSubmitting}
                        {...register('newMessage')}
                      />
                      <Button
                        type="submit"
                        className="bg-primary font-bold"
                        disabled={form.formState.isSubmitting}
                        isLoading={form.formState.isSubmitting}
                      >
                        Send message
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              </form>
            </CardContent>
          </Card>
        </Form>

        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600">
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}
