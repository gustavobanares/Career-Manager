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
import { useState, useContext } from 'react'
import { authContext } from '../../context/auth-context'
import { api } from '@/lib/axios'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { toastSuccessStyle } from '@/lib/toast-success-style'

export interface SignInProps {
  email: string
  password: string
}

export function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useContext(authContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setIsLoading(true)

      const { data } = await api.post('/sign-in', { email, password })

      signIn(data.token)
      toast.success(`Welcome back!`, toastSuccessStyle)
      navigate('/', { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Invalid credentials', {
          style: {
            color: '#4243b8',
          },
          iconTheme: {
            primary: '#a61919',
            secondary: '#FFFAEE',
          },
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={handleSignIn}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Sign-in
            </CardTitle>
            <CardDescription>Use your email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
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
                id="password"
                placeholder="Password"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="my-5 flex flex-col gap-2">
              <CardDescription>
                Don&apos;t have an account? Sign up{' '}
                <NavLink to={'/sign-up'}>here.</NavLink>
              </CardDescription>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary"
            >
              Log-in
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}
