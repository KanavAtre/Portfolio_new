import Head from 'next/head'
import { motion } from 'framer-motion'
import Terminal from '@/components/Terminal'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kanav Atre</title>
        <meta name="description" content="Kanav Atre — Software Engineer. Data Science & Applied Statistics." />
      </Head>

      <section className="flex flex-col min-h-[calc(100vh-3.5rem)] px-6 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto pt-6"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight">
            Hi, I&apos;m Kanav Atre.
          </h1>
          <p className="mt-4 text-base md:text-lg text-neutral-400 leading-snug">
            Software engineer with internship and research experience building large-scale data and ML-backed
            systems. Experienced across the stack with strong focus on reliability, performance, and automation.
          </p>
          <p className="mt-3 text-sm md:text-base text-neutral-500 leading-snug">
            Outside of tech, I&apos;m a chess enthusiast and my peak rating was 1750 Rapid.{' '}
            <a
              href="https://www.chess.com/analysis/game/live/131758826053/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Check out my best ever win 🙂
            </a>
          </p>
        </motion.div>
        <div className="py-6 flex justify-center">
          <Terminal />
        </div>
      </section>
    </>
  )
}
