import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'

import Layout from '../components/Layout'

import '../styles/globals.css'

// todo: SEO

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
