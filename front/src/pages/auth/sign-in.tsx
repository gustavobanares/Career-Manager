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
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'
import { useState } from 'react'

export interface SignInProps {
  email: string
  password: string
}

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: SignInProps) {
    try {
      const response = await authenticate({ email, password })
      console.log(response)
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }
  // {...service, [e.target.name] : e.target.value}}
  return (
    <main className="flex w-full h-screen justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">
            Entre com sua conta
          </CardTitle>
          <CardDescription>Utilize seu email e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="exemplo@gmail.com" type="email" />
          </div>
          <div className="my-5 flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" placeholder="password" type="password" />
          </div>
          <Button className="w-full bg-primary" onClick={() => {}}>
            Entrar
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
