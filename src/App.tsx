import { motion, useScroll, useSpring } from 'framer-motion'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <div className="min-h-screen" style={{ backgroundColor: '#080a0c' }}>
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-purple-500 origin-left z-50"
          style={{ scaleX }}
        />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
