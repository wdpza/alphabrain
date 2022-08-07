import { useRef, useState, useEffect } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { themeChange } from 'theme-change'

import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated, easings } from 'react-spring'

import { BsFillSquareFill } from 'react-icons/bs'

const fullConfig = resolveConfig(tailwindConfig)

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function EasingComponent() {
  const { light, dark, cupcake, dracula } = fullConfig.theme.colors

  const [html, setHtml] = useState(undefined)
  const [theme, setTheme] = useState(undefined)

  useEffect(() => {
    if(!html) {
      let html = document.querySelector('html')
      let theme = html.dataset.theme
      if(html && theme) {
        setHtml(html)
        setTheme(fullConfig.theme.colors[theme])
      }
    }
  }, [])

  const primary = theme ? theme.primary : '#570df8'
  const secondary = theme ? theme.secondary : '#f000b8'
  const accent = theme ? theme.accent : '#ffffff'
  const neutral = theme ? theme.neutral : '#333333'

  const { background, rotateZ } = useSpring({
    from: {
      background: accent,
      rotateZ: 45,
    },
    to: {
      background: secondary,
      rotateZ: 225,
    },
    config: {
      duration: 1500,
      easing: easings.easeInOutQuart,
    },
    loop: { reverse: true },
  })

  return (
    <animated.div
      style={{ background, width: 65, height: 65, borderRadius: 16, rotateZ, marginTop: 14 }}
    />
  )
}

export default function Hero({posts}) {
  return (
    <>
      <div className="z-10 hero-wrapper pb-20">
        <div className="container hero-content mx-auto flex-col">
          <EasingComponent />
          <h1 className='text-6xl font-black mt-16 mb-12 antialiased'>
            <span className='text-primary dark:text-dark-secondary-500 mt-10'>Alpha</span>Brain
          </h1>

          <p className="text-2xl font-semibold mb-0s">
          </p>

          <span className='text-2xl font-normal mb-0s'>M</span>

          <div className="flex flex-row justify-center items-center">
            <div className="text-primary text-1xl p-3"><BsFillSquareFill /></div>
            <div className="text-secondary text-1xl p-3"><BsFillSquareFill /></div>
            <div className="text-accent text-1xl p-3"><BsFillSquareFill /></div>
            <div className="text-neutral text-1xl p-3"><BsFillSquareFill /></div>
          </div>
        </div>
      </div>
    </>
  )
}