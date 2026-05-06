
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { personalInfo } from '@/data/personal'
import { useUIStore } from '@/store/uiStore'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
}

export default function Contact() {
  const { contact } = personalInfo
  const { setCursorVariant } = useUIStore()

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span>{contact.heading.split(' ').slice(0, -1).join(' ')} </span>
            <span className="text-purple-500">{contact.heading.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            {contact.subheading}
          </p>

          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant('hovering')}
            onMouseLeave={() => setCursorVariant('default')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-500/40 transition-all"
          >
            <Mail className="w-6 h-6" />
            {contact.emailButtonText}
          </motion.a>

          <div className="flex justify-center gap-6 mt-16">
            {contact.socialLinks.map((social, i) => {
              const IconComponent = iconMap[social.icon]
              return (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setCursorVariant('hovering')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`p-4 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:border-white/20 transition-all ${social.color}`}
                >
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
