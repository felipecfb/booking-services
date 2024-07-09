import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { createEstablishment } from '@/api/create-establishment'
import { Input } from '@/components/ui/input'
import { DialogContent } from '@/components/ui/dialog'
import { getCookie } from '@/utils/get-cookie'

const createEstablishmentForm = z.object({
  name: z.string(),
  description: z.string(),
  document: z.string().length(14),
  ownerId: z.string(),
})

type CreateEstablishmentForm = z.infer<typeof createEstablishmentForm>

export function CreateEstablishment() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateEstablishmentForm>()

  const { mutateAsync: createEstablishmentFn } = useMutation({
    mutationFn: createEstablishment,
  })

  async function handleCreateEstablishment(data: CreateEstablishmentForm) {
    try {
      const ownerId = getCookie('access_token')

      await createEstablishmentFn({
        name: data.name,
        description: data.description,
        document: data.document,
        ownerId: ownerId!.toString(),
      })

      toast.success('Estabelecimento criado com sucesso.')

      navigate('/establishment')
    } catch (error) {
      toast.error('Erro ao criar o estabelecimento.')
    }
  }

  return (
    <>
      <DialogContent className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your establishment
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the fields below to create your establishment and start
              managing your business with us.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleCreateEstablishment)}
            className="space-y-4"
          >
            <Input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Establishment name"
            />
            <Input
              id="desciption"
              type="description"
              {...register('description')}
              placeholder="Description"
            />
            <Input
              id="document"
              type="text"
              {...register('document')}
              placeholder="Document"
            />

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Create establishment
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By continuing, you agree to our{' '}
              <a className="underline underline-offset-4" href="">
                Terms of Service
              </a>{' '}
              and{' '}
              <a className="underline underline-offset-4" href="">
                Privacy Policies
              </a>
              .
            </p>
          </form>
        </div>
      </DialogContent>
    </>
  )
}
