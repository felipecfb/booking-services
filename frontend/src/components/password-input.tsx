import { useState } from 'react'
import { Input } from './ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { UseFormProps } from 'react-hook-form'

interface PasswordInputProps {
  id: string
  placeholder: string
  register: UseFormProps['values']
}

export function PasswordInput({
  id,
  placeholder,
  register,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      <Input
        id={id}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        {...register}
      />

      {showPassword ? (
        <EyeOffIcon
          className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2"
          onClick={toggleShowPassword}
        />
      ) : (
        <EyeIcon
          className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  )
}
