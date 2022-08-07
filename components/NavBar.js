import { useState } from "react"
import { useSpring, animated, easings } from 'react-spring'
import { themeChange } from 'theme-change'

import { GiPizzaCutter, GiBrain, GiStairsGoal } from "react-icons/gi"
import { AiOutlineDashboard } from "react-icons/ai"
import { RiTeamLine } from "react-icons/ri"
import { BsCalendar2Month } from "react-icons/bs"
import { FaCircle } from "react-icons/fa"

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotificationMenu, setShowNotificationMenu] = useState(false)

  const themeValues = [
    {
      name: 'light',
      iconColor: '#37cdbe'
    },
    {
      name: 'dark',
      iconColor: '#6419e6'
    },
    {
      name: 'cupcake',
      iconColor: '#eeaf3a'
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
    <div className="navbar relative">
      <div className="flex-none">
        <a className="btn btn-ghost normal-case text-xl font-bold"><span className='text-primary dark:text-dark-secondary-500'>A</span>B</a>
      </div>
      <div className="flex-1 justify-center flex-row gap-2 mr-5">
        <div className="form-control w-1/4">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
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
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar