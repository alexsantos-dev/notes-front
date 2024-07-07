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
      <section
        style={{ borderColor: 'var(--primary)' }}
        className='w-full h-5/6 border-2 rounded-tl-xl rounded-tr-xl p-1'>
        <ScrollArea className='h-full w-full p-3'>
          <NoteBlock
            userId={userId}
            token={token}
            notes={notes}
            loading={loading}
            fetchNotes={fetchNotes}
          />
        </ScrollArea>
      </section>
      <section
        style={{ borderColor: 'var(--primary)' }}
        className='w-full h-1/6 border-2 rounded-bl-xl rounded-br-xl flex items-center justify-center'>
        <NoteAddDialog
          userId={userId}
          token={token}
          onAddComplete={fetchNotes}
        />
      </section>
    </NoteContainer>
  )
}
