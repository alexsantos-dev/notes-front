'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { login } from '@/lib/api'
import { setToken, setUserId } from '@/lib/auth'
import NoteMainLoading from '@/components/note/note-main-loading'

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
import GoogleLoginButton from '@/components/google/google-button'

import { SessionProvider, useSession } from 'next-auth/react'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Insira um email válido',
  }),
  password: z.string(),
  apiError: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function LoginForm() {
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
      redirect(`/notes/${userId}/${token}`)
    } catch (error: any) {
      setError('apiError', { message: error.message })
    }
  }

  return (
    <SessionProvider>
      <main className='w-screen h-screen bg-slate-100 flex justify-center items-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit as SubmitHandler<FormSchemaType>
            )}
            className='bg-white border rounded-lg shadow-lg min-w-[320px] min-h-[260px] space-y-6 p-6'>
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
                    <Input
                      placeholder='HXVhkÇ-a872'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-3 justify-center items-center'>
              <FormItem className='w-full cursor-pointer'>
                <GoogleLoginButton />
              </FormItem>
              <FormItem className='w-full h-full'>
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
      </main>
    </SessionProvider>
  )
}
