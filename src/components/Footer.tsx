import Link from 'next/link'

const sections = [
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono">
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-400">
          {sections.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
