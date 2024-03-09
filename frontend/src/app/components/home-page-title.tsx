import Image from 'next/image'
import Link from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'

import githubIcon from 'public/icons/github-button.svg'

import { cn } from '@/utils/cn'

interface StyledIconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
}

const StyledIconLink: React.FC<StyledIconLinkProps> = ({ className, children, ...rest }) => (
  <Link
    className={cn(
      'group opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100',
      className,
    )}
    {...rest}
  >
    {children}
  </Link>
)

export const HomePageTitle: FC = () => {
  const title = 'whisper'
  const desc = 'Disappearing group chats built for the Polkadot ecosystem'
  const githubHref = 'https://github.com/scio-labs/inkathon'
  return (
    <>
      <div className="my-8 flex w-full items-center justify-between text-center font-mono">
        {/* Logo & Title */}
        <div className="">
          <Link
            href={'/'}
            target="_blank"
            // className="group"
            className="group flex cursor-pointer items-center gap-4 rounded-3xl py-1.5 pb-0 transition-all hover:bg-gray-900"
          >
            <h1 className="text-[1.5rem] font-black tracking-tighter">{title}</h1>
          </Link>
          <p className="mt-0 text-xs text-gray-600">
            Built by{' '}
            <a
              href="https://odafe41.com"
              target="_blank"
              className="font-semibold text-gray-600 hover:text-gray-300"
            >
              Odafe
            </a>
          </p>
        </div>

        {/* Tagline & Links */}
        <p className="text-md mb-2 mt-4 text-gray-400">{desc}</p>

        {/* Github & Vercel Buttons */}
        <div className="flex select-none space-x-2">
          <StyledIconLink href={githubHref} target="_blank">
            <Image src={githubIcon} priority height={32} alt="Github Repository" />
          </StyledIconLink>
        </div>
      </div>
    </>
  )
}
