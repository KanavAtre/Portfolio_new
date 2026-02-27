import Head from 'next/head'
import { motion } from 'framer-motion'

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'ketteQ',
    period: 'Jun 2025 — Aug 2025',
    description:
      'Built real-time KPI pipelines across Neon, ClickHouse, and PostgreSQL; delivered interactive dashboards (bias charts, treemaps, stacked bars) used by analysts and leadership.',
    highlights: [
      'Real-time analytics pipeline (Neon → ClickHouse/Postgres)',
      'Executive-facing KPI dashboards + demos for prospective customers',
      'Data migration + archival infrastructure to keep analytics fast',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    company: 'Purdue University',
    period: 'Aug 2023 — Jun 2024',
    description:
      'Pedestrian detection and behavior analysis using large-scale image datasets to study changes in pedestrian patterns before and after the COVID-19 pandemic.',
    highlights: [
      'Mentored by Prof. Carla Zoltowski and Prof. Edward J. Delp',
      'Analyzed 50,000+ images for pre- and post-COVID pedestrian behavior',
      'KNNs, linear classifiers, and neural networks for feature extraction',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'Renzoe Box',
    period: 'Aug 2022 — Jan 2023',
    description:
      'Computer vision and data pipelines for RenzoeMatch, improving color classification and product recommendation systems.',
    highlights: [
      '3-point color matching + LAB-space feature extraction, brightness normalization',
      'Web-scraping pipelines with BeautifulSoup for structured product data',
      'Automated data ingestion for RenzoeMatch recommendation engine',
    ],
  },
]

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experience | Kanav Atre</title>
        <meta name="description" content="Kanav Atre — Experience in software engineering, research, and data science." />
      </Head>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl font-normal text-white mb-12">Experience</h1>

          <div className="space-y-12">
            {experience.map((job) => (
              <div key={`${job.company}-${job.role}`} className="border-l border-neutral-700 pl-6">
                <p className="text-xs text-neutral-500 mb-1">{job.period}</p>
                <h2 className="text-white font-medium">{job.role}</h2>
                <p className="text-neutral-400 text-sm mb-3">{job.company}</p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{job.description}</p>
                <ul className="text-neutral-500 text-sm space-y-1 list-disc list-inside">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
