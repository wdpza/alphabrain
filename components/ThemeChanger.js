import { useState } from 'react'
import { useTheme } from 'next-themes'
import { VscColorMode } from 'react-icons'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

const ThemeChanger = (props) => {
  const { theme, setTheme } = useTheme()
  const [toggle, setToggle] = useState(false)

  const toggleTheme = () => {
    setToggle(!toggle)
    setTheme(toggle ? 'light' : 'dark')
  }

  return (
    <button onClick={toggleTheme} className={props.className}>
      {theme === 'light' ? <MdLightMode /> : <MdDarkMode />}
    </button>
  )
}

export default ThemeChanger