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

const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string({
    message: 'Enter a strong password',
  }),
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

  async function onSubmit(data: FormSchemaType) {
    try {
      const { token, userId } = await login(data.email, data.password)
      setUserId(userId)
      setToken(token)
      router.push(`/notes/${userId}/${token}`)
    } catch (error) {
      console.error('Failed to login', error)
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            onSubmit as SubmitHandler<FormSchemaType>
          )}
          className='bg-gray-50 rounded-md w-1/4 space-y-6 p-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='bg-white'
                    placeholder='email@email.com'
                    {...field}
                  />
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
                    className='bg-white'
                    placeholder='HXVhkÇ-a872'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
