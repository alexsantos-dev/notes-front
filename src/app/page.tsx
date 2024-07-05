import { Button } from '@/components/ui/button'
import NoteContainer from '../components/note/note-container'
import { ScrollArea } from '@/components/ui/scroll-area'
import NoteBlock from '../components/note/note-block'
import { Suspense } from 'react'
import Loading from './loading'

export default async function Home() {
  return (
    <main className='bg-white w-full h-screen flex justify-center items-center'>
      <NoteContainer>
        <section
          style={{ borderColor: 'var(--primary)' }}
          className='w-full h-5/6 border-2 rounded-tl-xl rounded-tr-xl'>
          <ScrollArea className='h-full w-full p-3'>
            <Suspense fallback={<Loading />}>
              <NoteBlock />
            </Suspense>
          </ScrollArea>
        </section>
        <section
          style={{ borderColor: 'var(--primary)' }}
          className='w-full h-1/6 border-2 rounded-bl-xl rounded-br-xl flex items-center justify-center'>
          <Button variant={'default'} className='w-5/6 h-2/3'>
            Adicionar nota
          </Button>
        </section>
      </NoteContainer>
    </main>
  )
}
