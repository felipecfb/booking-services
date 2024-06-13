import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type NavRootProps = ComponentProps<'nav'> & {
  children: ReactNode
}

export function NavRoot({ children, ...props }: NavRootProps) {
  return (
    <nav className={twMerge('w-full p-4 flex flex-col gap-4', props.className)}>
      {children}
    </nav>
  )
}
