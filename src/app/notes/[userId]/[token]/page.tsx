'use client'
import React, { useEffect, useState } from 'react'
import NoteMain from '@/components/note/note-main'
import { getUserId, getToken } from '@/lib/auth'
import { UserInterface } from '@/app/userInterface'
import NoteMainLoading from '@/components/note/note-main-loading'

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
    <main className='bg-slate-100 w-screen h-screen flex justify-center items-center'>
      <NoteMain token={user.token} userId={user.userId} />
    </main>
  )
}

export default Home
