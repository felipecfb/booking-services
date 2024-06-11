import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div>
      <h1>Header</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
