import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <div className="page-layout">
      <NavBar />
      <main className='relative mt-8'>
        {children}
      </main>
    </div>
  )
}

export default Layout