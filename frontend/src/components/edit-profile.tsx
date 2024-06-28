import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from './ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { Input } from './ui/input'
import { Button } from './ui/button'

const editProfileSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})

type EditProfileSchema = z.infer<typeof editProfileSchema>

export function EditProfile() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    values: {
      name: profile?.name ?? '',
      email: profile?.email ?? '',
    },
  })

  async function handleUpdateProfile(data: EditProfileSchema) {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Update your profile details</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input className="flex-1" id="name" {...register('name')} />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input className="flex-1" id="email" {...register('email')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
