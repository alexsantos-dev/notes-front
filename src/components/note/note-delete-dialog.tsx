import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import TrashIcon from 'images/trash.png'
import { DeleteNote } from '@/lib/api'
import Image from 'next/image'
import { UserInterface } from '@/app/userInterface'
import { NoteInterface } from './noteInterface'

interface NoteDeleteDialogProps extends UserInterface {
  data: NoteInterface
  onDeleteComplete: () => Promise<void>
}

export default function NoteDeleteDialog({
  userId,
  token,
  data,
  onDeleteComplete,
}: NoteDeleteDialogProps) {
  const handleSubmit = async () => {
    const noteId = data.id
    try {
      await DeleteNote(userId, noteId, token)
      onDeleteComplete()
    } catch (error) {
      console.error('Error delete note:', error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='w-[38px] h-full rounded-sm'>
        <div className='flex justify-center items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
          <Image src={TrashIcon} alt='Trash note icon' width={20} height={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[356px] flex flex-col justify-center items-center '>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja apagar esta nota?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex-row justify-center items-center gap-4'>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
