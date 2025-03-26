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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      navigate('/sign-in', { replace: true })
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={handleSignUp}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Sign-in
            </CardTitle>
            <CardDescription>Use your email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-5">
              <Label htmlFor="email">Name</Label>
              <Input
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
              Register
            </Button>
          </CardContent>
        </Card>
      </form>
    </main>
  )
}
