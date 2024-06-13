import { Bell, PlaneTakeoff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  return (
    <header className="bg-muted flex items-center justify-between p-4">
      <Link to="/">
        <PlaneTakeoff size={40} className="text-zinc-50" />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Button variant="outline" size="icon" className="relative">
          <Bell size={20} />

          <p className="absolute -top-2 -right-2 bg-foreground text-muted bg-opacity-50 rounded-full text-[10px] font-bold p-1 leading-none">
            1
          </p>
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/felipecfb.png" />
        </Avatar>
      </div>
    </header>
  )
}
