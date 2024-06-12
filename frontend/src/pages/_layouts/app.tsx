import { Sidebar } from '@/components/sidebar'
import { api } from '@/lib/axios'
import { getCookie } from '@/utils/get-cookie'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  useState(() => {
    const token = getCookie('access_token')

    if (!token) {
      window.location.href = '/sign-in'
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    return token
  })

  return (
    <div>
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
