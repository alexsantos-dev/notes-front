'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { url } from '@/lib/Consts'

async function addNote(note: string) {
  await fetch(`${url}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ note }),
  })
}

export default function NoteAddDialog() {
  const [noteText, setNoteText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await addNote(noteText)
    } catch (error) {
      console.error('Error adding note:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-2/3 h-3/5'>Adicionar nota</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-6'>
            <DialogTitle>Adicionar nota</DialogTitle>
            <DialogDescription>
              Escreva suas notas e clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <div className='flex gap-3 flex-col'>
            <Label htmlFor='name'>Name</Label>
            <Textarea
              className='w-full h-[78px]'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type='submit' disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
