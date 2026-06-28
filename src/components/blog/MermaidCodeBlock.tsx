import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { createLowlight } from 'lowlight'
import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml' // covers html

const lowlight = createLowlight()

lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('python', python)
lowlight.register('bash', bash)
lowlight.register('sql', sql)
lowlight.register('json', json)
lowlight.register('css', css)
lowlight.register('html', xml)

function MermaidRenderer({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const [svg, setSvg] = useState('')

  useEffect(() => {
    if (!code.trim()) return
    setError('')
    setSvg('')

    const id = `mermaid-${Date.now()}`

    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

    mermaid.render(id, code)
      .then((result) => {
        setSvg(result.svg)
        setError('')
      })
      .catch((e: Error) => {
        // mermaid injects a broken SVG div into body — clean it up
        document.getElementById(id)?.remove()
        document.querySelector(`[id^="dmermaid"]`)?.remove()
        setError(e.message?.split('\n')[0] ?? 'Syntax error')
      })
  }, [code])

  if (error) {
    return (
      <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg p-3 mt-2">
        <span className="text-red-400 text-xs font-mono mt-0.5">✕</span>
        <div>
          <p className="text-red-400 text-xs font-semibold mb-0.5">Mermaid syntax error</p>
          <p className="text-red-300/70 text-xs font-mono leading-relaxed">{error}</p>
        </div>
      </div>
    )
  }

  if (!svg) return null

  return (
    <div
      className="flex justify-center my-4 p-4 border border-zinc-200 rounded-lg bg-white overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

function CodeBlockComponent({ node, updateAttributes, extension }: any) {
  const language = node.attrs.language || ''
  const code = node.textContent

  return (
    <NodeViewWrapper className="relative my-6">
      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-t-lg">
        <select
          className="bg-transparent text-zinc-400 text-xs outline-none cursor-pointer"
          value={language}
          onChange={(e) => updateAttributes({ language: e.target.value })}
        >
          <option value="">plain text</option>
          <option value="mermaid">mermaid</option>
          <option value="javascript">javascript</option>
          <option value="typescript">typescript</option>
          <option value="python">python</option>
          <option value="bash">bash</option>
          <option value="sql">sql</option>
          <option value="json">json</option>
        </select>
      </div>
      <pre className="mt-0! rounded-t-none! bg-zinc-900 text-zinc-100 p-4 rounded-b-lg overflow-auto">
        <NodeViewContent as={"code" as "div"} />
      </pre>
      {language === 'mermaid' && code.trim() && (
        <div className="border border-zinc-200 rounded-lg p-4 mt-2 bg-white">
          <MermaidRenderer code={code} />
        </div>
      )}
    </NodeViewWrapper>
  )
}

export const MermaidCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent)
  },
}).configure({ lowlight })