import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const app = join(__dirname, '../src/pages/index/index.vue')
const example = join(__dirname, '../src/pages/index/index.example.vue')

if (!existsSync(app))
  writeFileSync(app, readFileSync(example))
