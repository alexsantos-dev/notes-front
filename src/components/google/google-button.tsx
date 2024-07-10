'use client'
import Image from 'next/image'
import GoogleIcon from 'images/google-icon.png'
import { Button } from '../ui/button'
import { googleLogin } from '@/lib/api'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setToken, setUserId } from '@/lib/auth'
import NoteMainLoading from '../note/note-main-loading'

export default function GoogleLoginButton() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (status === 'authenticated' && session) {
        try {
          const { name, email } = session.user
          const { userId, token } = await googleLogin(name, email, name)
          setUserId(userId)
          setToken(token)
          router.push(`/notes/${userId}/${token}`)
        } catch (error) {
          console.error('Erro ao fazer login com Google:', error)
        }
      }
    }

    handleGoogleLogin()
  }, [status, session, router])

  const handleLoginClick = async () => {
    await signIn('google')
  }

  return (
    <Button
      className='w-full h-full'
      onClick={handleLoginClick}
      variant={'outline'}
      asChild>
      <div className='w-full h-full flex gap-3 justify-center items-center'>
        <Image src={GoogleIcon} alt='Google Icon' width={20} height={20} />
        <p className='select-none'>Continuar com Google</p>
      </div>
    </Button>
  )
}
