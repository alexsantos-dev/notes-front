'use client'
import NoteItems from './note-items'
import NoteBlockLoading from './note-block-loading'
import { Separator } from '../ui/separator'

export default function NoteBlock({ notes, loading, fetchNotes }) {
  return (
    <>
      {loading ? (
        <NoteBlockLoading />
      ) : (
        <>
          {notes.map((data) => (
            <div
              key={data.id}
              className='flex flex-col justify-center items-start'>
              <NoteItems
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
