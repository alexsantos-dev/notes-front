'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { UpdateNote } from '@/lib/api'

export default function NoteEditDialog({
  userId,
  token,
  data,
  onEditComplete,
}) {
  const [noteText, setNoteText] = useState(data.note || '')

  useEffect(() => {
    setNoteText(data.note || '')
  }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const noteId: string = data.id
    try {
      await UpdateNote(userId, noteId, token, { note: noteText })
      onEditComplete()
    } catch (error) {
      console.error('Error editing note:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='w-8 h-8'>
          ✏️
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-6'>
            <DialogTitle>Editar nota</DialogTitle>
          </DialogHeader>
          <div className='flex gap-3 flex-col mb-4'>
            <Label htmlFor='note'>Nota</Label>
            <Textarea
              className='w-full h-[78px]'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit'>Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
