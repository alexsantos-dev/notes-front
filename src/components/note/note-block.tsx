'use client'
import { useEffect, useState } from 'react'
import NoteItems from './note-items'
import NoteBlockLoading from './note-block-loading'
import { Separator } from '../ui/separator'

async function getAllNotes() {
  const res = await fetch('http://localhost:3000/notes')
  const data = await res.json()
  return data
}

export default function NoteBlock() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notesData = await getAllNotes()
        setNotes(notesData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    fetchNotes()
  }, [])

  return (
    <>
      {loading ? (
        <>
          <div>
            <NoteBlockLoading />
          </div>
        </>
      ) : (
        <>
          {notes.map((data) => (
            <div
              key={data.id}
              className='flex flex-col justify-center items-start'>
              <NoteItems data={data} />
              <Separator />
            </div>
          ))}
        </>
      )}
    </>
  )
}
