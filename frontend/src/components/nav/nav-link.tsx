import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-2 text-sm font-medium text-zinc-50 data-[current=true]:bg-zinc-700 w-full p-4 rounded-lg hover:bg-zinc-700"
      {...props}
    />
  )
}
