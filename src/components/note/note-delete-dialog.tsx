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
import { DeleteNote } from '@/lib/api'

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
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className='w-8 h-8'>
          🗑️
        </Button>
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
