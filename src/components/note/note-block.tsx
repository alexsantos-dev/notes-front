'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import NoteItems from './note-items'

async function GetAllNotes() {
  const res = await fetch('http://localhost:3000/notes')
  const data = await res.json() // Aguardar a resposta JSON
  return data
}

export default function NoteBlock() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function fetchNotes() {
      const notesData = await GetAllNotes()
      setNotes(notesData)
    }

    fetchNotes()
  }, [])

  return (
    <>
      {notes.map((data) => (
        <div
          key={data.id}
          className='flex flex-col justify-center items-center'>
          <NoteItems data={data} />
          <Separator />
        </div>
      ))}
    </>
  )
}
