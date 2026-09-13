import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = fileURLToPath(new URL('..', import.meta.url))
const repoRoot = resolve(appRoot, '../..')
const config: unknown = JSON.parse(await readFile(resolve(appRoot, 'google-slides.json'), 'utf8'))

function record(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Expected a JSON object')
  }
  return Object.fromEntries(Object.entries(value))
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function plain(value: string): string {
  return normalize(value.replace(/\*\*(.*?)\*\*/g, '$1').replace(/<[^>]+>/g, ''))
}

function textFrom(value: unknown): string {
  return list(record(value).textElements)
    .map((element) => {
      const run = record(element).textRun
      return run ? String(record(run).content ?? '') : ''
    })
    .join('')
}

const markdown = await readFile(resolve(appRoot, 'slides.md'), 'utf8')
const style = await readFile(resolve(appRoot, 'style.css'), 'utf8')
const slides = await Promise.all(
  markdown
    .split(/^---\s*$/m)
    .filter((section) => /^# /m.test(section))
    .map(async (section, index) => {
      const title = /^# (.+)$/m.exec(section)?.[1]
      if (!title) throw new Error(`Missing title on slide ${index + 1}`)
      const notes = [...section.matchAll(/<!--([\s\S]*?)-->/g)]
        .map((match) => match[1]?.trim())
        .join('\n\n')
      const content = section.replace(/<!--[\s\S]*?-->/g, '').trim()
      const images = await Promise.all(
        [...content.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].map(async (match) => {
          const src = match[1]
          if (!src?.startsWith('/'))
            throw new Error(`Expected a local public image on slide ${index + 1}`)
          const publicRoot = resolve(appRoot, 'public')
          const path = resolve(publicRoot, src.slice(1))
          if (!path.startsWith(publicRoot + sep))
            throw new Error(`Image escapes public directory: ${src}`)
          return {
            src,
            sha256: createHash('sha256')
              .update(await readFile(path))
              .digest('hex'),
          }
        }),
      )
      const rows = content
        .split('\n')
        .filter((line) => line.startsWith('|') && !/^\|[\s:|-]+$/.test(line))
        .map((line) => line.slice(1, line.lastIndexOf('|')).split('|').map(plain))
      const htmlRows = [...content.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
        [...(row[1] ?? '').matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) =>
          plain(cell[1] ?? ''),
        ),
      )
      if (rows.length && htmlRows.length) throw new Error('Use one table syntax per slide')
      return {
        number: index + 1,
        title: plain(title),
        content,
        notes,
        tableRows: htmlRows.length ? htmlRows : rows,
        images,
      }
    }),
)

if (slides.length === 0) throw new Error('No titled slides found')
const [command, input] = process.argv.slice(2)
if (command === 'prepare') {
  const destination = resolve(repoRoot, input ?? 'tmp/slides-google/source.json')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(
    destination,
    JSON.stringify(
      {
        companion: config,
        sourceSha256: createHash('sha256').update(markdown).digest('hex'),
        styleSha256: createHash('sha256').update(style).digest('hex'),
        slides,
      },
      null,
      2,
    ) + '\n',
  )
  console.log(`Prepared ${slides.length} slides: ${destination}`)
} else if (command === 'check') {
  if (!input)
    throw new Error('Pass the path to a fresh Google Slides get_presentation JSON readback')
  const raw: unknown = JSON.parse(await readFile(resolve(input), 'utf8'))
  let deck = record(raw)
  if (deck.structuredContent) deck = record(deck.structuredContent)
  if (deck.result) deck = record(deck.result)
  if (deck.presentationId !== record(config).presentationId)
    throw new Error('Readback is for a different presentation')
  const remote = list(deck.slides)
  const failures: string[] = []
  if (remote.length !== slides.length)
    failures.push(`Slide count: local ${slides.length}, remote ${remote.length}`)
  for (const [index, expected] of slides.entries()) {
    const page = remote[index]
    if (!page) continue
    const elements = list(record(page).pageElements).map(record)
    const texts = elements
      .filter((element) => element.shape)
      .map((element) => {
        const shape = record(element.shape)
        return shape.text ? normalize(textFrom(shape.text)) : ''
      })
    if (!texts.includes(expected.title)) failures.push(`Slide ${index + 1}: title/order differs`)
    const cells = elements
      .filter((element) => element.table)
      .flatMap((element) =>
        list(record(element.table).tableRows).flatMap((row) =>
          list(record(row).tableCells).map((cell) => plain(textFrom(record(cell).text))),
        ),
      )
    if (JSON.stringify(cells) !== JSON.stringify(expected.tableRows.flat()))
      failures.push(`Slide ${index + 1}: native table content differs`)
    if (elements.filter((element) => element.image).length !== expected.images.length)
      failures.push(`Slide ${index + 1}: image count differs`)
    if (expected.notes) {
      const properties = record(record(page).slideProperties)
      const notesPage = record(properties.notesPage)
      const notes = list(notesPage.pageElements)
        .map(record)
        .filter((element) => element.shape)
        .map((element) => {
          const shape = record(element.shape)
          return shape.text ? textFrom(shape.text) : ''
        })
        .join('\n')
      if (!normalize(notes).includes(normalize(expected.notes)))
        failures.push(`Slide ${index + 1}: speaker notes differ`)
    }
  }
  if (failures.length) throw new Error(failures.join('\n'))
  console.log(
    `PASS: ${slides.length} slide titles/order, native table contents, image counts and source notes match. Body text, image identity and visual layout still require review.`,
  )
} else {
  throw new Error(
    'Usage: node scripts/google-slides.ts prepare [output.json] | check <readback.json>',
  )
}
