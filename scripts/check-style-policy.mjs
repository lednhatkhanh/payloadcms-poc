import { readFile, readdir } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const roots = ['apps/web/src', 'apps/cms/src']
const sourceExtensions = new Set(['.ts', '.tsx', '.css'])
const violations = []

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? walk(path) : [path]
    }),
  )
  return files.flat()
}

const files = (await Promise.all(roots.map(walk))).flat()

await Promise.all(
  files.map(async (file) => {
    if (!sourceExtensions.has(extname(file))) return
    const source = await readFile(file, 'utf8')
    const projectPath = relative(process.cwd(), file)
    const checks = [
      [/from ['"]react-aria-components(?:\/[^'"]+)?['"]/g, 'import React Aria through @repo/ui'],
      [/from ['"]lucide-react['"]/g, 'import Lucide through @repo/ui/icon'],
      [/(?:#[0-9a-f]{3,8}|(?:rgb|hsl|oklch)\()/gi, 'use shared semantic color tokens'],
      [
        /className\s*=\s*["'][^"']*\[[^\]]+\][^"']*["']/g,
        'do not use arbitrary Tailwind values in app code',
      ],
    ]

    for (const [pattern, message] of checks) {
      if (pattern.test(source)) violations.push(`${projectPath}: ${message}`)
    }
  }),
)

if (violations.length > 0) {
  console.error(violations.join('\n'))
  process.exitCode = 1
}
