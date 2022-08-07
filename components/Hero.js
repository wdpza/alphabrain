import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated, easings } from 'react-spring'

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
  const { background, rotateZ } = useSpring({
    from: {
      background: '#46e891',
      rotateZ: 0,
    },
    to: {
      background: '#277ef4',
      rotateZ: 225,
    },
    config: {
      duration: 2000,
      easing: easings.easeInOutQuart,
    },
    loop: { reverse: true },
  })

  return (
    <animated.div
      style={{ background, width: 90, height: 90, borderRadius: 16, rotateZ }}
    />
  )
}

function Hero() {
  return (
    <>
      <div className="z-10 hero-wrapper pb-20" style={{
        height: '50vh',
      }}>
        <div className="container hero-content mx-auto flex-col">
          <EasingComponent />
          <h1 className='text-8xl font-black mb-5'>
            <span className='text-primary dark:text-dark-secondary-500'>Alpha</span>Brain
          </h1>

          <p className="text-2xl mb-8">
            Maybe someday, someone, somewhere, will see...
          </p>
        </div>
      </div>
    </>
  )
}

export default Hero