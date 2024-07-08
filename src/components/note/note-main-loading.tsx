import NoteContainer from './note-container'
import { Skeleton } from '../ui/skeleton'

export default function NoteMainLoading() {
  return (
    <NoteContainer>
      <div className='w-full h-full bg-white'>
        <div className='w-full h-[520px] flex justify-center items-center'></div>
        <div className='w-full h-[80px] flex items-center justify-center'>
          <Skeleton className='w-2/3 h-3/5' />
        </div>
      </div>
    </NoteContainer>
  )
}
