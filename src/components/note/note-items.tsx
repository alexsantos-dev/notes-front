import NoteDeleteDialog from './note-delete-dialog'
import NoteEditDialog from './note-edit-dialog'

export default function NoteItems({
  userId,
  token,
  data,
  onEditComplete,
  onDeleteComplete,
}) {
  return (
    <div className='w-full h-[56px] flex justify-between items-center p-2'>
      <div className='w-5/6 h-full flex justify-between items-center p-2'>
        <p>{data.note}</p>
      </div>
      <div className='w-1/5 h-full flex justify-center items-center gap-3'>
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
