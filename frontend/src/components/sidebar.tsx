import { Building, Home, LogOut, PlaneTakeoff, UserRound } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Nav } from './nav'
import { Avatar, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'

export function Sidebar() {
  return (
    <div className="flex flex-col justify-between min-h-screen w-1/5 bg-zinc-800 py-4">
      <div>
        <div className="w-full flex flex-col items-center gap-4 py-4">
          <Link to="/">
            <PlaneTakeoff size={64} className="text-zinc-50" />
          </Link>
          <Separator className="w-full h-0.5" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://gravatar.com/avatar/fd876f8cd6a58277fc664d47ea10ad19?s=200&d=robohash&r=g" />
          </Avatar>
          <h2 className="text-zinc-50 text-lg font-bold">John Doe</h2>
        </div>

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
      </div>

      <Button className="bg-transparent text-zinc-50 space-x-2 hover:bg-transparent justify-start w-max font-bold">
        <LogOut size={20} />
        <span>Sign out</span>
      </Button>
    </div>
  )
}
