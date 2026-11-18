import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import { readFileSync } from 'fs'
import { execSync } from 'child_process'
const files = execSync("find contents/backend/framework/fast-api/starlette -name index.mdx", {encoding:'utf8'}).trim().split("\n")
let bad = 0
for (const f of files) {
  let src = readFileSync(f, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '')
  try { await compile(src, { remarkPlugins: [remarkGfm] }) }
  catch (e) { bad++; console.log(`FAIL ${f} @${e.line}:${e.column} ${String(e.reason||e.message).split("\n")[0]}`) }
}
console.log(`실패 ${bad}/${files.length}`)
