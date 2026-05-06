
import { useRef, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  type MotionValue,
} from 'framer-motion'
import { Layers, Cpu, Bot, GitBranch, Network, HardDrive, ShieldCheck, Terminal } from 'lucide-react'
import { personalInfo } from '@/data/personal'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Cpu,
  Bot,
  GitBranch,
  Network,
  HardDrive,
  ShieldCheck,
  Terminal,
}

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  )
}

function TiltCard({
  children,
  delay = 0,
  floatDuration = 4,
  floatAmount = 7,
}: {
  children: React.ReactNode
  delay?: number
  floatDuration?: number
  floatAmount?: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const rotX   = useMotionValue(0)
  const rotY   = useMotionValue(0)
  const sX     = useSpring(rotX, { stiffness: 180, damping: 24 })
  const sY     = useSpring(rotY, { stiffness: 180, damping: 24 })

  const rawShX = useMotionValue(0)
  const rawShY = useMotionValue(0)
  const sheenX = useSpring(rawShX, { stiffness: 120, damping: 20 })
  const sheenY = useSpring(rawShY, { stiffness: 120, damping: 20 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    rotY.set(((e.clientX - r.left) / r.width  - 0.5) * 22)
    rotX.set(((e.clientY - r.top)  / r.height - 0.5) * -22)
    rawShX.set(e.clientX - r.left - r.width  / 2)
    rawShY.set(e.clientY - r.top  - r.height / 2)
  }

  function onLeave() {
    rotX.set(0)
    rotY.set(0)
    rawShX.set(0)
    rawShY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.88 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        animate={{ y: [0, -floatAmount, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ perspective: '700px' }}>
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: sX, rotateY: sY }}
            className="relative overflow-hidden p-6 bg-white/5 rounded-xl border border-white/10 shadow-none hover:border-purple-500/40 transition-colors duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.div
                className="w-44 h-44 rounded-full bg-purple-400/12 blur-2xl"
                style={{ x: sheenX, y: sheenY }}
              />
            </div>
            <div className="relative z-10">{children}</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const { about } = personalInfo

  const textRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.9', 'end 0.6'],
  })

  const allWords = useMemo(
    () => about.paragraphs.flatMap((p) => p.trim().split(/\s+/)),
    [about.paragraphs],
  )
  const total = allWords.length

  const wordRanges = useMemo(
    () =>
      allWords.map((_, i): [number, number] => [
        i / total,
        Math.min((i + 6) / total, 1),
      ]),
    [allWords, total],
  )

  let cursor = 0
  const paragraphWords = about.paragraphs.map((para) => {
    const words    = para.trim().split(/\s+/)
    const startIdx = cursor
    cursor        += words.length
    return { words, startIdx }
  })

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          About{' '}
          <span className="text-purple-500">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div ref={textRef} className="space-y-7">
            {paragraphWords.map(({ words, startIdx }, pIdx) => (
              <p
                key={pIdx}
                className="text-base md:text-[1.05rem] leading-[1.95] text-gray-300"
              >
                {words.map((word, wIdx) => (
                  <Word
                    key={`${pIdx}-${wIdx}`}
                    word={word}
                    progress={scrollYProgress}
                    range={wordRanges[startIdx + wIdx]}
                  />
                ))}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {about.stats.map((stat, i) => {
              const Icon = iconMap[stat.icon]
              return (
                <TiltCard
                  key={i}
                  delay={i * 0.12}
                  floatDuration={3.5 + i * 0.5}
                  floatAmount={6 + (i % 2) * 3}
                >
                  {Icon && <Icon className="w-8 h-8 text-purple-500 mb-3" />}
                  <h3 className="font-semibold text-gray-100 mb-1 text-sm leading-snug">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {stat.sublabel}
                  </p>
                </TiltCard>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
