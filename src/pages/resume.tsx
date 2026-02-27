import Head from 'next/head'
import { motion } from 'framer-motion'

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume | Kanav Atre</title>
        <meta name="description" content="Download Kanav Atre's resume." />
      </Head>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-mono">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl font-normal text-white mb-8">Resume</h1>
          <a
            href="/resume.pdf"
            download
            className="text-white underline hover:no-underline"
          >
            Download PDF
          </a>
        </motion.div>
      </div>
    </>
  )
}
