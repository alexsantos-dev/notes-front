import { Button } from '@/components/ui/button'
import NoteContainer from '../components/note/note-container'
import { ScrollArea } from '@/components/ui/scroll-area'
import NoteBlock from '../components/note/note-block'
import NoteAddDialog from '@/components/note/note-add-dialog'

export default function Home() {
  return (
    <main className='bg-white w-full h-screen flex justify-center items-center'>
      <NoteContainer>
        <section
          style={{ borderColor: 'var(--primary)' }}
          className='w-full h-5/6 border-2 rounded-tl-xl rounded-tr-xl p-1'>
          <ScrollArea className='h-full w-full p-3 '>
            <NoteBlock />
          </ScrollArea>
        </section>
        <section
          style={{ borderColor: 'var(--primary)' }}
          className='w-full h-1/6 border-2 rounded-bl-xl rounded-br-xl flex items-center justify-center'>
          <NoteAddDialog />
        </section>
      </NoteContainer>
    </main>
  )
}
