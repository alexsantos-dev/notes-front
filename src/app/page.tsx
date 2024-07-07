'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { login } from '@/lib/api'
import { setToken, setUserId } from '@/lib/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Insira um email válido',
  }),
  password: z.string(),
  apiError: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function LoginForm({ userId, token }) {
  const router = useRouter()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { setError } = form

  async function onSubmit(data: FormSchemaType) {
    try {
      const { userId, token } = await login(data.email, data.password)
      setUserId(userId)
      setToken(token)
      router.push(`/notes/${userId}/${token}`)
    } catch (error: any) {
      setError('apiError', { message: error.message })
    }
  }

  return (
    <div className='w-screen h-screen bg-slate-100 flex justify-center items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            onSubmit as SubmitHandler<FormSchemaType>
          )}
          className='bg-white border rounded-lg shadow-lg w-1/4 space-y-6 p-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@email.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='HXVhkÇ-a872' type='password' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-col justify-center items-center'>
            <FormItem className='w-full'>
              <Button type='submit' className='w-full'>
                Enviar
              </Button>
            </FormItem>
            <FormItem className='w-full mt-3 flex justify-center'>
              <FormLabel>
                Ainda não tem conta? clique
                <Link href={`/register`}>
                  <span className='text-blue-600 visited:text-purple-600'>
                    {' '}
                    aqui
                  </span>
                </Link>
              </FormLabel>
            </FormItem>
          </div>
          {form.formState.errors.apiError && (
            <FormItem className='w-full mt-3 flex justify-center'>
              <FormMessage>
                {form.formState.errors.apiError.message}
              </FormMessage>
            </FormItem>
          )}
        </form>
      </Form>
    </div>
  )
}
