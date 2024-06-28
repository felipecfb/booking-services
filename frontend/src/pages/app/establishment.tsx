import { getCookie } from '@/utils/get-cookie'
import { useState } from 'react'

export function Establishment() {
  const [establishment, setEstablishment] = useState(() => {
    const token = getCookie('access_token')

    if (!token) {
      return null
    }
  })

  console.log(establishment)

  return (
    <div>
      {establishment ? (
        <div>
          <h1>Establishment</h1>
        </div>
      ) : (
        <div>
          <h1>Establishment not exists</h1>
        </div>
      )}
    </div>
  )
}
