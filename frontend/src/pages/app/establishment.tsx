/* eslint-disable react/no-unescaped-entities */
import { useQuery } from '@tanstack/react-query'

import { getEstablishment } from '@/api/get-establishment'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateEstablishment } from './create-establishment'

export function Establishment() {
  const { data: establishment } = useQuery({
    queryKey: ['establishment'],
    queryFn: () =>
      getEstablishment({
        establishmentId: '',
      }),
  })

  return (
    <>
      {establishment ? (
        <div>
          <h1>{JSON.stringify(establishment)}</h1>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <section className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Don't have a establishment?</h1>
            <p className="text-lg font-medium">
              Create one by clicking on the button below and start managing your
              business with us.
            </p>
          </section>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Create establishment</Button>
            </DialogTrigger>
            <CreateEstablishment />
          </Dialog>
        </div>
      )}
    </>
  )
}
