'use client'
import React, { useEffect, useState } from 'react'
import NoteMain from '@/components/note/note-main'
import { getUserId, getToken, removeCredentials } from '@/lib/auth'
import { UserInterface } from '@/app/userInterface'
import NoteMainLoading from '@/components/note/note-main-loading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut, useSession, SessionProvider } from 'next-auth/react'
import SignOutButton from '@/components/signout/signout-button'

const Home = () => {
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    const userId = getUserId()
    const token = getToken()
    if (userId && token) {
      setUser({ userId, token })
    }
  }, [])

  if (!user) {
    return (
      <main className='bg-slate-100 w-screen h-screen flex justify-center items-center'>
        <NoteMainLoading />
      </main>
    )
  }

  return (
    <SessionProvider>
      <div className='bg-slate-100 w-screen h-screen flex justify-center items-center'>
        <NoteMain token={user.token} userId={user.userId} />
        <div className='absolute top-4 right-2 lg:top-8 lg:right-32'>
          <SignOutButton />
        </div>
      </div>
    </SessionProvider>
  )
}

export default Home
