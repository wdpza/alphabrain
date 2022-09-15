import { useUser } from '@auth0/nextjs-auth0'

export default function SignUp() {
  const { isAuthenticated } = useUser()

  // redirect to this page after auth0 login
  const redirectUri = `${process.env.NEXT_PUBLIC_URL}/qr`

  return (
    <a
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      href="/api/auth/login?redirectUri=${redirectUri}"
    >
      Sign Up
    </a>
  )
}