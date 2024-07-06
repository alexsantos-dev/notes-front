'use-client'

export default function NoteContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{ borderColor: 'var(--primary)' }}
      className='w-[520px] h-[520px] border-2 rounded-2xl flex justify-center items-center flex-col'>
      {children}
    </div>
  )
}
