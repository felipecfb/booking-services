import { Building, Home } from 'lucide-react'
import { Nav } from './nav'

export function Sidebar() {
  return (
    <div className="flex flex-col justify-center w-max bg-muted py-4">
      <Nav.Root>
        <Nav.Link to="/">
          <Home size={24} />
        </Nav.Link>
        <Nav.Link to="/establishment">
          <Building size={24} />
        </Nav.Link>
      </Nav.Root>
    </div>
  )
}
