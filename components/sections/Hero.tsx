
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { personalInfo } from '@/data/personal'

export default function Hero() {
  const { setCursorVariant } = useUIStore()
  const { personal, cta } = personalInfo
  const heroRef = useRef<HTMLElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const b1x = useSpring(rawX, { stiffness: 35, damping: 18 })
  const b1y = useSpring(rawY, { stiffness: 35, damping: 18 })
  const b2x = useSpring(rawX, { stiffness: 70, damping: 20 })
  const b2y = useSpring(rawY, { stiffness: 70, damping: 20 })
  const b3x = useSpring(rawX, { stiffness: 160, damping: 26 })
  const b3y = useSpring(rawY, { stiffness: 160, damping: 26 })

  const b2xOff = useTransform(b2x, (v) => v - 140)
  const b2yOff = useTransform(b2y, (v) => v - 80)
  const b3xOff = useTransform(b3x, (v) => v + 100)
  const b3yOff = useTransform(b3y, (v) => v + 60)

  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    rawX.set(rect.width / 2)
    rawY.set(rect.height / 2)
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      rawX.set(e.clientX - r.left)
      rawY.set(e.clientY - r.top)
    }
    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background — water gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 720, height: 720, x: b1x, y: b1y,
            translateX: '-50%', translateY: '-50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560, height: 560, x: b2xOff, y: b2yOff,
            translateX: '-50%', translateY: '-50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 320, height: 320, x: b3xOff, y: b3yOff,
            translateX: '-50%', translateY: '-50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.24) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 flex justify-center"
          >
            <span className="text-purple-500 text-sm md:text-base font-mono">
              {personal.greeting}
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
            <span className="text-purple-500">{personal.firstName}</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {personal.lastName}
            </span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {personal.title}
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-3">
            {personal.description.intro}
          </p>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            <span className="text-purple-500 font-semibold">
              {personal.description.highlightedTech.primary}
            </span>
            {' & '}
            <span className="text-blue-400 font-semibold">
              {personal.description.highlightedTech.secondary}
            </span>{' '}
            {personal.description.main
              .replace(new RegExp(personal.description.highlightedTech.primary, 'gi'), '')
              .replace(new RegExp(personal.description.highlightedTech.secondary, 'gi'), '')
              .trim()}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={cta.primary.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('hovering')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/40"
            >
              {cta.primary.text}
            </motion.a>
            <motion.a
              href={cta.secondary.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('hovering')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-8 py-4 rounded-lg font-semibold transition-all border border-purple-500 text-purple-500 hover:bg-purple-500/10"
            >
              {cta.secondary.text}
            </motion.a>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-20"
          >
            <ChevronDown className="w-8 h-8 mx-auto text-purple-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
