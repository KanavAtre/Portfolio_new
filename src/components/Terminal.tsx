'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const DIRECTORIES = [
  { path: 'experience', href: '/experience' },
  { path: 'projects', href: '/projects' },
  { path: 'resume', href: '/resume' },
]

type OutputLine = { type: 'command'; text: string } | { type: 'output'; text: string }

export default function Terminal() {
  const router = useRouter()
  const [output, setOutput] = useState<OutputLine[]>([])
  const [command, setCommand] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setOutput((prev) => [...prev, { type: 'command', text: cmd }])

    if (trimmed === 'ls') {
      setOutput((prev) => [
        ...prev,
        {
          type: 'output',
          text: DIRECTORIES.map((d) => `${d.path}/`).join('\n'),
        },
      ])
    } else if (trimmed.startsWith('cd ')) {
      const arg = trimmed.slice(3).trim().replace(/\/$/, '')
      const dir = DIRECTORIES.find((d) => d.path === arg)
      if (dir) {
        router.push(dir.href)
      } else {
        setOutput((prev) => [
          ...prev,
          { type: 'output', text: `cd: no such file or directory: ${arg}` },
        ])
      }
    } else if (trimmed === 'clear') {
      setOutput([])
    } else if (trimmed === 'help') {
      setOutput((prev) => [
        ...prev,
        {
          type: 'output',
          text: 'ls          list directories\ncd <dir>    navigate (experience, projects, resume)\nclear      clear screen\nhelp       show this help',
        },
      ])
    } else {
      setOutput((prev) => [
        ...prev,
        { type: 'output', text: `command not found: ${trimmed.split(' ')[0]}` },
      ])
    }
    setCommand('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(command)
    }
  }

  return (
    <div className="font-mono text-sm">
      {output.length > 0 && (
        <div className="mb-3 space-y-1">
          {output.map((line, i) => (
            <div key={i}>
              {line.type === 'command' && (
                <div className="text-neutral-500">
                  <span className="text-green-400">kanav</span>
                  <span className="text-neutral-500">@</span>
                  <span className="text-blue-400">portfolio</span>
                  <span className="text-neutral-500">:</span>
                  <span className="text-amber-200/90">~</span>
                  <span className="text-neutral-500">$ {line.text}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="text-neutral-400 whitespace-pre-wrap pl-0">
                  {line.text}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1 text-neutral-500 flex-wrap">
        <span className="text-green-400">kanav</span>
        <span className="text-neutral-500">@</span>
        <span className="text-blue-400">portfolio</span>
        <span className="text-neutral-500">:</span>
        <span className="text-amber-200/90">~</span>
        <span className="text-neutral-500">$</span>
        <span className="inline-flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white font-mono text-sm py-0"
            style={{ width: `${Math.max(6, command.length + 1)}ch` }}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
          <span
            className="inline-block w-3 h-4 bg-white align-middle shrink-0 -ml-px"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          />
        </span>
      </div>
      <div ref={outputEndRef} />
    </div>
  )
}
