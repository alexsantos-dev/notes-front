import { Button } from '../ui/button'

export default function NoteItems({ data }) {
  return (
    <div className='w-full h-[56px] flex justify-between items-center p-2'>
      <div className='w-5/6 h-full flex justify-between items-center p-2'>
        <p>{data.note}</p>
      </div>
      <div className='w-1/6 h-full flex justify-center items-center gap-2'>
        <Button variant={'ghost'} className='w-8 h-8'>
          ✏️
        </Button>
        <Button variant={'ghost'} className='w-8 h-8'>
          🗑️
        </Button>
      </div>
    </div>
  )
}
