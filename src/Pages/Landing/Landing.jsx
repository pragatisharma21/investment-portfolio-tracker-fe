import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GLOBE from 'vanta/dist/vanta.globe.min'
import { Typewriter } from 'react-simple-typewriter'
import { useTheme } from '@/Context/ThemeProvider'

const Landing = () => {
  const vantaRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const effect = GLOBE({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3f99ff,
      size: 1.5,
      backgroundColor: theme === 'dark' ? 0x1a2828 : 0xfafafa,
      THREE,
    })

    return () => {
      if (effect) effect.destroy()
    }
  }, [theme])

  return (
    <div
      ref={vantaRef}
      className="h-screen absolute w-full flex justify-center items-center"
    >
      <div className="w-full sm:px-30 sm:pt-0 -mt-20 ">
        <h1 className="text-7xl space-y-10 text-foreground font-bold">
          <p className='capitalize'> Manage your trade in </p>
          <p style={{ color: '#3f99ff', fontWeight: 'bold' }}>
            <Typewriter
              words={['Stocks', 'Crypto', 'Market', 'Charts']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </h1>
      </div>
    </div>
  )
}

export default Landing
