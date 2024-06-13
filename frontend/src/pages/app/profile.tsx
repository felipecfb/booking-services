import { MapPin, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'

export function Profile() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  return (
    <div className="w-full p-8 space-y-8 bg-foreground h-screen">
      <h1 className="font-bold text-4xl text-muted">Profile</h1>

      <div className="flex items-center gap-8 w-full">
        <section className="rounded-sm p-4 gap-4 bg-muted flex flex-col items-center">
          <div className="relative w-max">
            <img
              src="https://github.com/felipecfb.png"
              alt="Image"
              className="w-48"
            />

            <Button className="absolute -bottom-4 -right-4 bg-zinc-500 bg-opacity-50 p-2 rounded-full hover:bg-zinc-400">
              <Pencil size={20} className="text-zinc-50" />
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              {profile?.name}
            </h2>
            <span className="text-foreground flex items-center gap-2 text-xs">
              <MapPin size={14} />
              Agentur GmbH Grüner Weg 6 61169
            </span>
          </div>
        </section>

        <section className="rounded-sm p-4 bg-muted flex-1">
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          <p className="text-foreground text-sm">User information</p>

          <form action="">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-foreground text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-foreground rounded-sm"
                  value={profile?.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-foreground text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-foreground rounded-sm"
                  value={profile?.email}
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full bg-primary">
              Save
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}
