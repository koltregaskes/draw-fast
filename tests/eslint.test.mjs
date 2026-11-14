import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ESLint } from 'eslint'

test('flat config parses TSX and still rejects conditional hooks', async () => {
  const eslint = new ESLint()
  const [valid] = await eslint.lintText('export default function Example() { const label: string = "ok"; return <p>{label}</p> }', { filePath: 'src/lint-check.tsx' })
  assert.equal(valid.errorCount, 0)
  const [invalid] = await eslint.lintText('import { useState } from "react"; export default function Example({ active }: { active: boolean }) { if (active) { useState(0) }; return null }', { filePath: 'src/lint-check.tsx' })
  assert.ok(invalid.messages.some(m => m.ruleId === 'react-hooks/rules-of-hooks' && m.severity === 2))
})
