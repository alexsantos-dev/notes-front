'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { UpdateNote } from '@/lib/api'
import Image from 'next/image'
import ExpandIcon from 'images/expand.png'
import { UserInterface } from '@/app/userInterface'
import { NoteInterface } from './noteInterface'

interface NoteEditDialogProps extends UserInterface {
  data: NoteInterface
  onEditComplete: () => Promise<void>
}

export default function NoteEditDialog(
  { userId, token, data, onEditComplete }: NoteEditDialogProps
) {
  const [noteText, setNoteText] = useState(data.note || '')

  useEffect(() => {
    setNoteText(data.note || '')
  }, [data])

  const handleSubmit = async (event: any) => {
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
    <>
      <Dialog>
        <DialogTrigger asChild className='w-[38px] h-full rounded-sm'>
          <div className='flex justify-center items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
            <Image
              src={ExpandIcon}
              alt='Expand note icon'
              width={17}
              height={17}
            />
          </div>
        </DialogTrigger>
        <DialogContent className='w-[356px]'>
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
    </>
  )
}
