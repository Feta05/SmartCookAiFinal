import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type TopLevelNavItemProps = {
  href: string
  children: React.ReactNode
  target?: string
  rel?: string
}

function TopLevelNavItem({ href, children, target, rel }: TopLevelNavItemProps) {
  return (
    <li key={href}>
      <Link
        href={href}
        target={target}
        rel={rel}
        className="text-normal leading-5 transition text-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header( className: any , ref: any) {
  return (
    <div
      ref={ref}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
        className
      )}
    >
      {/* Logo goes here */}

      <nav className="flex-1 text-white">
        <ul className="flex  gap-8 ">
          <TopLevelNavItem href="/" target="_blank" rel="noopener noreferrer">
            Home
          </TopLevelNavItem>
          <TopLevelNavItem
            href="https://github.com/Feta05"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </TopLevelNavItem>
        </ul>
      </nav>

      {/* ModeToggle goes here */}
    </div>
  )
})
export default Header;