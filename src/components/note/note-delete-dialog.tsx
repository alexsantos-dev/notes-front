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

export default function NoteDeleteDialog({
  userId,
  token,
  data,
  onDeleteComplete,
}) {
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
      <AlertDialogTrigger asChild className='w-full h-full rounded-sm'>
        <div className='flex justify-center items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
          <Image src={TrashIcon} alt='Trash note icon' width={20} height={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja apagar esta nota?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleSubmit}
              className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'>
              Confirmar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}