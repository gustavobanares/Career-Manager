import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export async function signIn(data: SignInRequest) {
  await api.post('/sign-in', { data })
}
