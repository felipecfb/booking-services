import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from '@/api/sign-in'
import { api } from '@/lib/axios'
import { setCookie } from '@/utils/set-cookie'
import { PasswordInput } from '@/components/password-input'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticate({
        email: data.email,
        password: data.password,
      })

      setCookie('access_token', response.access_token)

      api.defaults.headers.common.Authorization = `Bearer ${response.access_token}`

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo usuário</Link>
        </Button>

        <div className="flex w-[340px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo canal do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Seu email"
            />

            <PasswordInput
              id="password"
              placeholder="Sua senha"
              register={register('password')}
            />

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
