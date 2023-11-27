import { NextResponse } from 'next/server'

import { signUpSchema } from '@/types/type'

export async function POST(req: Request) {
  const body: unknown = await req.json()
  const res = signUpSchema.safeParse(body)

  let zodErrors = {}
  if (!res.success) {
    res.error.issues.forEach((item) => {
      zodErrors = { ...zodErrors, [item.path[0]]: item.message }
    })
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  )
}
