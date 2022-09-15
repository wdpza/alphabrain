import NavBar from './NavBar'
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100;0,200;0,300;0,900;1,100;1,200;1,300;1,900&family=Noto+Sans:ital,wght@0,100;0,300;0,400;0,600;0,900;1,100;1,300;1,400;1,600;1,900&display=swap" rel="stylesheet" />
      </Head>

      <div className="page-layout">
        <NavBar />
        <main className='relative mt-8'>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout