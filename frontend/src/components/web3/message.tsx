'use client'
export type MessageProps = {
  content: string
  sender: string
}

export const Message = ({ message }: { message: MessageProps }) => {
  const { content, sender } = message
  return (
    <>
      <div className="mb-3 flex w-auto grow flex-col rounded-md border bg-border px-3 py-1">
        <div className="mb-0.5 text-sm text-muted-foreground">{content}</div>
        <div className="text-xs text-black">{sender}</div>
      </div>
    </>
  )
}
