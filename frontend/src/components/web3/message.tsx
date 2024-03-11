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
        <div className="mb-0.5 text-sm text-foreground">{content}</div>
        {sender && <div className="text-xs text-muted-foreground">@{sender.slice(0, 5)}</div>}
      </div>
    </>
  )
}
