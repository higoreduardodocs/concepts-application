'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { TSignUpSchema, signUpSchema } from '@/types/type'

const inputStyle =
  'text-sm w-full p-2 border bg-transparent border-gray-400 rounded-sm outline-none placeholder:text-gray-600'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = async (values: TSignUpSchema) => {
    const res = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
    const resData = await res.json()
    if (resData.errors) {
      const errors = resData.errors

      if (errors.name) {
        setError('email', {
          type: 'server',
          message: errors.name,
        })
      } else if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email,
        })
      } else if (errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password,
        })
      } else if (errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword,
        })
      } else {
        alert('Something went wrong!')
      }
    } else {
      reset()
    }
  }

  return (
    <main
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center w-full h-[100vh] bg-black text-black"
    >
      <form className="flex flex-col gap-3 w-full max-w-lg p-6 rounded-sm border border-gray-200 shadow-md bg-white">
        <div className="flex flex-col gap-1">
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            className={inputStyle}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{`${errors.name.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={inputStyle}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className={inputStyle}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            className={inputStyle}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white p-2 rounded-sm hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
