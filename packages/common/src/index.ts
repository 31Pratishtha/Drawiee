import { z } from 'zod'

export const CreateUserSchema = z.object({
  password: z.string(),
  email: z.email(),
  name: z.string().min(3).max(20),
  // photo: z.string().nullable()
})

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
})



