'use client'
import React, { useEffect, useState } from 'react'
import NoteMain from '@/components/note/note-main'
import { getUserId, getToken } from '@/lib/auth'

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = getUserId()
    const storedToken = getToken()
    if (storedUserId && storedToken) {
      setUserId(storedUserId)
      setToken(storedToken)
    }
  }, [])

  return (
    <main className='bg-slate-100 w-screen h-screen flex justify-center items-center'>
      {userId && <NoteMain token={token} userId={userId} />}
    </main>
  )
}

export default Home
