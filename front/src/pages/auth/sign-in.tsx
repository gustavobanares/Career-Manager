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

export interface SignInProps {
  email: string
  password: string
}

export function SignIn() {
  const { signIn } = useContext(authContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const { data } = await await api.post('/sign-in', { email, password })

      signIn(data.accessToken)
    } catch (error) {
      console.log(`error: ${error}`)
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
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <Button type="submit" className="w-full bg-primary">
              Log-in
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}
