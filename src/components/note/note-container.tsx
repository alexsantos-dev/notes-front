'use-client'

export default function NoteContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-[356px] lg:w-[520px] h-[600px] border rounded-xl shadow-2xl flex justify-center flex-col bg-white'>
      {children}
    </div>
  )
}
