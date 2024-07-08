'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Textarea } from '../ui/textarea'
import { AddNote } from '@/lib/api'

export default function NoteAddDialog({ userId, token, onAddComplete }) {
  const [noteText, setNoteText] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await AddNote(userId, { note: noteText }, token)
      onAddComplete()
      setNoteText('')
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-2/3 h-3/5'>Adicionar nota</Button>
      </DialogTrigger>
      <DialogContent className='w-[356px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-6'>
            <DialogTitle className='text-center'>Adicionar nota</DialogTitle>
          </DialogHeader>
          <div className='flex gap-3 flex-col mb-4'>
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
