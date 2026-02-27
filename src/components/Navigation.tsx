'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <header className="border-b border-neutral-800">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors font-mono">
            Kanav Atre
          </Link>
        </div>
      </nav>
    </header>
  )
}
