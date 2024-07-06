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
import { url } from '@/lib/Consts'

async function deleteNote(noteId: string) {
  await fetch(`${url}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function NoteDeleteDialog({ data, onDeleteComplete }) {
  const handleSubmit = async () => {
    try {
      await deleteNote(data.id)
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
