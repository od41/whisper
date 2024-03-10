'use client'
export type MessageProps = {
  content: string
  sender?: string
}

export const Message = ({ message }: { message: MessageProps }) => {
  const { content, sender } = message
  return (
    <>
      <div className="mb-4 flex w-fit grow flex-col rounded-md border bg-border px-3 py-1">
        {/* @ts-expect-error the data isn't in an object */}
        <div className="mb-0.5 text-sm text-muted-foreground">{message}</div>
        {sender && <div className="text-xs text-black">{sender}</div>}
      </div>
    </>
  )
}
