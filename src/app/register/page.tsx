'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { createUser, login } from '@/lib/api'
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
  name: z.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'\- ]{4,200}$/, {
    message: 'Insira um nome válido',
  }),
  email: z.string().email({
    message: 'Insira um email válido',
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
      {
        message: 'Insira uma senha forte',
      }
    ),
  apiError: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function RegistForm() {
  const router = useRouter()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const { setError } = form

  async function onSubmit(data: FormSchemaType) {
    try {
      await createUser(data.name, data.email, data.password)
      const { userId, token } = await login(data.email, data.password)
      if (userId && token) {
        setUserId(userId)
        setToken(token)
      }
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
          className='bg-white border rounded-lg shadow-lg min-w-[320px] min-h-[260px] space-y-6 p-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Jhon Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Enviar
          </Button>
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
