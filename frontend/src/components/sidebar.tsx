import { Building, Home, LogOut, PlaneTakeoff, UserRound } from 'lucide-react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Nav } from './nav'
import { Avatar, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { removeCookie } from '@/utils/remove-cookie'

export function Sidebar() {
  const navigate = useNavigate()

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  function handleSignOut() {
    removeCookie('access_token')

    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col justify-between min-h-screen w-1/5 bg-zinc-800 py-4">
      <section className="w-full flex flex-col items-center gap-4 py-4">
        <Link to="/">
          <PlaneTakeoff size={64} className="text-zinc-50" />
        </Link>
        <Separator className="w-full h-0.5" />
      </section>

      <section className="flex flex-col items-center gap-2">
        <Avatar className="w-14 h-14">
          <AvatarImage src="https://gravatar.com/avatar/fd876f8cd6a58277fc664d47ea10ad19?s=200&d=robohash&r=g" />
        </Avatar>
        <h2 className="text-zinc-50 text-lg font-bold">{profile?.name}</h2>

        <Nav.Root>
          <Nav.Link to="/">
            <Home size={20} />
            <span>Home</span>
          </Nav.Link>
          <Nav.Link to="/establishment">
            <Building size={20} />
            <span>Establishment</span>
          </Nav.Link>
          <Nav.Link to="/me">
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
