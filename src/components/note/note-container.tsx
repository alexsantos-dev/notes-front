'use-client'

export default function NoteContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-[520px] h-[520px] border rounded-xl shadow-2xl flex justify-center items-center flex-col bg-white'>
      {children}
    </div>
  )
}
