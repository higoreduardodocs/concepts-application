import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string().email(),
    password: z.string().min(10, 'Password must be at lesat 10 characteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
