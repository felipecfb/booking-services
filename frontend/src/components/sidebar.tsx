import { Building, Home, LogOut, UserRound } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Nav } from './nav'
import { removeCookie } from '@/utils/remove-cookie'

export function Sidebar() {
  const navigate = useNavigate()

  function handleSignOut() {
    removeCookie('access_token')

    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col justify-between w-1/5 bg-muted py-4">
      <section className="flex flex-col items-center gap-2">
        <Nav.Root>
          <Nav.Link to="/">
            <Home size={20} />
            <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link to="/establishment">
            <Building size={20} />
            <span>Establishment</span>
          </Nav.Link>
          <Nav.Link to="/profile">
            <UserRound size={20} />
            <span>Profile</span>
          </Nav.Link>
        </Nav.Root>
      </section>

      <section className="flex-1 flex items-end justify-start">
        <Button
          className="bg-transparent text-zinc-50 space-x-2 hover:bg-transparent justify-start w-max font-bold"
          onClick={handleSignOut}
        >
          <LogOut size={20} />
          <span>Sign out</span>
        </Button>
      </section>
    </div>
  )
}
