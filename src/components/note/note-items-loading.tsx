import { Skeleton } from '../ui/skeleton'

export default function NoteItemsLoading() {
  return (
    <div className='w-full h-[56px] flex justify-between items-center p-2 gap-2'>
      <Skeleton className='w-5/6 h-full flex justify-between items-center p-2' />
      <Skeleton className='w-1/6 h-full flex justify-center items-center gap-2' />
    </div>
  )
}
