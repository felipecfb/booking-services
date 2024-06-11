import { Sidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div>
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
