import { useEffect, useMemo, useState } from 'react'

import { AcurastClient } from '@acurast/dapp'

import { env } from '@/config/environment'

const DEV_WSS = env.ACCU_DEV_WSS

export const useAccurast = () => {
  const [acurastClient, setAcurastClient] = useState<any>(null)
  const [id, setId] = useState<string>('')
  const [keyPair, setKeyPair] = useState()
  const [message, setMessage] = useState()

  useEffect(() => {
    const init = async () => {
      const acurast = new AcurastClient(DEV_WSS)
      setAcurastClient(acurast)

      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'ECDSA',
          namedCurve: 'P-256',
        },
        true,
        ['sign'],
      )

      const [privateKeyRaw, publicKeyRaw] = await Promise.all([
        // @ts-expect-error can't find the argument that matches call
        crypto.subtle
          .exportKey('jwk', keyPair.privateKey)
          .then((jwk) => Buffer.from(jwk.d, 'base64')),
        crypto.subtle
          .exportKey('raw', keyPair.publicKey)
          .then((arrayBuffer) => Buffer.from(arrayBuffer)),
      ])

      const publicKeyCompressedSize = (publicKeyRaw.length - 1) / 2
      const publicKeyCompressed = Buffer.concat([
        new Uint8Array([publicKeyRaw[2 * publicKeyCompressedSize] % 2 ? 3 : 2]),
        publicKeyRaw.subarray(1, publicKeyCompressedSize + 1),
      ])
      const publicKeyHash = await crypto.subtle.digest('SHA-256', publicKeyCompressed)
      setId(Buffer.from(publicKeyHash.slice(0, 16)).toString('hex'))
      setKeyPair({
        // @ts-expect-error allow
        privateKey: privateKeyRaw.toString('hex'),
        publicKey: publicKeyRaw.toString('hex'),
      })

      return () => {
        acurast.close()
      }
    }

    init()
  }, [])

  const send = (recipient: any, payload: any) => {
    acurastClient.send(recipient, payload)
  }

  useEffect(() => {
    if (acurastClient) {
      acurastClient.onMessage((message: any) => {
        setMessage({
          // @ts-expect-error allow
          sender: Buffer.from(message.sender).toString('hex'),
          recipient: Buffer.from(message.recipient).toString('hex'),
          payload: Buffer.from(message.payload).toString('hex'),
        })
      })
    }
  }, [acurastClient])

  return { id, keyPair, message, send }
}
