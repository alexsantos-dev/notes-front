import { signOut } from 'next-auth/react'
import { removeCredentials } from '@/lib/auth'
import { Button } from '../ui/button'

export default function SignOutButton() {
  async function SignOut() {
    await signOut({ callbackUrl: '/' })
    removeCredentials()
  }
  return <Button onClick={SignOut}>sign out</Button>
}
