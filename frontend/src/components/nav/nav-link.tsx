import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="bg-background rounded-full p-3 transition-colors duration-200 hover:bg-primary data-[current=true]:bg-primary data-[current=true]:text-background hover:text-background"
    />
  )
}
