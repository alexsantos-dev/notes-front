'use client'
import NoteItems from './note-items'
import NoteBlockLoading from './note-block-loading'
import { Separator } from '../ui/separator'

export default function NoteBlock({
  userId,
  token,
  notes = [],
  loading,
  fetchNotes,
}) {
  return (
    <>
      {loading ? (
        <NoteBlockLoading />
      ) : (
        <>
          {notes &&
            notes.map((data) => (
              <div
                key={data.id}
                className='w-full h-full flex flex-col justify-center items-start'>
                <NoteItems
                  userId={userId}
                  token={token}
                  data={data}
                  onDeleteComplete={fetchNotes}
                  onEditComplete={fetchNotes}
                />
                <Separator />
              </div>
            ))}
        </>
      )}
    </>
  )
}
