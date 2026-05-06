import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Code } from 'lucide-react'
import { projectsData } from '@/data/projects'
import { personalInfo } from '@/data/personal'
import { useUIStore } from '@/store/uiStore'

export default function Projects() {
  const { projects } = personalInfo
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span>{projects.heading.split(' ').slice(0, -1).join(' ')}{' '}</span>
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {projects.heading.split(' ').slice(-1)[0]}
            </span>
          </h2>

          <p className="text-gray-400 text-center mb-16 text-lg">
            {projects.subheading}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, i) => {
              const isExpanded = expandedId === project.id
              const href = project.githubUrl || project.liveUrl || '#'

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setCursorVariant('default')}
                  onMouseLeave={() => setCursorVariant('default')}
                  onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.imageAlt || 'Project preview'}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.opacity = '0' }}
                    />
                    <div
                      className={`hidden absolute inset-0 bg-gradient-to-br ${project.gradient} items-center justify-center`}
                    >
                      <Code className="w-16 h-16 text-white/50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        <Github className="w-3.5 h-3.5" />
                        View on GitHub
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-500 transition-colors">
                      {project.title}
                    </h3>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 72 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                        {(isExpanded ? project.description : project.description.slice(0, 2)).map(
                          (point, idx) => (
                            <li key={`${project.id}-${idx}-${point.slice(0, 10)}`}>
                              • {point}
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>

                    {project.description.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedId(isExpanded ? null : project.id)
                        }}
                        onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('default') }}
                        onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default') }}
                        className="mt-3 text-sm font-medium text-purple-500 hover:text-purple-600 transition"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 4).map((tag, j) => (
                        <span
                          key={`${project.id}-tag-${j}`}
                          className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
