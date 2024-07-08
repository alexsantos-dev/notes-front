import { UserInterface } from '@/app/userInterface'
import NoteDeleteDialog from './note-delete-dialog'
import NoteEditDialog from './note-edit-dialog'
import { NoteInterface } from './noteInterface'

interface NoteItemsProps extends UserInterface {
  data: NoteInterface
  onEditComplete: () => Promise<void>
  onDeleteComplete: () => Promise<void>
}

export default function NoteItems({
  userId,
  token,
  data,
  onEditComplete,
  onDeleteComplete,
}: NoteItemsProps) {
  return (
    <div className='w-full h-[56px] flex justify-between items-center p-2'>
      <div className='p-2 w-[230px]'>
        <p className='overflow-hidden text-ellipsis text-nowrap'>{data.note}</p>
      </div>
      <div className='w-[86px] h-full flex justify-between items-center'>
        <NoteEditDialog
          userId={userId}
          token={token}
          data={data}
          onEditComplete={onEditComplete}
        />
        <NoteDeleteDialog
          userId={userId}
          token={token}
          data={data}
          onDeleteComplete={onDeleteComplete}
        />
      </div>
    </div>
  )
}
