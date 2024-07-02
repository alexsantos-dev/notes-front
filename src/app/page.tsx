export default function Home() {
  return (
    <main className='bg-slate-900 w-full h-screen'>
      <textarea
        name='note'
        id='note'
        className='h-96 w-96'
        defaultValue={'flings'}></textarea>
    </main>
  )
}
