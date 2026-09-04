#!/usr/bin/env node
// Assert `nuxt generate` produced every page. This site has no content collection: the
// routes are the hand-written pages in app/pages, so they are listed here directly.

import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, '.output', 'public')

const expected = ['/', '/foreword', '/gallery', '/biography', '/credits']

// From nitro.prerender.routes; app.conf serves it via error_page.
const files = ['404.html', ...expected.map(r => (r === '/' ? 'index.html' : r.slice(1)))]

const missing = files.filter((f) => {
  if (f.endsWith('.html'))
    return !existsSync(join(OUT, f))
  // try_files serves either shape.
  return !existsSync(join(OUT, f, 'index.html')) && !existsSync(join(OUT, `${f}.html`))
})

if (missing.length) {
  console.error(`\nnuxt generate did not produce ${missing.length} of ${files.length} expected pages:`)
  for (const f of missing) console.error(`  - /${f}`)
  console.error('\nIf a page was added under app/pages, add its route to this script.\n')
  process.exit(1)
}

console.log(`verify-generate: ${files.length} expected pages present in .output/public`)
