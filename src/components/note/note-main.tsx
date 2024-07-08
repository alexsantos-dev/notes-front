'use client'

import { useState, useEffect } from 'react'
import NoteContainer from './note-container'
import { ScrollArea } from '../ui/scroll-area'
import NoteBlock from './note-block'
import NoteAddDialog from './note-add-dialog'
import { GetAllNotes } from '@/lib/api'

export default function NoteMain({ userId, token }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      const notesData = await GetAllNotes(userId, token)
      setNotes(notesData)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <NoteContainer>
      <section className='w-full h-[520px] flex justify-center items-center'>
        <ScrollArea className='mt-4 h-full lg:w-[512px] p-3'>
          <NoteBlock
            userId={userId}
            token={token}
            notes={notes}
            loading={loading}
            fetchNotes={fetchNotes}
          />
        </ScrollArea>
      </section>
      <section className='w-full h-[80px] flex items-center justify-center shadow-inner'>
        <NoteAddDialog
          userId={userId}
          token={token}
          onAddComplete={fetchNotes}
        />
      </section>
    </NoteContainer>
  )
}
