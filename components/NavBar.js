import { useState } from "react"
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'
import { themeChange } from 'theme-change'
import { FaCircle } from "react-icons/fa"

import Loading from '../components/Loading'

function ProfileImage({user}) {
  return (
    <div className="w-24 rounded-full">
      <Image
        src={user?.picture || ''}
        alt='Picture of the author'
        layout='fill'
        className='rounded-full'
      />
    </div>
  )
}

const NavBar = () => {
  const { user, isLoading } = useUser()

  const themeValues = [
    {
      name: 'dark',
      iconColor: '#6419e6'
    },
    {
      name: 'dracula',
      iconColor: '#ff7ac6'
    }

  ]

  const changeTheme = () => {
    themeChange(themeValues)
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="navbar relative">
        <div className="flex-none">
          <a className="btn btn-ghost normal-case text-xl font-bold"><span className='text-primary dark:text-dark-secondary-500'>A</span>B</a>
        </div>
        <div className="flex-1 justify-center flex-row gap-2 mr-5">
          {/*}
          <div className="form-control w-1/4">
            <input type="text" placeholder="Search" className="input input-bordered" />
          </div>
          */}
        </div>
        <div className="flex-none gap-2">
          <div className="absolute flex flex-row right-20 gap-2">
            {themeValues.map((theme, i) => (
              <button
                key={i}
                onClick={changeTheme}
                data-set-theme={`${theme.name}`}
              >
                <FaCircle style={{
                  color: theme.iconColor,
                }} />
              </button>
            ))}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user && (
                  <ProfileImage user={user} />
                )}
              </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a
                  href="/profile"
                >
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li>
                <a
                  className="justify-between"
                  href="/api/auth/logout"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar