import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { getAllProjects, type ProjectMeta } from '@/lib/mdx'

const TOP_SKILLS = [
  'Python',
  'TypeScript',
  'SQL',
  'React',
  'Next.js',
  'PyTorch',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Git',
]

interface ProjectsPageProps {
  projects: ProjectMeta[]
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <>
      <Head>
        <title>Projects | Kanav Atre</title>
        <meta name="description" content="Projects by Kanav Atre — systems, ML, and web development." />
      </Head>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl font-normal text-white mb-8">Projects</h1>

          {/* Top 10 skills */}
          <div className="mb-12">
            <p className="text-sm text-neutral-500 mb-3">Skills</p>
            <div className="flex flex-wrap gap-2">
              {TOP_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-neutral-800 text-neutral-400 rounded border border-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Project list */}
          <ul className="space-y-8">
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-neutral-800 pb-8 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-white font-medium hover:text-neutral-300 transition-colors"
                    >
                      {project.title}
                    </Link>
                    <p className="text-neutral-500 text-sm mt-1">{project.description}</p>
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-500 hover:text-white shrink-0"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects = getAllProjects()
  return {
    props: { projects },
  }
}
