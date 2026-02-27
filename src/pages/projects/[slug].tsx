import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { motion } from 'framer-motion'
import { getProjectBySlug, getProjectSlugs, type Project } from '@/lib/mdx'
import { MDXComponents } from '@/components/MDXComponents'

interface ProjectPageProps {
  project: Omit<Project, 'content'>
  mdxSource: MDXRemoteSerializeResult
}

export default function ProjectPage({ project, mdxSource }: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{project.title} | Kanav Atre</title>
        <meta name="description" content={project.description} />
      </Head>

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="text-sm text-neutral-500 hover:text-white mb-8 inline-block"
          >
            ← Projects
          </Link>

          <header className="mb-8">
            <h1 className="text-xl font-normal text-white mb-2">{project.title}</h1>
            <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-white"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 hover:text-white"
                >
                  Demo
                </a>
              )}
            </div>
          </header>

          <div className="prose prose-invert prose-sm max-w-none">
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </div>

          <footer className="mt-12 pt-8 border-t border-neutral-800">
            <p className="text-xs text-neutral-500">
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </footer>
        </motion.div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getProjectSlugs()
  const paths = slugs.map((slug) => ({
    params: { slug: slug.replace(/\.mdx$/, '') },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const project = getProjectBySlug(slug)
  const mdxSource = await serialize(project.content)

  const { content, ...projectMeta } = project

  return {
    props: {
      project: projectMeta,
      mdxSource,
    },
  }
}
