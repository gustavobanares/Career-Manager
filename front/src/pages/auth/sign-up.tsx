import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { toastErrorStyle } from '@/lib/toast-error-style'
import { toastSuccessStyle } from '@/lib/toast-success-style'
import { AxiosError } from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'

export interface SignUpProps {
  email: string
  password: string
}

export function SignUp() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await api.post('/sign-up', { email, password, name })
      toast.success(`Account created!`, toastSuccessStyle)
      navigate('/sign-in', { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data.message === 'user with this email already exists'
        ) {
          toast.error(
            'Ops! An user with this e-mail already exists, please log-in or choose another one',
            toastErrorStyle,
          )
        } else {
          toast.error(
            'Password must contain at least 6 characters.',
            toastErrorStyle,
          )
        }
      }
    }
  }

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={handleSignUp}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Sign-up
            </CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-5">
              <Label htmlFor="email">Name</Label>
              <Input
                required
                id="name"
                placeholder="Your name here"
                type="name"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                required
                id="email"
                placeholder="example@gmail.com"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="my-5 flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                placeholder="Your password here"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <CardDescription className="mb-5">
              Already have an account? Sign in{' '}
              <NavLink to={'/sign-in'}>here.</NavLink>
            </CardDescription>
            <Button type="submit" className="w-full bg-primary">
              Register
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}
