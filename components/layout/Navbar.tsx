
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { personalInfo } from '@/data/personal'

export default function Navbar() {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, setCursorVariant } = useUIStore()
  const { personal, navigation } = personalInfo

  return (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-[#080c09]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold"
        >
          <span className="text-purple-500">{personal.firstName}</span>
          <span className="ml-1">{personal.lastName}</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navigation.items.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setCursorVariant('hovering')}
              onMouseLeave={() => setCursorVariant('default')}
              className="hover:text-purple-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <button className="md:hidden p-2" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navigation.items.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                onClick={closeMobileMenu}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
